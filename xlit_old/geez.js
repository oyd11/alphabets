

// tooltip

"use strict";

// geez to latin script ::


// alt:
//  s=document.getSelection();for(i=0;i<frames.length;i++){if(s)break;s=frames[i].document.getSelection();}if(!s)void(s=prompt('Enter search terms for Wikipedia',''));wikiw=open('http://en.wikipedia.org/'+(s?'w/wiki.phtml?search='+s:''));wikiw.focus();

var consBase = {};
    // hash table::
consBase = {
    'ሀ' : 'h',
    'ለ' : 'l',
    'ሐ' : 'ħ',
    'መ' : 'm',
    'ሠ' : 'ś',
    'ረ' : 'r',
    'ሰ' : 's',
    'ሸ' :'š',
    'ቀ' : 'q', 
    'ቈ' : 'qʷ',
    'ቐ' : 'Q',
    'ቘ' : 'Qʷ',
    'በ' : 'b',
    'ቨ' : 'v',
    'ተ' : 't',
    'ቸ' : 'č',
    'ኀ' : 'ḫ',
    'ኈ' : 'ḫʷ',
    'ነ' : 'n',
    'ኘ' : 'ñ',
    'አ' : '‘',
    'ከ' : 'k',
    'ኰ' : 'kʷ',
    'ኸ' : 'K',
    'ዀ' : 'kʷ',
    'ወ' : 'w',
    'ዐ' : 'ɣ',
    'ዘ' : 'z',
    'ዠ' : 'ž',
    'የ' : 'y',
    'ደ' :'d',
    'ዸ' : 'D',
    'ጀ' :'ǧ',
    'ገ' :'g',
    'ጐ' :'gʷ',
    'ጘ' :'ŋ',
    'ጠ' :'T',
    'ጨ' :'Č',
    'ጰ' :'P',
    'ጸ' :'ṣ',
    'ፀ' :'ṩ',
    'ፈ' :'f',
    'ፐ' :'p'
};


//test:

//var aa = 'ፊደል  ሐ ሁ ሂ ሃ ሄ ህ ሆ ሹ	ሺ	ሻ	ሼ	ሽ	ሾ'; // geez script text...
var aa = 'ለሉሊላሌልሎ  ፊደል ሐበሻ  መዓሙቕ';
$("#test1").text( aa );
$("#test2").text( tranlit(aa) );
//$("#test3").text( writeAllGeez() );

function writeAllGeez(){
    var outStr = '';
    for (var i = 0x1200 ; i < 0x1380 ; i += 8) {
        for ( var j = 0 ; j < 8 ; ++j ) {
            outStr += String.fromCharCode(i+j);
        }
        outStr += "\n";
    }
    return outStr;
}

// char table:

function isGeezCharCode(char) { // returns Bool
    var c = char.charCodeAt();
    return (c >= 0x1200) && (c < 0x1380);
    //  unicode 6.3 Ethiopic::
    //  http://www.unicode.org/charts/PDF/U1200.pdf
}
//		"ሀ".charCodeAt();
//		"፼".charCodeAt(); // first .. last Geez chars

function isGeezPunc(char) { // returns Bool
    var c = char.charCodeAt();
    return (c >= 0x1358) && (c < 0x1380);
}

function displayAllGeez() {
    for (ii = 0x1200; ++i; i < 0x1380) {
        console.log(String.fromCharCode(ii),
        geezToLatinConsonant(ii),
        geezToLatinVowel(ii));
    }
}



function geezToLatinVowel(char) { // returns a string
    var vowel = [ 'ä' , 'u' , 'i' ,'a' ,'e' , '' ,'o' , 'wa' ];
    var row = char.charCodeAt() & 0x7;
    return vowel[row];
}


function geezToLatinConsonant(char) { // returns a string
    var asChar = String.fromCharCode(char.charCodeAt() & (~0x7));
    return consBase[asChar];
}

var puncTable = {
    'ፘ' : 'RYA', 	'ፙ' : 'MYA' , 'ፚ' : 'FYA' ,
    '፠' : '',
    '፡' : '',
    '።'	: '',
    '፣' : '',
    '፤' : '',
    '፥' : '' ,	'፦' : '' ,	'፧' :'' ,	'፨' : '',	
    '፩' : '1',	'፪' : '2',	'፫' : '3', 	'፬' : '4' , 	'፭' : '5',
    '፮' : '6', 	'፯' : '7', '፰' : '8'	, '፱' : '9' , 	'፲': '10+',
    '፳' : '20+', 	'፴':'30',	'፵':'40'	,'፶':'50',	'፷':'60',
    '፸':'70'	,'፹':'80' ,
    '፺':'90',	'፻':'100',	'፼':'1000'	
};
    
    
function tranlit(str) {
    var c = str.split('');
    var ret1 = '';
    var ret2 = '';
    for ( var i = 0; i < c.length; ++i ) {
	var ch = c[i];
        ret1 += ch;
	    if (isGeezCharCode(ch)){
		    if (isGeezPunc(ch)) {
			    ret2 += puncTable[ ch ];
		    } else {
			    ret2 += geezToLatinConsonant(ch) + geezToLatinVowel(ch);
		    }
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

