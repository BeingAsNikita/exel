import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
  const target = event.target.dataset.resize;
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const $key = $parent.$el.dataset.key;
  const coords = $parent.getCoords();
  const sideProp = target === 'col' ? 'bottom' : 'right';
  let value;

  $resizer.css({
    opacity: '1',
    [sideProp]: '-5000px',
  });

  document.onmousemove = (e) => {
    console.log('move');
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
      $root.findAll(`[data-key="${$key}"]`)
          .forEach((child) => $(child).css({ width: `${value}px` }));
    } else {
      $parent.css({ height: `${value}px` });
    }
    $resizer.css({
      opacity: '0',
      bottom: '0',
      right: '0',
    });
  };
}
