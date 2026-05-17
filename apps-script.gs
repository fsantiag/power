// Voltra — Google Apps Script form handler
//
// SETUP:
//   1. Open Google Sheets, create a new spreadsheet
//   2. Extensions > Apps Script — paste this file
//   3. Deploy > New deployment > Web App
//      Execute as: Me
//      Who has access: Anyone
//   4. Copy the web app URL
//   5. In index.html, set SCRIPT_URL to that URL

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add header row on first submission
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data', 'Nome', 'Email', 'Telefone', 'Tipo de Espaço', 'Mensagem']);
  }

  sheet.appendRow([
    new Date(),
    e.parameter.nome      || '',
    e.parameter.email     || '',
    e.parameter.telefone  || '',
    e.parameter.tipo      || '',
    e.parameter.mensagem  || '',
  ]);

  MailApp.sendEmail({
    to      : Session.getEffectiveUser().getEmail(),
    subject : 'Novo interesse Voltra — ' + (e.parameter.nome || 'sem nome'),
    body    : [
      'Nome:      ' + (e.parameter.nome      || ''),
      'Email:     ' + (e.parameter.email     || ''),
      'Telefone:  ' + (e.parameter.telefone  || ''),
      'Tipo:      ' + (e.parameter.tipo      || ''),
      'Mensagem:  ' + (e.parameter.mensagem  || ''),
    ].join('\n'),
  });

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
