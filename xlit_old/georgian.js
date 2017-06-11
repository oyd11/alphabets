
// tooltip

"use strict";

// georgian to latin script ::


// alt:
//  s=document.getSelection();for(i=0;i<frames.length;i++){if(s)break;s=frames[i].document.getSelection();}if(!s)void(s=prompt('Enter search terms for Wikipedia',''));wikiw=open('http://en.wikipedia.org/'+(s?'w/wiki.phtml?search='+s:''));wikiw.focus();

var letters = {};
    // hash table::
letters = {
    'ა' : 'a',
    'ბ' : 'b',
    'გ' : 'g',
    'დ': 'd',
    'ე' : 'e',
    'ვ' : 'v',
    'ზ' : 'z',
    'თ' : 't',
    'ი' : 'i',
    'კ' : "k'",
    'ლ' : 'l',
    'მ' : 'm',
    'ნ' : 'n',
    'ო' :'o',
    'პ' : "p'",
    'ჟ' : 'ž',
    'რ' :'r',
    'ს' : 's',
    'ტ' : "t'",
    'უ' : 'u',
    'ფ' : 'p',
    'ქ' : 'k',
    'ღ' : 'ɣ',
    'ყ' : "q`",
    'შ' :'š',
    'ჩ' :'č',
    'ც' : 'c',
    'ძ' : 'Dz',
    'წ' : "c'",
    'ჭ' : "č'",
    'ხ' : 'x',
    'ჯ' : 'Dž',
    'ჰ' : 'h',
};


//test:

var aa = 'ქართული';
$("#test1").text( aa );
$("#test2").html( tranlit(aa) );
$("#test3").text( writeAllKartv() );

function writeAllKartv(){
    var outStr = '';
    for (var i = 0x10d0 ; i < 0x10f1 ; i ++) {
        outStr += String.fromCharCode(i);
    }
    return outStr;
}

// char table:

function isKartvCharCode(char) { // returns Bool
    var c = char.charCodeAt();
    return (c >= 0x10d0) && (c < 0x10f1);
}


function KartvToLatin(char) { // returns a string
    return letters[char];
}
    
function tranlit(str) {
    var c = str.split('');
    var ret1 = '';
    var ret2 = '';
    for ( var i = 0; i < c.length; ++i ) {
	var ch = c[i];
        ret1 += ch;
	    if (isKartvCharCode(ch)){
		       ret2 += KartvToLatin(ch);
         } else {
             ret2 += ch;
         }
    }
    return '<br />' +ret1 +' ::<br />'+ ret2;
}


// inject tooltip to page:

var output = "<div id='output' style='position: fixed; \
    top: 50; \
    right: 0; \
    background: yellow; \
    border: black 1px solid; \
    vertical-align: top;\
    width: 100%;'>this is our tooltip<br>lala<br></div>";

$("body").prepend(output);
//$("body").append(output);

function runTooltip (e,textProcess) {
    var current_element = $(e.target);
    if(current_element.children().length == 0)    {
        var inTxt = current_element.text();
        var outTxt = textProcess(inTxt);
        $("#output").html( "**"+ outTxt );
    }
}

$("body").mouseover(function(e){
    runTooltip(e,tranlit);
});
