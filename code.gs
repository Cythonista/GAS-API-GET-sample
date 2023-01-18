function doGet() {
  payload = getSheetData();
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(payload);
  console.log(response.getContent());
  return response;
}

function getSheetData() {
  // シートデータの取得
  const values = SpreadsheetApp.getActiveSpreadsheet().getDataRange().getValues();
  // 分割代入
  const [headers, ...records] = values;
  // 雑にスキーマコンバート
  headers[0] = 'id';
  headers[1] = 'name';
  headers[2] = 'memo';
  headers[3] = 'create_date';
  headers[4] = 'update_date';

  console.log(records[3][0]);

  const objects = records.map(record => 
    Object.fromEntries(
      record.map((value, i) => [headers[i], value])
    )
  );
  const total_results_returned = objects.length;
  const object = {total_results_returned, objects}
  console.log(JSON.stringify(object));
  return JSON.stringify(object);
}

