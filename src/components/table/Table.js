import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { shouldResize, isCell, matrix } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable(20);
  }

  init() {
    super.init();
    this.selection = new TableSelection();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
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
}

