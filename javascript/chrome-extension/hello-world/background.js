console.log("Hello from Background");

chrome.runtime.sendMessage("Hey");
console.log(chrome);
