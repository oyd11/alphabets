

bible_text_file = "bible_txt/Amharic_Bible_all.txt"
include("../tigrinya/geez_common.jl")

j = JSON.parsefile("alphabet_amharic.json")
consonant_base = j["consonant_base"]
vowel_base = j["vowel_base"]

for (k,v) in other_words
    println("out/$k.csv")
    open("out/$k.csv","w") do f
        open("out/$k.freq.csv","w") do ff
            println(f,"word,trans")
            println(ff,"word,count,trans")
            for (w,freq) in v
                println(f,join([w,xlit(w)] ,", "))
                println(ff,join([w,freq,xlit(w)] ,", "))
            end
        end
    end
end

# raw string data:
# s.data
#
