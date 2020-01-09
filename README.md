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

Or manually download and link hotkeys.js in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/browse/print-mini-html@1.0.0/dist/):

```
<script src="https://unpkg.com/print-mini-html@1.0.0/dist/index.js"></script>
<script type="text/javascript">
printHTML('<div class="red">print</div>', 'title', '.red{color:red;}')
</script>
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
