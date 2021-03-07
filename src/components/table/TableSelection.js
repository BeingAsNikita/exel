export class TableSelection {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    if (this.group.length > 0) {
      this.clear();
    }

    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach( ($c) => $c.removeClass(TableSelection.className));
    this.group.length = 0;
  }

  selectGroup($cells = []) {
    this.clear();
    this.group = $cells;
    $cells.forEach((cell) => cell.addClass(TableSelection.className));
  }
}
