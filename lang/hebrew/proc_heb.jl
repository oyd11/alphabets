

## quite slow (was fast, a lot of redundancy, but works)

using JSON
using Glob


flat_txt(d) = [[d["text"]...]...] |> join
base_fn(fn) = splitext(splitdir(fn)[end] )[1]
words_split(txt) = split(txt,r"׃| |\n")

alphabet = JSON.parsefile("alphabet_list.json")
code2str(str) = Char(parse(Int64,str)) |> string
base_xlit = alphabet["base_xlit"]
base_xlit_ipalike = alphabet["base_xlit_ipalike"]
base_letters = base_xlit |> keys |>  collect |> sort


function get_composed_chars(strs)
 flags = [length(x)!=length(graphemes(x)) for x  in strs]
# there must be an easier way to do this...
 pairs = filter(x->x[2], [(x,f) for (x,f) in zip(base_letters,flags)])
 return map(x->x[1],pairs)
end

# niqqud utils:
get_alpha(str) = filter(isalpha,str)
niqqudless(str) = map(graphemes(str)) do g
    isempty(get_alpha(g))? g : get_alpha(g)
end |> join

composed_keep = get_composed_chars(base_letters)
keep_base =  map(get_alpha,composed_keep) |> unique
composed_d = map(composed_keep) do x
    s = split(x,"")
    join(filter(isalpha,s)),join(filter(!isalpha, s))
end  # TODO: to multi-dict

niqqud = [code2str(k)=>v for (k,v) in alphabet["niqqud"]]
r_any_niqqud = Regex(join([n for n in keys(niqqud)],"|"))
xlit_table = merge(base_xlit, niqqud)
xlit_table_ipalike = merge(base_xlit_ipalike, niqqud)

function keep_dots(grapheme) 
    ch = join(filter(isalpha,grapheme))
    if isempty(ch)
        return grapheme
    end
    if !(ch in keep_base)
        return ch
    end
    for (c,extra) in composed_d
        if contains(grapheme,c)
            if contains(grapheme,extra)
                return join([c,extra])
            end
        end
    end
    return ch
end

function keep_dots_and_niqqud(grapheme) 
    m = match(r_any_niqqud,grapheme)
    niqq = nothing == m ? "" : m.match
    ch = join(filter(isalpha,grapheme))
    if isempty(ch)
        return grapheme
    end
    if !(ch in keep_base)
        return join([ch,niqq])
    end
    for (c,extra) in composed_d
        if contains(grapheme,c)
            if contains(grapheme,extra)
                cch = join([c,extra])
                return join([cch,niqq])
            end
        end
    end
    return join([ch,niqq])
end

#keep_base_letters(str) = map(keep_dots, graphemes(str)) |> join
keep_base_letters(str) = map(keep_dots_and_niqqud, graphemes(str)) |> join

########

function niqqudless2niqquds(words)
    unique_strings = Dict()
    niqqudless_count = Dict()
    for word in words
        l = niqqudless(word)
        bin = get!(unique_strings,l,Set())
        push!(bin, word)
        count_bin = get!(niqqudless_count,l,0)
        niqqudless_count[l] += 1
    end
    return unique_strings, niqqudless_count
end

function word_freqs(words)
    f_count = Dict()
    for word in words
        count_bin = get!(f_count,word,0)
        f_count[word] += 1
    end
    return f_count
end

######

tanaK = map(glob("*.json","TaNaKh/")) do fn
    base_fn(fn)=> JSON.parsefile(fn) |> flat_txt
end |> Dict

tanaK_words = [title => words_split(txt) for (title, txt) in tanaK]

benyehuda_org = map(glob("*.txt","benyehuda_org/")) do fn
    base_fn(fn)=> join(map(chomp,readlines(fn))," . ")
end |> Dict

benyehuda_org_words = [title => words_split(txt) for (title, txt) in benyehuda_org]



function xlit_grapheme(g,lookup_table) 
# griddy :
    m = match(r_any_niqqud,g)
    base_letter = replace(g,r_any_niqqud,"")
    consonant = get(lookup_table,base_letter,base_letter)
    vowel = nothing == m ? "" : get(lookup_table,m.match,"!!ERROR!!")
    return join([consonant, vowel])
end

function xlit(str,lookup_table) 
    n_str = keep_base_letters(str)
    [xlit_grapheme(g, lookup_table) for g in graphemes(n_str)] |> join
end

mkpath("out")

all_words = merge(tanaK_words,benyehuda_org_words)
    
for (title, words) in all_words
    open("out/$title.md","w") do f
        println(f, "## $title")
        unique_dict, count_dict = niqqudless2niqquds(words)
        freq_sorted = sort(collect(count_dict),by=x->-x[2])
        f_count = word_freqs(words)
        p(str) = println(f,str)
        for kv in freq_sorted
            niqqudless, c = kv
            arr = unique_dict[niqqudless]
            " * $niqqudless $c: " |> p
#
# print .md tables like:
#
# |1|2|
# |-|-|
# |a|a|
#
            w_c = ["$w $(f_count[w])" for w in arr]
            w_c2 = ["$(keep_base_letters(w)) $(f_count[w])" for w in arr]
#            println(f, join(w_c, ", "))



            println(f)
#            "|" * join(arr,"|") * "|" |> p
            "|" * join(w_c,"|") * "|" |> p
            "|" * join(fill("-",length(arr)),"|") * "|" |> p
            "|" * join(w_c2,"|") * "|" |> p
            "|" * join(map(x->xlit(x,xlit_table),arr),"|") * "|" |> p
            println(f)

            

        end
    end
end

println("Finished .md")

for (title, words) in all_words
    open("out/$title.csv","w") do f
        println(f, "list, Map1")
        unique_dict, count_dict = niqqudless2niqquds(words)
        freq_sorted = sort(collect(count_dict),by=x->-x[2])
        f_count = word_freqs(words)
        p(str) = println(f,str)
        for kv in freq_sorted
            niqqudless, c = kv
            arr = unique_dict[niqqudless]
            for w in arr
                out_word = keep_base_letters(w) 
                println(f,join([out_word, xlit(out_word,xlit_table_ipalike)],", "))
            end
        end
    end
end

println("Finished .csv")


