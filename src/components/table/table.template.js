const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;


function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state ? state[index] : DEFAULT_WIDTH) + 'px';
}

function withWidthFrom(state) {
  return function(col, index) {
    return { col, index, width: getWidth(state, index) };
  };
}

function getHeight(state, index) {
  return (state ? state[index] : DEFAULT_HEIGHT) + 'px';
}

function toCell(row, state) {
  return function(_, col) {
    const width = getWidth(state.col, col);
    const id = `${row}:${col}`;
    const text = state.dataState[id] || '';
    return `
      <div 
        class="cell" 
        contenteditable 
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        style="width: ${width}"
      >
      ${text}
      </div>
    `;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div class="column" 
    data-type="resizable" 
    data-col="${index}"
    style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' :'';
  const height = getHeight(state, index);
  return `
    <div class="row" 
         data-type="resizable" 
         data-row="${index}" 
         style="height: ${height}">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.col))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('');

    rows.push(createRow(row + 1, cells, state.row));
  }

  return rows.join('');
}
