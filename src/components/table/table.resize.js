import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const target = event.target.dataset.resize;
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const $key = $parent.$el.dataset.col;
    const coords = $parent.getCoords();
    const sideProp = target === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: '1',
      [sideProp]: '-5000px',
    });

    document.onmousemove = (e) => {
      const delta = target === 'col'
        ? e.pageX - coords.right
        : e.pageY - coords.bottom;

      value = target === 'col' ?
        coords.width + delta : coords.height + delta;

      if (target === 'col') {
        $resizer.css({ right: -delta + 'px' });
      } else {
        $resizer.css({ bottom: -delta + 'px' });
      }
    };

    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;

      if (target === 'col') {
        $root.findAll(`[data-col="${$key}"]`)
            .forEach((child) => $(child).css({ width: `${value}px` }));
      } else {
        $parent.css({ height: `${value}px` });
      }
      $resizer.css({
        opacity: '0',
        bottom: '0',
        right: '0',
      });
      resolve({
        type: target === 'col' ? 'col' : 'row',
        id: target === 'col' ? $parent.data.col : $parent.data.row,
        value: value,
      });
    };
  });
}
