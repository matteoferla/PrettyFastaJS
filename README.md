# PrettyFastaJS

Ever want to embed in a pretty way a fasta sequence in a website, such as blog? Well, look no further!

To get it to work you will need an element with your fasta sequence of the class fasta (_e.g._ `<div class=fasta >`) and you will need to add the following lines anywhere in the code:
```
<link rel="stylesheet" type="text/css" href="//rawgit.com/matteoferla/PrettyFastaJS/master/PrettyFasta.css"/>
<script src="//rawgit.com/matteoferla/PrettyFastaJS/master/PrettyFasta.js"></script>
```

## Example
A demo is present [here](http://rawgit.com/matteoferla/PrettyFastaJS/master/demo.html).

## Workings
The JavaScript `PrettyFasta.js` reads any element of the class fasta, guesses whether they are DNA or protein and adds colour to them based on the settings in `PrettyFasta.css` and adds a number as title (tooltip on hover, this can be changed easily in the first line of the JS).

The CSS is pretty well annotated. So if you want to change anything check that.

Space are ignored and dots are converted to hyphens (en dashes actually, there is an issue with monospace not being monospaced).
The font can be anything monospaced. So go Google fonts!

## To Do
I have not tried if the fasta can be external as I am pretty sure href and src will not work, but I'll look into it.


Another thing that would be kind of cool would be having a bar at the bottom with a link to blast the sequence in NCBI and some other data (length, content and what else ??).


## Line numbering change: SOLVED

One issue I knew was that numbering was selected ws not good. In order to address the problem I asked a question on [Stack Exchange](http://stackoverflow.com/questions/32969120/how-to-prevent-part-of-html-text-from-being-copied-when-copying-adjecent).
And the solution was pretty nifty use of the psuedoelement.
```
.fastaspace1000::before {
  content: attr(block-number);
}
```
This also solves the issue that adding spaces while skipping the numbers was accomplished in a tad barbaric way in the CSS:
```
.fastaspace5 {
	width: 1em;
	text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
}
```


## Disclaimer

Enjoy! 
 






