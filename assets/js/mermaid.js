/**
 * @param {string} url 
 * @returns {Promise<void>}
 */
function loadScript(url) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.onload = function () {
      resolve();
    };
    script.onerror = function (event, source, lineno, colno, error) {
      reject(error || new Error(event.toString()));
    };
    document.body.appendChild(script);
  });
}
let scripts = [
  '/assets/npm/mermaid-11.4.1/mermaid.min.js',
  '/assets/js/mermaid-config.js',
];

function findDiagrams() {
  document.querySelectorAll("pre > code[class='language-mermaid']").forEach(elemMermaid => {
    let {parentElement} = elemMermaid;
    if (parentElement) {
      parentElement.removeChild(elemMermaid);
      let nextElemMermaid = document.createElement('pre');
      nextElemMermaid.className = 'mermaid';
      nextElemMermaid.innerHTML = elemMermaid.innerHTML;
      parentElement.appendChild(nextElemMermaid);
      elemMermaid.remove();
    }
  })
}

function main() {
  /**
   * @type {Promise<void>[]}
   */
  let promises = [];
  scripts.forEach(function(url) {
    promises.push(loadScript(url));
  });
  
  Promise.all(promises)
    .then(() => {}, console.error);

  findDiagrams();
}

main();