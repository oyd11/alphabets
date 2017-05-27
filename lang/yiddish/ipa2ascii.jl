
include("yiddish_common.jl")

open("ipa2ascii.csv","w") do f
    println(f,"Yiddish, IPA, ascii")
    for l in letters
        println(f,join([l, xlit[l], xlit2ascii[l]],", "))
    end
end
