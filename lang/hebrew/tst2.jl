
for x in graphemes("אָשׁלוּ")
    println(x, " _ ", length(x))
        for xx in x
            println(Int(Char(xx)))
    end
end

