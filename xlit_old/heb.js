"use strict";

// hebrew to latin script :
// http://unicode-table.com/en/sections/hebrew/
// Hebrew 0590—05FF
// Hebrew version, Yiddish - to follow

var letterBase = {};
    // hash table::
letterBase = {
    'א' : 'ʾ',
    'ב' : 'b',
    'ג' : 'g',
    'ד' : 'd',
    'ה' : 'h',
    'ו' : 'v',
    'ז' : 'z',
    'ח' :'ħ',
    'ט' : 'T', 
    'י' : 'y',
    'ך' : 'k',
    'כ' : 'k',
    'ל' : 'l',
    'ם' : 'm',
    'מ' : 'm',
    'ן' : 'n',
    'נ' : 'n',
    'ס' : 's',
    'ע' : 'ɣ',  
    'ף' : 'p',
    'פ' : 'p',
    'ץ' : 'c',
    'צ' : 'c',
    'ק' : 'q',
    'ר' : 'r',
    'ש' : 'š',
    'ת' : 't',
};


//test:

//var aa = 'ፊደል  ሐ ሁ ሂ ሃ ሄ ህ ሆ ሹ	ሺ	ሻ	ሼ	ሽ	ሾ'; // geez script text...
var aa ='שלום! בדיקה, 123 בדיקה, לה לה לה , עכשיו אפשר לקרוא...';
$("#test1").text( aa );
$("#test2").text( tranlit(aa) );
$("#test3").text( writeAllHeb() );

function writeAllHeb(){
    var outStr = '';
    for (var i = 0x05D0 ; i < 0x05EB ; i++) {
            outStr += String.fromCharCode(i);
    }
    return outStr;
}

// char table:

function isHebrewCharCode(char) { // returns Bool
    var c = char.charCodeAt();
    return (c >= 0x05D0) && (c < 0x05EB);
}

function hebrewToLatin(char) { // returns a string
    return letterBase[char];
}
    
function tranlit(str) {
    var c = str.split('');
    var ret1 = '';
    var ret2 = '';
    for ( var i = 0; i < c.length; ++i ) {
	var ch = c[i];
        ret1 += ch;
	    if (isHebrewCharCode(ch)){
			    ret2 += hebrewToLatin(ch);
         } else {
             ret2 += ch;
         }
    }
    return ret1 +' ::__::'+ ret2;
}


// inject tooltip to page:

var output = "<div id='output' style='position: fixed; \
    top: 10; \
    right: 0; \
    background: yellow; \
    border: black 1px solid; \
    width: 100%;'>this is our tooltip</div>";

$("body").prepend(output);

function runTooltip (e,textProcess) {
    var current_element = $(e.target);
    if(current_element.children().length == 0)    {
        var inTxt = current_element.text();
        var outTxt = textProcess(inTxt);
        $("#output").text( "**"+ outTxt +"**" );
    }
}

$("body").mouseover(function(e){
    runTooltip(e,tranlit);
});

