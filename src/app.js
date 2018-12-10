const {ui, Composite, ScrollView, Button, TextView, TextInput} = require('tabris');

createButton('https://badssl.com/');
createButton('https://self-signed.badssl.com/');

function createButton(url) {
  new Button({
    left: 10, top: 'prev() 10', right: 10,
    text: url
  }).on({select: doRequest}).appendTo(ui.contentView);
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