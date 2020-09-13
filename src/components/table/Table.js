import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '../../core/dom';

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
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();

      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = value + 'px';
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }

  onMousemove() {
  }

  onMouseup() {
  }
}
