# printHTML

> A plugin for printing partial pages

## Usage

You will need Node.js installed on your system.

```
npm install --save print-mini-html
```
```
import printHTML from 'print-mini-html';

printHTML(document.body.cloneNode(true));

printHTML('<div>print</div>');

printHTML('<div class="red">print</div>', 'title', '.red{color:red;}');

```

## arguments
```
printHTML(html, title, cssText);
```

   | field name                | type    | must | description                                      |
   | --------------------- | ------- | ---- | ----------------------------------------- |
   | html                    | HTMLElement \| DOMString  | true   | DOM to print                 |
   | title                 | DOMString | false  | Default document.title |
   | cssText                 | DOMString | false  | add styles |
