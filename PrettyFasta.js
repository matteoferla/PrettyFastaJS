// JavaScript Document
/*
Pretty fasta will load onload and change all fasta classed elements.
While if you want to prettify an element after load, you will have to send the sequence to PrettyFastaText.
taggedfasta=PrettyFastaText(rawfasta)
*/
//There is a weird thing that the non-breaking hyphen and the hyphen are not monospaced in some monospaced fonts.
var FASTAHYPHEN = "&ndash;";
//No breaking hyphen is "&#8209;";
//rubbish title or a tooltip from Bootstrap, JQuery or something else?
var FASTATOOLTIP = "title";


if (window.attachEvent) {
    window.attachEvent('onload', PrettyFasta);
} else {
    if (window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            PrettyFasta();
        };
        window.onload = newonload;
    } else {
        window.onload = PrettyFasta;
    }
}

function PrettyFastaSequencer(text, seqnumber) {
	var munged="<span class='fastasequence'>";
    //munged+="<span class='fasta"+fasta[l][c]+"'>"+fasta[l][c]+"</span>";
    //I want to colour depending on type.
    //Determine type.
    var proteinaceous = 0;
    var translation = 'error';
    var translator = { //defaults to nucleotide...
        A: 'adenine',
        C: 'cytosine',
        T: 'thymine',
        G: 'guanine',
        _: 'space',
        N: 'any'
    };
    //There is only B and U which are give away nucleotides, so best do the protein way.
    if (seq.search(/[EFILOPQ]/) != -1) {
        proteinaceous = 1;
        translator = {
            A: 'alanine',
            C: 'cysteine',
            G: 'glycine',
            P: 'proline',
            V: 'valine',
            I: 'isoleucine',
            L: 'leucine',
            M: 'methionine',
            F: 'phenylalanine',
            Y: 'tyrosine',
            W: 'tryptophan',
            H: 'histidine',
            K: 'lysine',
            R: 'arginine',
            Q: 'glutamine',
            N: 'asparagine',
            E: 'glutamate',
            D: 'aspartate',
            S: 'serine',
            T: 'threonine',
            B: 'asparx', //no idea if there is a name for this...
            Z: 'glutamz',
            _: 'gap'
        };
    }

    //Colour accordingly.
    for (var c = 0; c < seq.length; c++) {
        var label = "" + (1 + c)
        var pad = Array(Math.floor(Math.log10(seq.length)) + 2).join('0');
        var label = " " + pad.substring(0, pad.length - label.length) + label + "&nbsp;";
        if (c == 0) {
            munged += "<span class='fastaspace0' block-number='" + label + "'></span>";
        } else if (c % 1000 == 0) { //What if someone wants a babylonian counting system?
            munged += "<span class='fastaspace1000' block-number='" + label + "'></span>";
        } else if (c % 100 == 0) {
            munged += "<span class='fastaspace100' block-number='" + label + "'></span>";
        } else if (c % 50 == 0) {
            munged += "<span class='fastaspace50'  block-number='" + label + "'></span>";
        } else if (c % 20 == 0) {
            munged += "<span class='fastaspace20'  block-number='" + label + "'></span>";
        } else if (c % 10 == 0) {
            munged += "<span class='fastaspace10' block-number='" + label + "'></span>";
        } else if (c % 5 == 0) {
            munged += "<span class='fastaspace5' block-number='" + label + "'></span>";
        }

        var token = seq[c];
        var letter = seq[c];
        if ((token == '.') || (token == '-')) {
            token = '_';
            letter = FASTAHYPHEN;
        }
        try { //I cannot figure out a case where this would trigger but I thought it best to be safe.
            //seq
            translation = translator[token];
        } catch (err) {
            console.log(seq[c] + ' is some weird unicode symbol?!');
            translation = 'undefined';
        }
        munged += "<span class='fasta" + translation + "' " + FASTATOOLTIP + "='" + (c + 1) + "' id='fasta" + seqnumber + "_" + letter + (c + 1) + "'>" + letter + "</span>";
    }
    munged += "</span><br/><br/>";
	return munged;
	}

function PrettyFastaText(text, seqnumber) {
    seqnumber = seqnumber || 0;
    var munged = '';
    var seq = '';
    var fasta = text.split('\n');
    for (var l = 0; l < fasta.length; l++) {
        //console.log(fasta[l]);
        if (fasta[l].search('&gt;') != -1) {
			if (!! seq) {munged += PrettyFastaSequencer(seq, seqnumber); seq='';}
            fasta[l] = fasta[l].replace(/\[(.*?)\]/, "\[\<span class='fastaspecies'\>$1\<\/span\>\]")
            munged += "<span class='fastaheader'>" + fasta[l] + "</span><br/>";
        } else {
            seq += fasta[l].replace(/\s|\r\w/g, '');
        }
    }
    munged += PrettyFastaSequencer(seq, seqnumber);
    return munged;
}


function PrettyFasta() {
    var fastalist = document.getElementsByClassName("fasta");
    for (var i = 0; i < fastalist.length; i++) {
        var fastain = fastalist.item(i).innerHTML;
        var fastout = PrettyFastaText(fastain, i + 1);
        fastalist.item(i).innerHTML = fastout;
    }
}