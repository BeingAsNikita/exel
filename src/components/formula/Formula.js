import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    const $formula = this.$root.find('[contenteditable]');

    this.$on('table:select', ($cell) => {
      $formula.text($cell.text());
    });

    this.$on('table:input', ($cell) => {
      $formula.text($cell.text());
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    const { key } = event;

    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
