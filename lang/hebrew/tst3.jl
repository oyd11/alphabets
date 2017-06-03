

using JSON
using Glob


flat_txt(d) = [[d["text"]...]...] |> join
base_fn(fn) = splitext(splitdir(fn)[end] )[1]
words_split(txt) = split(txt,r"׃| |\n")
niqqudless(word) = filter(isalpha,word)

tanaK = map(glob("*.json","TaNaKh/")) do fn
    base_fn(fn)=> JSON.parsefile(fn) |> flat_txt
end |> Dict

tanaK_words = [title => words_split(txt) for (title, txt) in tanaK]

println(pwd())
mkpath("out")
    
for (title, words) in tanaK_words
    open("out/$title.md","w") do f
        println(f, "## $title")
        for word in words
            println(f, " * $word , $(niqqudless(word))")
        end
    end
end




# ispunct()
# isalpha()
# isalnum()
# contains(haystack, needle)
# graphemes()
# split()


