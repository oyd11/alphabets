
include("geez_common.jl")

all_geez_chars = map(Char, geez_range)

kv, titles = readcsv("manual_unique.csv", header=true)
tigr =  kv[:,1]

stats_geez = [k=>0 for k in all_geez_chars]

function add(d::Dict, key)
    count_bin = get!(d,key,0)
    d[key] += 1
end

for word in tigr
    for g in graphemes(word)
        letter = g |> first
        add(stats_geez, letter)
    end
end

letters = sort(keys(stats_geez)|>collect)

open("stats.csv","w") do f
    println(f, "letter, count")
    [println(f, join([l, stats_geez[l]],", ")) for l in letters]
end
true
