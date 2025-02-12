if (navigator && navigator.clipboard) {
  addCopyButtons(navigator.clipboard);
} else {
  var script = document.createElement('script');
  script.src = '/assets/js/clipboard-polyfill.promise.js';
  script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=';
  script.crossOrigin = 'anonymous';
  script.onload = function () {
    addCopyButtons(clipboard);
  };

  document.body.appendChild(script);
}

/**
 * 
 * @param {Clipboard} clipboard 
 */
function addCopyButtons(clipboard) {
  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    var button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    var span = document.createElement('span');
    span.style = 'font-size: 16px;';
    span.innerText = 'copy';
    button.appendChild(span);

    button.addEventListener('click', function () {
      clipboard.writeText(codeBlock.innerText).then(function () {
        /* Chrome doesn't seem to blur automatically,
           leaving the button in a focused state. */
        button.blur();

        span.innerText = 'copied';

        setTimeout(function () {
          span.innerText = 'copy';
        }, 3e3);
      }, function (error) {
        span.innerText = 'error';
      });
    });

    var pre = codeBlock.parentNode;
    if (pre.parentNode.classList.contains('highlight')) {
      var highlight = pre.parentNode;
      highlight.parentNode.insertBefore(button, highlight);
    } else {
      pre.parentNode.insertBefore(button, pre);
    }
  });
}