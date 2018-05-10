# Ver- & Entschlüsselung

> Tim, Oskar, Raphael

!---!

Der Code:

``` python3
import math,random

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
```

---

Das fertige Resultat:

{{ apipoint }}