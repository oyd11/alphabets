
using JSON
letters_all = JSON.parsefile("alphabet_list.json")
a = JSON.parsefile("wp_list_manual.json")

yy = a["wp600"][1:2:end]
lat = a["wp600"][2:2:end]

yi_dict = map(chomp,readlines("hunspell-yi.dic"))

str = join(yy," ")
#str = join(yi_dict," ")

letters = letters_all["base_letters"]
letter_count = [l => 0 for l in letters]
letters_itr = sort(letters, by=length) |> reverse
xlit = letters_all["base_xlit"]

# greedy, we have to first match the longer strings
paragraph = copy(str)
for l in letters_itr
  # 'replace' - doensn't return count of replacement,
  # so we do it twice:
  cnt = matchall(Regex(l) ,paragraph ) |> length
  paragraph = replace(paragraph, Regex(l)  ,"")
  letter_count[l] = cnt
end

println("letter_count")
q = [(x,letter_count[x]) for x in letters]
println(q)

println("remaining paragraph:")
println(paragraph)

# bruteforce matches for tranlitaration::
y_trans = Dict()
for (i,w) in enumerate(yy)
    x = copy(w)
    println(i)
    println(x)
    for l in letters_itr
        x = replace(x,l,xlit[l])
    end
    println(x)
    y_trans[w] = x
end

open("out.json","w") do f
    print(f,json(y_trans,2))
end
