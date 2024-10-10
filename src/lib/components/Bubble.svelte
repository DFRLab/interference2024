<script>
  export let cx;
  export let cy;
  export let r;
  export let fill;
  export let opacity;
  export let stroke;
  export let strokeWidth;
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

<circle
  {cx}
  {cy}
  {r}
  {fill}
  {opacity}
  {stroke}
  stroke-width={strokeWidth}
  stroke-opacity={1}
  on:mouseover={handleMouseOver}
  on:focus={handleMouseOver}
  on:mouseout={handleMouseOut}
  on:blur={handleMouseOut}
/>
