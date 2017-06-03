

using JSON
using Glob


flat_txt(d) = [[d["text"]...]...] |> join
base_fn(fn) = splitext(splitdir(fn)[end] )[1]
words_split(txt) = split(txt,r"׃| |\n")

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

println(pwd())
mkpath("out")
    
for (title, words) in tanaK_words
    open("out/$title.md","w") do f
        println(f, "## $title")
        unique_dict, count_dict = niqqudless2niqquds(words)
        freq_sorted = sort(collect(count_dict),by=x->-x[2])
        f_count = word_freqs(words)
        for kv in freq_sorted
            niqqudless, c = kv
            arr = unique_dict[niqqudless]
            print(f, " * $niqqudless $c: ")
            w_c = ["$w $(f_count[w])" for w in arr]
            println(f, join(w_c, ", "))
        end
    end
end




# ispunct()
# isalpha()
# isalnum()
# contains(haystack, needle)
# graphemes()
# split()


