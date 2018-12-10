const {ui, app, Composite, ScrollView, Button, ToggleButton, TextView, TextInput} = require('tabris');

createUrlButton('https://badssl.com/');
createUrlButton('https://self-signed.badssl.com/');
createUrlButton('https://freegeoip.net/');
createUrlButton('http://freegeoip.net/');
createUrlButton('https://google.com/');
createUrlButton('http://google.com/');

new Button({
  left: 10, top: 'prev() 10', right: 10,
  text: 'pin'
}).on({select: pin}).appendTo(ui.contentView);

new Button({
  left: 10, top: 'prev() 10', right: 10,
  text: 'unpin'
}).on({select: unpin}).appendTo(ui.contentView);

new Button({
  left: 10, top: 'prev() 10', right: 10,
  text: 'badPin'
}).on({select: badPin}).appendTo(ui.contentView);

function createUrlButton(url) {
  new Button({
    left: 10, top: 'prev() 10', right: 10,
    text: url
  }).on({select: doRequest}).appendTo(ui.contentView);
}

function pin() {
  app.pinnedCertificates = [
    {host: '*.badssl.com',  hash: 'sha256/9SLklscvzMYj8f+52lp5ze/hY0CFHyLSPQzSpYYIBm8=', algorithm: 'ECDSA256'},
    {host: 'freegeoip.net', hash: 'sha256/+SVYjThgePRQxQ0e8bWTQDRtPYR/xBRufqyMoeaWteo=', algorithm: 'ECDSA256'}
  ];
}

function unpin() {
  app.pinnedCertificates = [];
}

function badPin() {
  app.pinnedCertificates = [
    {host: '*.badssl.com',  hash: 'sha256/9SLklscvzMYj8f+52lp5zd/hY0CFHyLSPQzSpYYIBm8=', algorithm: 'ECDSA256'},
    {host: 'freegeoip.net', hash: 'sha256/+SVYjThgePRQxQ0e8bWTQgRtPYR/xBRufqyMoeaWteo=', algorithm: 'ECDSA256'}
  ];
}

function doRequest(ev) {
  const xhr = new XMLHttpRequest();
  xhr.onabort = () => netLog(xhr, 'abort');
  xhr.onerror = () => netLog(xhr, 'error');
  xhr.onload = () => netLog(xhr, 'load');
  xhr.onloadend = () => netLog(xhr, 'onloadend');
  xhr.onloadstart = () => netLog(xhr, 'onloadstart');
  xhr.onprogress = () => netLog(xhr, 'onprogress');
  xhr.onreadystatechange = () => netLog(xhr, 'onreadystatechange');
  xhr.ontimeout = () => netLog(xhr, 'ontimeout');
  xhr.open('GET', ev.target.text);
  xhr.send();
}

function netLog(xhr, ev) {
  let msg = ev + ': ';
  try {
    msg += xhr.status;
    msg += ' ' + xhr.statusText;
  } catch (ex) {
    msg += ex.message;
  }
  try {
    msg += ' ' + xhr.readyState;
  } catch (ex) {
    msg += ' ' + ex.message;
  }
  console.info(msg);
  try {
    console.log(xhr.getAllResponseHeaders());
  } catch (ex) {
    console.log(ex.message);
  }
}