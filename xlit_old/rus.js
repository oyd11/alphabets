
"use strict";

// cyrillic to latin:
// http://unicode-table.com/en/sections/cyrillic/
// U+041x - U+045x

var letterBase = {};
    // hash table::
letterBase = {
    'А' : 'A', 	'Б' : 'B', 	'В' : 'V' ,
    'Г' : 'G' , 	'Д' : 'D' , 'Е' : 'Je'	, 'Ж' : 'Ž',
    'З': 'Z', 'И' : 'I' , 'Й' : 'J' , 'К':'K' , 'Л' : 'L', 'М':'M',
    'Н':'N' , 'О' :'O' ,'П' : 'P' ,'Р':'R' ,'С' : 'S' ,'Т':'T', 'У':'U',
    'Ф' :'F' ,'Х': 'X', 'Ц':'C', 'Ч':'Č','Ш':'Š', 	'Щ':'Ś',
    'Ъ' :'`' ,	'Ы':'Y' , 'Ь' : "'", 	'Э':'E' ,'Ю' : 'Ju' , 'Я' : 'Ja',
    'а':'a' ,'б':'b','в':'v','г':'g' ,'д':'d',
    'е':'je' ,'ж':'ž'	,'з':'z'	,'и':'i'	,'й':'j', 'к':'k'	,
    'л':'l' ,	'м':'m',    'н':'n'	,'о':'o'	,'п':'p',
    'р':'r'	,'с':'s'	,'т':'t',	'у':'u',	'ф':'f',
    'х':'x' ,'ц':'c',	'ч':'č'	,    'ш':'š',	'щ':'ś'	,
    'ъ':'`'	,'ы':'y'	,'ь':"'"	,'э':'e'	,'ю':'ju', 	'я':'ja',
    'Ё':'Jë',   'ё':'jë'
};


//test:

var aa ='В корпорации Nike посчитали, что язык бегуна из народа самбуру (на илл.) никто не поймёт.';
$("#test1").text( aa );
$("#test2").text( tranlit(aa) );
$("#test3").text( writeAllCyr() );

function writeAllCyr(){
    var outStr = '';
    for (var i = 0x0410 ; i < 0x0450 ; i++) {
            outStr += String.fromCharCode(i);
    }
    return outStr;
}

// char table:

function isCyrCharCode(char) { // returns Bool
    var c = char.charCodeAt();
    return (c >= 0x0410) && (c < 0x0450);
}

function cyrToLat(char) { // returns a string
    return letterBase[char];
}
    
function tranlit(str) {
    var c = str.split('');
    var ret1 = '';
    var ret2 = '';
    for ( var i = 0; i < c.length; ++i ) {
	var ch = c[i];
        ret1 += ch;
	    if (isCyrCharCode(ch)){
			    ret2 += cyrToLat(ch);
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
