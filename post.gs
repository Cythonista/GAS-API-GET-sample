function doPost(e) {
  const params = JSON.parse(e.postData.getDataAsString());

  // シートに書き込む
  addSheetData(params)

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ message: "success!" }));

  return output;
}

function addSheetData(params) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  const values = spreadsheet.getDataRange().getValues();

  const lastRow = spreadsheet.getLastRow(); //最終行を取得しておく
  const lastColumn = spreadsheet.getLastColumn(); //最終列を取得しておく

  const [headers,...records] = values;

  const id = lastRow;
  // JSONから取得
  const name = params.name;
  const memo = params.memo;
  const createDate = new Date();
  const updateDate = new Date();

  sheet.appendRow([id, name, memo, createDate, updateDate]);
}
