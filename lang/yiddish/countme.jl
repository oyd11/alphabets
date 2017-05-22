
using JSON
letters_all = JSON.parsefile("alphabet_list.json")
a = JSON.parsefile("wp_list_manual.json")

yy = a["wp600"][1:2:end]
lat = a["wp600"][2:2:end]

str = join(yy," ")

letters = letters_all["base_letters"]
letter_count = [l => 0 for l in letters]
letters_itr = sort(letters, by=length) |> reverse

# greedy, we have to first match the longer strings
paragraph = copy(str)
for l in keys(letter_count)
  # 'replace' - doensn't return count of replacement,
  # so we do it twice:
  cnt = matchall(Regex(l) ,paragraph ) |> length
  paragraph = replace(paragraph, Regex(l)  ,"")
  letter_count[l] = cnt
end

println("letter_count")
println(q)
q = [(x,letter_count[x]) for x in letters]

println("remaining paragraph:")
println(paragraph)
