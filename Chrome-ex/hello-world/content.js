console.log("Hello World from Content");
chrome.runtime.onMessage.addListener(function(val) {
  console.log(val);
});
