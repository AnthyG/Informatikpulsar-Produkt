marked.setOptions({
    "gfm": true,
    "breaks": true,
    "sanitize": true,
    "smartLists": true,
    "smartypants": true,
    "highlight": function(code) {
        // console.log("Highlighting >> ", code)
        return hljs.highlightAuto(code).value;
    }
});

var markedR = new marked.Renderer();

markedR.table = function(header, body) {
    return '<table class="table">\n' +
        '<thead class="thead-light">\n' +
        header +
        '</thead>\n' +
        '<tbody>\n' +
        body +
        '</tbody>\n' +
        '</table>\n'
}

markedR.link = function(href, title, text) {
    var href = href || '',
        title = title || '',
        text = text || '';

    if (this.options.sanitize) {
        try {
            var prot = decodeURIComponent(unescape(href))
                .replace(/[^\w:]/g, '')
                .toLowerCase();
        } catch (e) {
            return '';
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
            return '';
        }
    }

    return '<a href="' + href + '" onclick="return loadPage(\'' + href + '\');" ' + (title ? ('title="' + title + '"') : '') + '>' + text + '</a>';
};

markedR.image = function(e, t, n) {
    this.options.baseUrl && !g.test(e) && (e = u(this.options.baseUrl, e));
    var r = '<img class="img-fluid border" src="' + e + '" alt="' + n + '"';
    return t && (r += ' title="' + t + '"'),
        r += this.options.xhtml ? "/>" : ">"
};

markedR.blockquote = function(text) {
    return "<blockquote class='blockquote'>\n" + text + "</blockquote>\n";
};



function shorten(str, maxLen, separator = ' ') {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
}

function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(:([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



var pages = {
    "?p:": {
        url: "/pages/main.md",
        vars: {
            "titelbild": '<div class="jumbotron" id="jumboheader" title="http://netdna.webdesignerdepot.com/uploads/2016/04/featured_code.jpg"><h1 class="#display-4 text-monospace">Informatikpulsar</h1></div>',
            "artikelliste": ''
        },
        events: {
            onload: function() {

            }
        },
        content: null
    },
    "?p:about": {
        url: "/pages/about.md",
        events: {
            onload: function() {

            }
        },
        content: null
    },
    "?p:autoautos": {
        url: "/pages/autoautos.md",
        events: {
            onload: function() {

            }
        },
        content: null
    },
    "?p:alltagski": {
        url: "/pages/alltagski.md",
        events: {
            onload: function() {

            }
        },
        content: null
    },
    "?p:enandde": {
        url: "/pages/enandde.md",
        vars: {
            "apipoint": (
                '<div>' +
                (
                    '<div class="form-group">' +
                    (
                        '<label for="enandde_key">Key</label>' +
                        '<input type="text" class="form-control" value="schluessel" placeholder="Key" id="enandde_key" />'
                    ) +
                    '</div>'
                ) +
                (
                    '<div class="form-group">' +
                    (
                        '<label for="enandde_msg">Message</label>' +
                        '<input type="text" class="form-control" value="nachricht" placeholder="Message" id="enandde_msg" />'
                    ) +
                    '</div>'
                ) +
                (
                    '<div class="form-group">' +
                    (
                        '<input type="checkbox" class="form-check-input" checked id="enandde_enorde" />' +
                        '<label for="enandde_enorde" class="form-check-label">Verschlüsseln</label>'
                    ) +
                    '</div>'
                ) +
                (
                    '<button onclick="pages[\'?p:enandde\'].events.submit();" type="submit" class="btn btn-primary">Submit</button>' +
                    '<br /><div id="enandde_output">'
                ) +
                '</div>'
            )
        },
        events: {
            onload: function() {

            },
            submit: function() {
                var key = $('#enandde_key').val();
                var msg = utoa($('#enandde_msg').val());
                var enorde = $('#enandde_enorde').is(':checked') ? "True" : "False";

                var http = new XMLHttpRequest();
                var url = "/enorde.php";
                var params = 'key=' + key + '&msg=' + msg + '&enorde=' + enorde;
                http.open("POST", url, true);

                //Send the proper header information along with the request
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                http.onreadystatechange = function() { //Call a function when the state changes.
                    if (http.readyState == 4 && http.status == 200) {
                        console.log("responsetext", http.responseText);
                        $('#enandde_output').html(http.responseText);
                    }
                }
                http.send(params);
            }
        },
        content: null
    },
    "?p:webdesign": {
        url: "/pages/webdesign.md",
        vars: {
            // "startseite_carousel": '<div class="carousel slide"></div>'
        },
        events: {
            onload: function() {

            }
        },
        content: null
    },
    "?p:quantenpcs": {
        url: "/pages/quantenpcs.md",
        events: {
            onload: function() {

            }
        },
        content: null
    },
};

var artikel = ["about", "autoautos", "alltagski", "webdesign", "enandde", "quantenpcs"];
pages["?p:"].vars["artikelliste"] = '<div class="center">';
for (aK in artikel) {
    var aV = artikel[aK]
    pages["?p:"].vars["artikelliste"] += '\n\n!?[?p:' + aV + ']';
}
pages["?p:"].vars["artikelliste"] += '</div>';

var previewcardpreset = $('#preset_previewcard').html();

function fetchPage(page, cb1) {
    // console.log(page);
    // console.log(pages[page].content);

    if (!pages[page].content) {
        var request = new XMLHttpRequest();
        request.open("GET", pages[page].url);
        request.responseType = "text";

        request.onload = function() {
            var content = request.response;

            pages[page].content = content; // cache the content

            cb1(content);
        };

        request.send();
    } else {
        var content = pages[page].content;

        cb1(content);
    }
}

function genContentPreview(page, cb1) {
    fetchPage(page, function(content) {
        var title = "",
            authoredby = "",
            body = "";

        var spltcntnt = content.split("!---!");
        var tasplt = spltcntnt[0].split("\n");

        title = tasplt[0].trim();
        authoredby = tasplt[2].trim();

        title = title.substr(2, title.length - 2);
        authoredby = authoredby.substr(2, authoredby.length - 2);

        body = spltcntnt[1];

        // var repcntnt = content.replace(/(?:\#\ (.+)\n\n)(?:\>\ (.+)\n\n)((?:.|\s)*)/g, function(match, p1, p2, p3) {
        //     console.log("content check", match, p1, p2, p3);

        //     return '# REPLACED ' + p1 + '\n\n> ' + p2 + '\n\n' + p3 + '';
        // });
        // var repcntnt = /\#\ (.+)\n\n\>\ (.+)\n\n((?:.|\s)*)/g.exec(content);
        // console.log("replaced content", page, repcntnt);

        var shortbody = shorten(body, 200);

        var cntntvars = {
            "page": page,
            "title": title,
            "titlelink": '[' + title + '](' + page + ')',
            "authoredby": authoredby,
            "body": body,
            "shortbody": shortbody + ' **[\[...\]](' + page + ')**'
        };

        // console.log("preview", page, cntntvars);

        var cmpltcntnt = previewcardpreset
            .replace(/\{\{(.+)\}\}/gm, function(match, p1) {
                var p1 = p1.trim();
                // console.log("populate preset", match, p1);
                return marked(
                    cntntvars[p1]
                    // .replace(/^(.{11}[^\s]*).*/gi, "$1")
                    , {
                        renderer: markedR
                    });
            });
        // var cmpltcntnt = '# [' + title + '](' + page + ')\n\n' + shortbody + ' **[\[...\]](' + page + ')**';
        // var cmpltcntnt = '# ' + title + '\n\n' + shortbody + ' **[\[...\]](' + page + ')**';

        // console.log(page, [cmpltcntnt]);

        $('[cntntprvw="' + page + '"]').replaceWith(cmpltcntnt);

        cb1();
    });
}

function loadPage(page, hstrypsh) {
    var hstrypsh = hstrypsh == false ? false : true;
    fetchPage(page, function(content) {
        var cc = $('#content');
        // console.log("content", page, content);
        // console.log(content.match(/\n\!\-\-\-\!/));
        cc.html(
            marked(
                content
                .replace(/\n\!\-\-\-\!/, function(match) {
                    return '';
                }), {
                    renderer: markedR
                })
            .replace(/\{\{(.+)\}\}/gm, function(match, p1) {
                var p1 = p1.trim();
                // console.log("var in page", page, p1);
                return pages[page].vars[p1];
            })
            .replace(/(\!\?\[(\?.+)\])/gm, function(match, p1, p2) {
                // !?[?autoautos]
                // console.log(match, p1, p2);

                setTimeout(function() {
                    genContentPreview(p2, function() {});
                }, 0);

                return '<div cntntprvw="' + p2 + '"></div>';
            })
        );

        pages[page].events.onload();

        if (hstrypsh) {
            history.pushState({
                "page": page
            }, "IPulsar - " + page, page);
            // window.location.search = page;
        }

        $(window).scrollTop(0);
    });

    return false;
}

$(document).ready(function() {
    setTimeout(function() {
        var qs0 = getParameterByName("p");

        if (!pages['?p:' + qs0]) {
            qs0 = "";
        }

        console.log("Loading page", qs0);

        loadPage('?p:' + qs0);
    }, 0);
});

window.onpopstate = function(evt) {
    setTimeout(function() {
        // var qs0 = getParameterByName("p");
        var qs0 = evt.state.page;

        console.log(evt.state);

        if (!pages[qs0]) {
            qs0 = "";
        }

        console.log("Switching page", qs0);

        loadPage(qs0, false);
    }, 0);
};
