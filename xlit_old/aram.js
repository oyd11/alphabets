"use strict";

// aramaic to hebrew script :
// http://unicode-table.com/en/sections/hebrew/
// Hebrew 0590—05FF
// Hebrew version, Yiddish - to follow

var letterBase = {};
    // hash table::
letterBase = {
    '\u0710' : 'א',
    '\u0711' : '^א',
    '\u0712' : 'ב',
    '\u0713' : 'ג',
    '\u0714' : '^ג',
    '\u0715' : 'ד',
    '\u0716' : '^ד',
    '\u0717' : 'ה',
    '\u0718' : 'ו',
    '\u0719' : 'ז',
    '\u071A' : 'ח',
    '\u071B' : 'ט',
    '\u071c' : '^ט',
    '\u071d' : 'י',
    '\u071e' : '^י',
    '\u071f' : 'כ',
    '\u0720' : 'ל',
    '\u0721' : 'מ',
    '\u0722' : 'נ',
    '\u0723' : 'ס',
    '\u0724' : '^ס',
    '\u0725' : 'ע',
    '\u0726' : 'פ',
    '\u0727' : '^פ',
    '\u0728' : 'צ',
    '\u0729' : 'ק',
    '\u072a' : 'ר',
    '\u072b' : 'ש',
    '\u072c' : 'ת'
};


//test:

//var aa = 'ፊደል  ሐ ሁ ሂ ሃ ሄ ህ ሆ ሹ	ሺ	ሻ	ሼ	ሽ	ሾ'; // geez script text...
var aa ='ܫܠܡܐ ܠܟ ܡܢ ܘܝܩܝܦܕܝܐ ܕܠܫܢܐ ܣܘܪܝܝܐ!...';
$("#test1").text( aa );
$("#test2").text( tranlit(aa) );
$("#test3").text( writeAllAram() );

function writeAllAram(){
    var outStr = '';
    for (var i = 0x0710 ; i < 0x072d ; i++) {
            outStr += String.fromCharCode(i);
    }
    return outStr;
}

// char table:

function isAramCharCode(char) { // returns Bool
    var c = char.charCodeAt();
    return (c >= 0x0710) && (c < 0x072d);
}

function aramToHebrew(char) { // returns a string
    return letterBase[char];
}
    
function tranlit(str) {
    var c = str.split('');
    var ret1 = '';
    var ret2 = '';
    for ( var i = 0; i < c.length; ++i ) {
	var ch = c[i];
        ret1 += ch;
	    if (isAramCharCode(ch)){
			    ret2 += aramToHebrew(ch);
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

