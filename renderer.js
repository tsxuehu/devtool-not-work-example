
setTimeout(_ => {
  let xmlhttp = new XMLHttpRequest();
  let url = `http://127.0.0.1:8899/json/list?t=${new Date().getTime()}`;
  xmlhttp.open('GET', url, true);
  xmlhttp.onreadystatechange = onReady;
  xmlhttp.send();

  function onReady() {
    if (this.readyState == 4 && this.status == 200) {
      if (this.response != null) {
        let pageList = JSON.parse(this.response);
        for(let page of pageList) {
          let { devtoolsFrontendUrl, parentId, url, webSocketDebuggerUrl } = page;
          if ( url.indexOf('test') > -1 ) {
            let devtoolUrl = `http://127.0.0.1:8899${devtoolsFrontendUrl}`;
            let devtool = document.getElementById('devtool');
            devtool.loadURL(devtoolUrl);
           return;
          }
        }
      }
    }
  }
}, 500)
function refresh() {
  let webview = document.getElementById('webview');
  webview.reload();
}
