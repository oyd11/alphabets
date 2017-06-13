
l, titles = readcsv("tigrinya_manual.csv",header=true);
u_list = Dict(zip(l[:,1],l[:,2]))

open("manual_unique.csv","w") do f
  println(f, join(titles,", ") )
  [println(f,join(kv,",")) for kv in u_list]
end

true
