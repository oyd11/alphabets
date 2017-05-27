

using JSON
letters_all = JSON.parsefile("alphabet_list.json")

letters = letters_all["base_letters"]
letter_count = [l => 0 for l in letters]
letters_itr = sort(letters, by=length) |> reverse
xlit = letters_all["base_xlit"]
xlit2ascii = letters_all["base_2ascii"]
xlit_itr = sort(xlit|>keys|>collect, by=length) |> reverse

"bruteforce matches for tranlitaration::"
brute_xlit(word) = begin
    letters_in_word = Dict()
    for l in xlit_itr
      cnt = matchall(Regex(l) ,word ) |> length
      word = replace(word,Regex(l),xlit[l])
      if cnt > 0
          letters_in_word[l] = cnt
      end
    end
    return word, letters_in_word
end

