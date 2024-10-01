<script>
  export let cx;
  export let cy;
  export let r;
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

<circle
  {cx}
  {cy}
  {r}
  {fill}
  {opacity}
  on:mouseover={handleMouseOver}
  on:focus={handleMouseOver}
  on:mouseout={handleMouseOut}
  on:blur={handleMouseOut}
/>

<style>
  circle {
    stroke: white;
  }
</style>
