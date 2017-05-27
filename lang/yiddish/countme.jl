#!/usr/bin/env julia04

include("yiddish_common.jl")
using JSON

a = JSON.parsefile("wp_list_manual.json")

yy = map(chomp,a["wp600"][1:2:end])

yi_dict = map(chomp,readlines("hunspell-yi.dic"))

str = join(yy," ")
#str = join(yi_dict," ")


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
letter_stats = [(x,xlit[x],letter_count[x]) for x in letters]
map(println, letter_stats)

println("remaining paragraph:")
println(paragraph)


y_trans = [w => brute_xlit(w)[1] for w in yy]


# output as both 'JSON' + 'CSV'
open("xlit_out.json","w") do f
    print(f,json(y_trans,2))
end

open("xlit_out.csv","w") do f
    println(f,"List,Map1")
    for (k,v) in y_trans
        println(f,"$k,$v")
    end
end



open("letter_stats.json","w") do f
    print(f,json(letter_stats,2))
end


open("letter_stats.csv","w") do f
    println(f,"yiddish,IPA,count")
    for l in letter_stats
        println(f,join(l,","))
    end
end

