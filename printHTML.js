function printHTML(html, title, cssText) {
  var iframe = document.createElement('iframe');
  var iframeName = 'print_html_iframe';
  title = title ? '<title>' + title + '</title>': '';
  iframe.width = 0;
  iframe.height = 0;
  iframe.setAttribute('frameborder', 0);
  iframe.name = iframeName;
  document.body.appendChild(iframe);
  var iframeWin = window.frames[iframeName];
  var iframeDoc = iframeWin.document;
  iframeDoc.write('<html><head>'+title+'</head><body></body></html>');
  var style = iframeDoc.createElement('style');
  var sheets = Array.prototype.slice.call(document.styleSheets);
  var allCssText = '';
  for (var i = 0; i < sheets.length; i++) {
    try {
      var rules = sheets[i].rules || sheets[i].cssRules;
      if (rules) {
        rules = Array.prototype.slice.call(rules);
        for (var j = 0; j < rules.length; j++) {
          allCssText += rules[j].cssText;
        }
      }
    } catch (e) {
      console.warn("Can't read the css rules of: " + sheets[i].href, e);
    }
  }
  if (cssText) {
    allCssText += cssText;
  }
  if (allCssText) {
    style.textContent = allCssText;
    iframeDoc.head.appendChild(style);
  }
  if (typeof html === 'object') {
    iframeDoc.body.appendChild(html)
  } else {
    iframeDoc.body.innerHTML = html;
  }
  iframeWin.print();
  iframe.parentNode.removeChild(iframe);
}

export default printHTML;