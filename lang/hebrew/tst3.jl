

using JSON
using Glob


flat_txt(d) = [[d["text"]...]...] |> join
base_fn(fn) = splitext(splitdir(fn)[end] )[1]
words_split(txt) = split(txt,r"׃| |\n")

alphabet = JSON.parsefile("alphabet_list.json")
code2str(str) = Char(parse(Int64,str)) |> string
base_xlit = alphabet["base_xlit"]
niqqud = [code2str(k)=>v for (k,v) in alphabet["niqqud"]]
dagesh = 0x05BC |> Char |> string
shin_dot = 0x05C1 |> Char |> string
sin_dot = 0x05C2 |> Char |> string
has_dagesh(str) = contains(str,dagesh)
keep_dots(str) = contains(str,05C1
keep_dagesh = filter(has_dagesh, keys(base_xlit)) |> Set

# niqqud utils:
get_alpha(str) = filter(isalpha,str)
niqqudless(str) = map(graphemes(str)) do g
    isempty(get_alpha(g))? g : get_alpha(g)
end |> join

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



function xlit_letter(str) 
end

function xlit(str) 
    n_str = niqqudless(str)
    join([get(base_xlit,x,x) for x in split(n_str,"")])
end

mkpath("out")
    
for (title, words) in tanaK_words
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
#            println(f, join(w_c, ", "))



            println(f)
#            "|" * join(arr,"|") * "|" |> p
            "|" * join(w_c,"|") * "|" |> p
            "|" * join(fill("-",length(arr)),"|") * "|" |> p
            "|" * join(map(xlit(arr)),"|") * "|" |> p
            println(f)

            

        end
    end
end




# ispunct()
# isalpha()
# isalnum()
# contains(haystack, needle)
# graphemes()
# split()


w = tanaK_words["Job"] # tst
