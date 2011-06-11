(function() {
  var normalizeEl, parseDOM, parts, simpleDOM, simpleText, wrapDiv;
  wrapDiv = function(textNode) {
    var span;
    span = document.createElement('div');
    span.appendChild(document.createTextNode(textNode.nodeValue));
    return span;
  };
  simpleDOM = [];
  simpleText = [];
  normalizeEl = function(el) {
    var childEl;
    if (!(el != null)) {
      return;
    }
    if (el.nodeType === 3) {
      simpleDOM.push(wrapDiv(el));
      simpleText.push(el.nodeValue);
    } else if (el.nodeName === 'BR') {
      simpleDOM.push(el);
      simpleText.push('\n');
    } else {
      childEl = el.firstChild;
      normalizeEl(childEl);
      if (childEl != null) {
        while (childEl = childEl.nextSibling) {
          normalizeEl(childEl);
        }
      }
    }
  };
  parseDOM = function(el) {};
  parts = ['title', 'author', 'body'];
  $(function() {
    var $content;
    $content = $('#content');
    return $content.bind('keyup', function(e) {
      var el, i, node, part, part_i, tag, tags, text;
      el = document.getElementById('content');
      /*
          range = document.createRange()
          range.selectNodeContents(el)
          range.collapse(true)
          */
      simpleDOM = [];
      simpleText = [];
      normalizeEl(el);
      tags = document.getElementById('tags');
      tags.innerHTML = '';
      part_i = 0;
      for (i in simpleDOM) {
        node = simpleDOM[i];
        text = simpleText[i];
        tag = document.createElement('li');
        tags.appendChild(tag);
        part = parts[part_i];
        if (!(part != null)) {
          continue;
        }
        if (!/\S+/.test(text)) {
          continue;
        }
        tag.innerHTML = part;
        tag.className = 'tag';
        node.className = part;
        part_i++;
      }
      tag = document.createElement('li');
      tags.appendChild(tag);
      part = parts[part_i];
      console.log(simpleDOM);
      console.log(simpleText);
      /*
          selection = window.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
          */
    });
  });
}).call(this);
