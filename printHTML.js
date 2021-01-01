function each(obj, callback) {
  var list = Array.prototype.slice.call(obj)
  var len = list.length
  for (var i = 0; i < len; i++) {
    callback(list[i], i)
  }
}

function template(title, style, body) {
  title = title || document.title
  return '<html><head><title>'+ title +'</title>' + style + '</head>' + body + '</html>';
}

function filterHTML(html) {
  if (typeof html === 'object') {
    html = html.outerHTML
  }
  var dom = new DOMParser().parseFromString(html, 'text/html');
  each(dom.images, function(img) {
    if (img.loading === 'lazy') {
      img.loading = 'eager';
    }
  })
  return dom.body.outerHTML
}

function remove(iframe, delay, callback) {
  var win = iframe.contentWindow;
  if (win.matchMedia) {
    var watch = win.matchMedia('print');
    if (watch.addEventListener) {
      watch.addEventListener('change', handle);
    } else {
      watch.addListener(handle);
    }
  } else {
    setTimeout(handle, delay + 1);
  }
  function handle(e) {
    if (e && e.matches) {
      return;
    }
    if (watch) {
      if (watch.removeEventListener) {
        watch.removeEventListener('change', handle);
      } else {
        watch.removeListener(handle);
      }
    }
    iframe.parentNode.removeChild(iframe);
    callback();
  }
}

function getCallback() {
  var callback = function() {}
  each(arguments, function(fn) {
    if (typeof fn === 'function') {
      callback = fn
    }
  })
  return callback
}

function printHTML(html, title, cssText, delay, callback) {
  delay = delay || 0;
  html = filterHTML(html);
  var inertCSS = '';
  var linkCount = 0;
  var isPrint = false;
  var timer;
  each(document.styleSheets, function(sheet) {
    inertCSS += sheet.ownerNode.outerHTML;
  })
  if (cssText) {
    inertCSS += '<style>' + cssText +'</style>';
  }
  var iframe = document.createElement('iframe');
  iframe.width = 1;
  iframe.height = 1;
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '-999px';
  iframe.setAttribute('frameborder', 0);
  document.body.appendChild(iframe);
  var iframeWin = iframe.contentWindow;
  var iframeDoc = iframeWin.document;
  iframeDoc.write(template(title, inertCSS, html));
  each(iframeDoc.images, function(img) {
    ++linkCount;
    img.onload = onload;
    img.onerror = onload;
  })
  each(iframeDoc.styleSheets, function(sheet) {
    if (sheet.ownerNode instanceof HTMLLinkElement) {
      ++linkCount;
      sheet.ownerNode.onload = onload;
      sheet.ownerNode.onerror = onload;
    }
  })
  onload();
  function onload() {
    if (--linkCount < 0 && !isPrint) {
      isPrint = true;
      timer = setTimeout(flush, delay, delay);
    }
  }
  function flush(delay) {
    remove(iframe, delay, getCallback(title, cssText, delay, callback));
    iframeWin.print();
  }
  return function force() {
    clearTimeout(timer);
    isPrint = true;
    flush(0);
  }
}

export default printHTML;