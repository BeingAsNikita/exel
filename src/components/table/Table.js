import { ExcelComponent } from '../../core/ExcelComponent';
import { shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
    });
    this.elCoordinate = {
      start: 0,
      end: 0,
    };
    this.currentResizeElement = null;
  }
  toHTML() {
    return createTable(20);
  }

  onClick() {

  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  onMousemove() {
  }

  onMouseup() {
  }
}
