export function slidable(node) {
    let x;
    let left;
  
    function handleMousedown(event) {
      x = event.clientX;
  
      node.dispatchEvent(
        new CustomEvent('slidestart', {
          detail: { x },
        })
      );
  
      window.addEventListener('pointermove', handleMousemove);
      window.addEventListener('pointerup', handleMouseup);
    }
  
    function handleMousemove(event) {
      const dx = event.clientX - x;
      x = event.clientX;
  
      node.dispatchEvent(
        new CustomEvent('slide', {
          detail: { x, dx },
        })
      );
    }
  
    function handleMouseup(event) {
      x = event.clientX;
      left = node.offsetLeft;
  
      node.dispatchEvent(
        new CustomEvent('slideend', {
          detail: { x, left },
        })
      );
  
      window.removeEventListener('pointermove', handleMousemove);
      window.removeEventListener('pointerup', handleMouseup);
    }
  
    node.addEventListener('pointerdown', handleMousedown);
  
    return {
      destroy() {
        node.removeEventListener('pointerdown', handleMousedown);
      },
    };
  }
  