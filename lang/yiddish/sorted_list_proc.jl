
include("yiddish_common.jl")

data,titles = readcsv("Yiddish-postsort_input.csv",header=true)

letter_seen = [l => false for l in letters ] 
#missing_letters = copy(letters)
missing_letters = Set(letters)

verbose = false

open("tst.csv", "w") do f
    println(f,"list,Map1")
    for i in 1:size(data,1)
        word, word_xlit = data[i,:]
        word_letters = brute_xlit(word)[2] |> keys |> Set
        new_letters = intersect( missing_letters, word_letters)
        if !isempty(new_letters)
            println(f, " ")
            for l in new_letters
                print(f,"Yiddish $l = Roman $(xlit2ascii[l])")
                if xlit[l] != xlit2ascii[l]
                    print(f," (IPA /$(xlit[l])/)")
                end
                print(f,"<br>")
            end
            println(f)
            setdiff!(missing_letters, new_letters)
        end
        println(f,join([word, word_xlit],","))
    end
    if !isempty(missing_letters)
        println(f," ")
        println(f,"!! missing letters: ", join(missing_letters,", "))
    else
        if verbose
            println(f,"# all letters used")
        end
    end
end # close file


