<script>
  export let x;
  export let y;
  export let width;
  export let fill;
  export let opacity;
  export let ttContent;
  export let tooltipContent;
  export let tooltipX;
  export let tooltipY;
  export let showTooltip;

  function handleMouseOver(event) {
    showTooltip = true;
    tooltipX = event.clientX;
    tooltipY = event.clientY;
    tooltipContent = ttContent;
  }
  function handleMouseOut() {
    showTooltip = false;
  }
</script>

<rect
  x={x - width/2}
  y={y - width/2}
  {width}
  height={width}
  {fill}
  {opacity}
  on:mouseover={handleMouseOver}
  on:focus={handleMouseOver}
  on:mouseout={handleMouseOut}
  on:blur={handleMouseOut}
/>

<style>
  rect {
    stroke: white;
    transform-box: fill-box;
  transform-origin: center;
  transform: rotate(45deg);
  }
</style>