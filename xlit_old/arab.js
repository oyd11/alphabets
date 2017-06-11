
"use strict";

// arabic to hebrew script :
// http://unicode-table.com/en/sections/arabic/
// Hebrew 0590—05FF
// Arabic 0600—06FF
// http://www.utf8-chartable.de/unicode-utf8-table.pl?start=1536&utf8=string-literal

var letterBase = {};
    // hash table::
letterBase = {
    'ء' : '`א' , // bi-di-reverses rendering in some editors...
    'آ' : 'א`א',
    'أ' : 'א',
    'ؤ' : 'אוּ' ,
    'إ' : 'אי' ,
    'ئ' : 'יא' ,
    'ا' : 'א',
    'ب' : 'ב' ,
    'ة' : 'הּ', 
    'ت' : 'ת' , 
    'ث' : 'תֿ',
    'ج' : 'ג`' ,
    'ح' : 'ח',
    'خ' : 'ח`',
    'د' : 'ד' ,
    'ذ' : 'תּ',
    'ر' : 'ר',
    'ز' : 'ז' , 
    'س' : 'ס',
    'ش' : 'ש' ,
    'ص' : 'צ' , 
    'ض' : 'דּ',
    'ط' : 'ט', 
    'ظ' : 'ז`',
    'ع' : 'ע',
    'غ' : 'ע`', 
    // .. ?
    'ف' : 'פֿ',
    'ق' : 'ק',
    'ك' : 'כּ',
    'ل' : 'ל',
    'م' : 'מ',
    'ن' : 'נ',
    'ه' : 'ה',
    'و' : 'ו',
    'ى' : '!א',
    'ي' : 'י',
};
//test:

var aa ='محتويات · تصانيف · التصنيف الرئيسي · محتويات مختارة · فهرس أ–ي';
$("#test1").text( aa );
$("#test2").text( tranlit(aa) );
$("#test3").text( writeAllAram() );

function writeAllAram(){
    var outStr = '';
    for (var i = 0x0626 ; i < 0x063B ; i++) {
            outStr += String.fromCharCode(i);
    }
    for (var i = 0x0641 ; i < 0x064B  ; i++) { 
          outStr += String.fromCharCode(i);
    }
    return outStr;
}

// char table:

function isArabicCharCode(char) { // returns Bool
    var c = char.charCodeAt();
    return (c >= 0x0620) && (c < 0x064B);
}

function arabicToHebrew(char) { // returns a string
    return letterBase[char];
}
    
function tranlit(str) {
    var c = str.split('');
    var ret1 = '';
    var ret2 = '';
    for ( var i = 0; i < c.length; ++i ) {
	var ch = c[i];
        ret1 += ch;
	    if (isArabicCharCode(ch)){
			    ret2 += arabicToHebrew(ch);
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
