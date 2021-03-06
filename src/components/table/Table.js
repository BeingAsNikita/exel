import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { shouldResize, isCell, matrix, getNextCell } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'click', 'input'],
      ...options,
    });
  }
  toHTML() {
    return createTable(20);
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.$emit('table:select', cell);
  }

  init() {
    super.init();
    this.selection = new TableSelection();
    const $cell = this.$root.find('[data-id="0:0"]');

    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);
        const cells = matrix(current, target)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup(cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft'];

    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const current = this.selection.current.id(true);
      const $nextCell = this.$root.find(getNextCell(key, current));
      this.selectCell($nextCell);
    }
  }

  onClick(event) {
    if (event.target.dataset.type === 'cell') {
      this.$emit('table:select', $(event.target));
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}


