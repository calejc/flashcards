function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  return template.evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1, shrink-to-fit=no').setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
  console.log('Got here!');
}
