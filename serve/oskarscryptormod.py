#!/usr/bin/python3
# -*- coding: utf-8 -*

import sys

import math,random

import base64
def stringToBase64(s):
    return base64.b64encode(s.encode('utf-8'))

def base64ToString(b):
    return base64.b64decode(b).decode('utf-8')

def encrypt(msg,key=""):
    if key=="":
        for i in range(1,9):
            key=key+chr(random.randint(97,122))
    i=0
    encrypted=""
    for char in msg:
        if i==len(key):
            i=0
        encrypted+=chr(ord(char)+ord(key[i]))
        i=i+1
    return [encrypted,key]

def decrypt(msg,key):
    i=0
    decrypted=""
    for char in msg:
        if i==len(key):
            i=0
        decrypted+=chr(ord(char)-ord(key[i]))
        i=i+1
    return [decrypted,key]

i_key = sys.argv[1]
i_msg = base64ToString(sys.argv[2])
i_enorde = sys.argv[3]

#print("Key:", i_key, "Msg:", i_msg, "EnOrDe:", i_enorde)

o_output = "empty output"
o_print = "error?!"

if i_enorde == "True":
    print("<br>\nEncrypting..")
    o_output = encrypt(i_msg, i_key)
    o_output.append(stringToBase64(o_output[0]))

    #o_output[0] = o_output[0].encode('utf-8')
    o_output[0] = stringToBase64(o_output[0])
    o_output.insert(0, "HIER")
    o_output.insert(2, "DA")

    o_print = str(o_output)
elif i_enorde == "False":
    print("<br>\nDecrypting..")
    o_output = decrypt(i_msg, i_key)
    o_output.append(stringToBase64(o_output[0]))

    o_print = str(o_output)

print("<br>\nOutput..:<br>\n", o_print)
input("")
