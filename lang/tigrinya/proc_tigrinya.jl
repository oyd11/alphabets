
bible_text_file = "bible_txt/Tigrinya_Bible_all.txt"
include("geez_common.jl")

j = JSON.parsefile("alphabet_tigrinya.json")
consonant_base = j["consonant_base"]
vowel_base = j["vowel_base"]

for (k,v) in other_words
    open("out/$k.csv","w") do f
    println("out/$k.csv")
        println(f,"word,count,trans")
        for (w,freq) in v
            println(f,join([w,freq,xlit(w)] ,", "))
        end
    end
end

# raw string data:
# s.data
#
