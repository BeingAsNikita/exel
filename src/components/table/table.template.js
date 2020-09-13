const CODES = {
  A: 65,
  Z: 90,
};

function createCell(content) {
  return `
  <div class="cell" contenteditable=""></div>
  `;
}

function createCol(col) {
  return `
    <div class="column" data-type="resizable">
    ${col}
    <div class="col-resize" data-resize="col" data-value="${col}"></div>
    </div>
    `;
}

function createRow(content, index) {
  const resizer = index ?
  '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row">
        <div class="row-info">${index ? index : ''}
        ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('');

  const cells = new Array(colsCount)
      .fill()
      .map(createCell)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i+1));
  }

  return rows.join('');
}
