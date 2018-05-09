#!/usr/bin/python3
# -*- coding: utf-8 -*

from sys import version as python_version

from http.server import BaseHTTPRequestHandler, HTTPServer

from cgi import parse_header, parse_multipart
if python_version.startswith('3'):
    from urllib.parse import parse_qs, unquote
else:
    from urlparse import parse_qs, unquote

import os
import threading

import base64
def stringToBase64(s):
    return base64.b64encode(s.encode('utf-8'))

def base64ToString(b):
    return base64.b64decode(b).decode('utf-8')

from oskarscryptormod import encrypt, decrypt

servepath = "./serve"

mimetypesS = []
mimetypesR = []

mtfile = open("mimetypes.txt", "r")
mtfile_read = mtfile.readlines()
mtfile.close()

for line in mtfile_read:
    if line == "\n":
        continue
    else:
        stuff = line.split(":")
        mimetypesS.append(stuff[0])
        mimetypesR.append(stuff[1])

errorpages = []
errorthings = ["404"]
for err in errorthings:
    try:
        filepath = servepath + "/errors/" + err + ".html"
        file = open(filepath, 'rb')
        errorpages.append(file.read())
        file.close()
    except:
        errorpages.append("")
        continue

class S(BaseHTTPRequestHandler):
    def _set_headers(self, content_type):
        self.send_response(200)
        self.send_header('Content-type', content_type + "; charset=utf-8")
        self.end_headers()

    def do_GET(self):
        print("\n\nRequested: ", str(self.path), unquote(str(self.path)))

        pathnquery = self.path.split("?")

        try:
            patharray = pathnquery[0].split('/')
            filename = unquote(patharray[len(patharray)-1])
            if not(filename):
                filename = "index.html"
            print(filename)

            try:
                filemimestr = filename[filename.rindex('.')+1 : len(filename)]
            except:
                filemimestr = "html"
                filename = "index.html"
                patharray.append("index.html")

            patharray[len(patharray)-1] = filename

            print(filemimestr)
            mimeindex = mimetypesS.index(filemimestr)
            mimetype = mimetypesR[mimeindex]
            print(mimetype)

            filepath = servepath + '' + "/".join(patharray)
            print(filepath)
            file = open(filepath, 'rb')
            content = file.read()
            file.close()
            self._set_headers(mimetype)
            self.wfile.write(content)
        except:
            self._set_headers("text/html")
            self.wfile.write(errorpages[errorthings.index("404")])

    def do_HEAD(self):
        print("HIER", self.path)
        self._set_headers("text/html")

    def do_POST(self):
        ctype, pdict = parse_header(self.headers['Content-type'])

        if ctype == 'multipart/form-data':
            postvars = parse_multipart(self.rfile, pdict)
        elif ctype == 'application/x-www-form-urlencoded':
            length = int(self.headers['Content-length'])
            postvars = parse_qs(self.rfile.read(length), keep_blank_values=1, encoding="utf-8")
        else:
            postvars = {}

        print(postvars)
        
        postkeys = ["key", "msg", "enorde"]
        postvalues = []
        for key in postkeys:
            value = postvars.get(str.encode(key))[0].decode()
            print(key, value)
            postvalues.append(value)

        print(postvalues)

        enordeS = ""
        if postvalues[2] == "True": # enorde == True -> encrypt
            msg = base64ToString(postvalues[1])
            enordeS = encrypt(msg, postvalues[0])
            print("encrypted msg", enordeS[0])
            enordeS.append(stringToBase64(enordeS[0]))
        elif postvalues[2] == "False":
            encmsg = base64ToString(postvalues[1])
            print("decrypting msg", encmsg)
            enordeS = decrypt(encmsg, postvalues[0])
            enordeS.append(stringToBase64(enordeS[0]))

        resS = "<html><body>" + str(postvars) + "<br><br><br>" + str(enordeS) + "</body></html>"
        
        res = str.encode(resS)

        self._set_headers("text/html")
        self.wfile.write(res)

def run(server_class=HTTPServer, handler_class=S, ip="127.0.0.1", port=8000):
    server_address = (ip, port)
    httpd = server_class(server_address, handler_class)
    print('Starte Server...', ip, port);
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(ip=argv[1],port=int(argv[2]))
    else:
        run()
