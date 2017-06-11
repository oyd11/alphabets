
using JSON
using Glob

base_fn(fn) = splitext(splitdir(fn)[end] )[1]

#  unicode 6.3 Ethiopic::
#  http://www.unicode.org/charts/PDF/U1200.pdf

function is_char_in_range(g,r::Range)
    gr = g |> graphemes
    assert(length(gr) == 1)
    letter = first(g)
    return Int(letter) in r
end

function word_freqs(words)
    f_count = Dict()
    for word in words
        count_bin = get!(f_count,word,0)
        f_count[word] += 1
    end
    return f_count
end

dict2sorted_arr(d) = sort([(k,v) for (k,v) in d], by=x->-x[2])

geez_range = 0x1200:0x137f
is_geez(g) = is_char_in_range(g, 0x1200:0x137f )

geez_punctuation = 0x1360:0x1368
r_geez_punctuation = join(map(Char,geez_punctuation),"|") |> Regex
rm_punctuation(str) =  replace(str,r_geez_punctuation,"")

has_geez(str) = any(is_geez,graphemes(str))

words_split(txt) = split(txt,r"׃| |\n")

get_geez_words(arr) = map( rm_punctuation, filter( has_geez, arr) )

bible_words_all = map(chomp,split(readall(bible_text_file)))
bible_words = dict2sorted_arr(word_freqs(get_geez_words( bible_words_all )))

other_text = map(glob("*.txt","other/")) do fn
    base_fn(fn)=> split(join(map(chomp,readlines(fn))," . "))
end |> Dict

aleph_char = 'አ'

function split_geez(c::Char)
    i = Int(c)
    vowel_code = i&0x7
    consonant_code = i&(~vowel_code)
    return map(c->string(Char(c)),[consonant_code, Int(aleph_char) + vowel_code])
end

function xlit_grapheme(g)
    if is_geez(g) && !is_char_in_range(g, geez_punctuation)
        consonant, vowel= split_geez(g|> first)
        c = consonant_base[ consonant ]
        v = vowel_base[ vowel ]
        return join([c,v])
    end
    return g
end

function xlit(word)
    join([xlit_grapheme(g) for g in graphemes(word)])
end


#other_words_all =  [title => words_split(txt) for (title, txt) in other_text]
other_words =  [title => dict2sorted_arr(word_freqs(get_geez_words(txt)))
    for (title, txt) in other_text]

other_words["bible"] = bible_words

mkpath("out")

#
