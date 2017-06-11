"use strict";

// geez to latin script ::

// paste text:
//ድሮ ስድስት ዓመት ሲሆነኝ እውነተኛ ትሪኮች በተሰኘ ርእስ ስለ ድንግል ደኖች በተጻፈ መጽሐፍ ውስጥ አንድ ግፋም ሥዕል አየሁ።

// ደብዳቤ መጻፍ


var consBase = {};
// hash table::
consBase = {
  'ሀ': 'h',
  'ለ': 'l',
  'ሐ': 'ḥ',
  'መ': 'm',
  'ሠ': 'ś',
  'ረ': 'r',
  'ሰ': 's',
  'ሸ': 'š',
  'ቀ': 'q',
  'ቈ': 'qʷ',
  'ቐ': 'q̄',
  'ቘ': 'q̄ʷ',
  'በ': 'b',
  'ቨ': 'v',
  'ተ': 't',
  'ቸ': 'č',
  'ኀ': 'ḫ',
  'ኈ': 'ḫʷ',
  'ነ': 'n',
  'ኘ': 'ñ',
  'አ': 'ʔ',
  'ከ': 'k',
  'ኰ': 'kʷ',
  'ኸ': 'ḵ',
  'ዀ': 'ḵʷ',
  'ወ': 'w',
  'ዐ': 'ʕ',
  'ዘ': 'z',
  'ዠ': 'ž',
  'የ': 'y',
  'ደ': 'd',
  'ዸ': 'ḍ', // ??
  'ጀ': 'ǧ',
  'ገ': 'g',
  'ጐ': 'gʷ',
  'ጘ': 'ŋ',
  'ጠ': 'tʼ',
  'ጨ': 'čʼ',
  'ጰ': 'pʼ',
  'ጸ': 'ṣ',
  'ፀ': 'ṩ',
  'ፈ': 'f',
  'ፐ': 'p'
};


function clickSubmitText() {
  var inTxt = $("textarea[name=textgeez]").val();
  $("#testoutRaw").html(tranlit(inTxt));
  $("#testoutTable").html(tranlitAsTable(inTxt));
  //$("#testoutTable").append( tranlitAsTable(inTxt) );    
}

$(document).ready(function() {
  clickSubmitText();
});


function writeAllGeez() {
  var outStr = '';
  for (var i = 0x1200; i < 0x1380; i += 8) {
    for (var j = 0; j < 8; ++j) {
      outStr += String.fromCharCode(i + j);
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
  var vowel = ['ä', 'u', 'i', 'a', 'e', '', 'o', 'wa'];
  var row = char.charCodeAt() & 0x7;
  return vowel[row];
}


function geezToLatinConsonant(char) { // returns a string
  var asChar = String.fromCharCode(char.charCodeAt() & (~0x7));
  return consBase[asChar];
}

var puncTable = {
  'ፘ': 'RYA',
  'ፙ': 'MYA',
  'ፚ': 'FYA',
  '፠': '/section/',
  '፡': ' ',
  '።': '.',
  '፣': ',',
  '፤': ';',
  '፥': ':',
  '፦': '<',
  '፧': '?',
  '፨': '/parag/',
  '፩': '1',
  '፪': '2',
  '፫': '3',
  '፬': '4',
  '፭': '5',
  '፮': '6',
  '፯': '7',
  '፰': '8',
  '፱': '9',
  '፲': '10+',
  '፳': '20+',
  '፴': '30',
  '፵': '40',
  '፶': '50',
  '፷': '60',
  '፸': '70',
  '፹': '80',
  '፺': '90',
  '፻': '100',
  '፼': '1000'
};

function geez2Lat(ch) {
  var ret = '';
  if (isGeezCharCode(ch)) {
    if (isGeezPunc(ch)) {
      ret += puncTable[ch];
    } else {
      ret += geezToLatinConsonant(ch) + geezToLatinVowel(ch);
    }
  } else {
    ret += ch;
  }
  return ret;
}

function tranlit(str) {
  var c = str.split('');
  var ret1 = '';
  var ret2 = '';
  for (var i = 0; i < c.length; ++i) {
    var ch = c[i];
    ret1 += ch;
    ret2 += geez2Lat(ch);
  }
  return ret2;
  //ret1 +' ::__::'+ ret2;
}

function tranlitAsTable(str) {
  var words = str.split(' ');
  var retTable = $('<div>');
  words.forEach(function(word) {
    word2Table(word).appendTo(retTable)
  });
  return retTable;
}

function word2Table(word) {
  var t = $('<table>');
  var chars = word.split('');
  var row = $('<tr>');
  chars.forEach(function(ch) {
    var cell = $('<td>');
    cell.text(ch).appendTo(row);
    row.appendTo(t);
  })
  row = $('<tr>');
  chars.forEach(function(ch) {
    var cell = $('<td>');
    cell.text(geez2Lat(ch)).appendTo(row);
    row.appendTo(t);
  })
  return t;
}

