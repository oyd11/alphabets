
using JSON
using Glob
alphabet = JSON.parsefile("alphabet_list.json")
alphabet = JSON.parsefile("alphabet_list.json")
code2str(str) = Char(parse(Int64,str)) |> string
base_xlit = alphabet["base_xlit"]
base_xlit_ipalike = alphabet["base_xlit_ipalike"]
base_letters = base_xlit |> keys |>  collect |> sort
niqqud = [code2str(k)=>v for (k,v) in alphabet["niqqud"]]
r_any_niqqud = Regex(join([n for n in keys(niqqud)],"|"))

kv,titles = readcsv("manual_tmp.csv",header=true)

heb =  kv[:,1]

stats_letter = Dict()
stats_niqq = Dict()

function add(d::Dict, key)
    count_bin = get!(d,key,0)
    d[key] += 1
end

function split_niqqud(grapheme)
    m = match(r_any_niqqud,grapheme)
    base_letter = replace(grapheme,r_any_niqqud,"")
    niqq = nothing == m ? "" : bytestring(m.match)
    return base_letter, niqq
end



# test:

test_string  =  "רְשָׁעִים"
letters = graphemes(test_string) |> collect
test_letter = letters[2] # Shin+Kamac
l, v = split_niqqud(test_letter)


for word in heb
    for g in graphemes(word)
        letter, niqq = split_niqqud(g)
        add(stats_letter, letter)
        if !isempty(niqq)
            add(stats_niqq, niqq)
        end
    end
end


