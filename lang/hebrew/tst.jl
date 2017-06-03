
## https://github.com/Sefaria/Sefaria-Export/blob/master/json/Tanakh/Writings/Esther/Hebrew/Tanach with Nikkud.json
## https://raw.githubusercontent.com/Sefaria/Sefaria-Export/master/json/Tanakh/Writings/Esther/Hebrew/Tanach%20with%20Nikkud.json
## http://benyehuda.org/
##
## https://github.com/Sefaria/Sefaria-Export/blob/master/json/Tanakh/Prophets/Ezekiel/Hebrew/Tanach%20with%20Nikkud.json
## https://github.com/Sefaria/Sefaria-Export/raw/master/json/Tanakh/Prophets/Ezekiel/Hebrew/Tanach%20with%20Nikkud.json
## https://github.com/Sefaria/Sefaria-Export/blob/master/json/Tanakh/Prophets/Joel/Hebrew/Tanach%20with%20Nikkud.json
## https://github.com/Sefaria/Sefaria-Export/raw/master/json/Tanakh/Prophets/Joel/Hebrew/Tanach%20with%20Nikkud.json
##
## https://github.com/Sefaria/Sefaria-Export/blob/master/json/Tanakh/Torah/Genesis/Hebrew/Tanach%20with%20Nikkud.json
## https://github.com/Sefaria/Sefaria-Export/raw/master/json/Tanakh/Torah/Genesis/Hebrew/Tanach%20with%20Nikkud.json


# -> ./Hebrew_Esther_Tanach with Nikkud.json

using JSON

fn = "Hebrew_Esther_Tanach with Nikkud.json"

j = JSON.parsefile(fn)

txt_arr_arr=j["text"]
txt_flat = [[txt_arr_arr...]...] |> join
words = split(txt_flat)

#join(split(w[1],"")," | ")

w = words[3]

1

# right shin test:
w = "שָׂדֶה"

#https://en.wikipedia.org/wiki/Shin_(letter)#Unicode_encoding
