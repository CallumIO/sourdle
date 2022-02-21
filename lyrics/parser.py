import os
import json
import shutil

### Settings ###
customWords = [] # Custom words for this output
separateFiles = False # Output seperate files per song
copyOutput = True # Copy the wordlist output to the correct folder
### End Settings ###

files = os.listdir("input")
c=1
chrw = ""
cur_words = []
words_dict = {}
l = 5
for file in files:
    f=open(os.path.join("input", file),'r')
    while 1:
        sp = f.read(1)
        if c <= l:
            chrw += sp
        if c > l:
            if sp == " ":
                c = 1
                if len(chrw)>0:
                    cur_words.append(chrw)
                    chrw = ""
            elif sp != " ":
                chrw = ""
        c += 1
        if sp == " " and c != 5:
            chrw = ""
            c = 1
        if not sp:
            break
    cur_words = list(dict.fromkeys(cur_words))
    words_dict[file] = cur_words
    cur_words = []
    f.close()

total = []
for x in words_dict.keys():
    newArr = []
    for i in words_dict[x]:
        if not (i.__contains__(" ") or i.__contains__("\n") or i.__contains__("'") or i.__contains__(",")):
            newArr.append(i)
    words_dict[x] = newArr
    if separateFiles:
        with open(os.path.join("output", x), 'w') as fileHandler:
            json.dump(words_dict[x], fileHandler)
    total += words_dict[x]

for i in customWords:
    total.append(i)
    
total = list(dict.fromkeys(total))

with open(os.path.join("output", "wordlist.ts"), 'w') as fH:
    fH.write("export const WORDS = [\n")
    for i in total:
        fH.write(str.format("  \'{x}\',\n",x=i))
    #json.dump(total,fH)
    fH.write("]")

if copyOutput:
    shutil.copy(os.path.join("output", "wordlist.ts"), os.path.join("..", "src", "constants", "wordlist.ts"))