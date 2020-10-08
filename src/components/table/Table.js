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
    const target = event.target.dataset.resize;
    if (target) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const $key = $parent.$el.dataset.key;
      const $childCells = Array.from($().getAllCell(`[data-key="${$key}"]`));
      const coords = $parent.getCoords();

      console.log($key);
      console.log($childCells);
      document.onmousemove = (e) => {
        const delta = target === 'col'
        ? e.pageX - coords.right
        : e.pageY - coords.bottom;

        const value = target === 'col' ?
        coords.width + delta : coords.height + delta;
        if (target === 'col') {
          $parent.$el.style.width = value + 'px';
          $childCells.forEach((child) => child.style.width = value + 'px');
        }
        if (target === 'row') $parent.$el.style.height = value + 'px';
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
