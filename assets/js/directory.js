function addLink(elemParent, {type, title, href}) {
  let elemLink = document.createElement('a');
  elemLink.setAttribute('href', href);
  elemLink.setAttribute('title', title);
  if (type === 'folder')
    elemLink.className = 'folder';
  else {
    let i = title.lastIndexOf('.');
    let ext = title.slice(i + 1);
    elemLink.className = `file ${ext}`;
  }
  elemLink.innerHTML = title;
  elemParent.appendChild(elemLink);
}
window.onload = () => {
  fetch('_directory_.json')
    .then(_ => _.json())
    .catch(() => [])
    .then(({title, files}) => {
      document.title = title;

      let elemH1 = document.getElementsByTagName('h1')[0];
      addLink(elemH1, {type: 'folder', title, href: './'});

      let elemFiles = document.getElementById('files');
      let elemListItem = document.createElement('li');
      addLink(elemListItem, {type: 'folder', title: '../', href: '../'});
      elemFiles.appendChild(elemListItem);

      files = (
        files
          .map((file, i, a) => ({file, rank: i + (file.type === 'folder' ? a.length : 0)}))
          .sort((a, b) => b.rank - a.rank)
          .map(_ => _.file)
      );
      files.forEach(({type, title, href}) => {
        if (
          typeof type === 'string' &&
          typeof title === 'string' &&
          typeof href === 'string'
        ) {
          let elemListItem = document.createElement('li');
          addLink(elemListItem, {type, title, href});
          elemFiles.appendChild(elemListItem);
        }
      })
    })
};