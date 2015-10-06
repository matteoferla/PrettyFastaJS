# PrettyFastaJS
Script to embed in a pretty way a fasta file in a website, such as blog.

The JavaScript `PrettyFasta.js` reads any element of the class fasta, guesses whether they are DNA or protein and adds colour to them based on the settings in `PrettyFasta.css` and adds a number as title (tooltip on hover, this can be changed easily in the first line of the JS).
These two are added with the following lines anywhere in the code:
```
<link rel="stylesheet" type="text/css" href="//rawgit.com/matteoferla/PrettyFastaJS/master/PrettyFasta.css"/>
<script src="//rawgit.com/matteoferla/PrettyFastaJS/master/PrettyFasta.js"></script>
```

A demo is present [here](http://rawgit.com/matteoferla/PrettyFastaJS/master/demo.html).