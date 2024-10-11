<script>
  export let cx;
  export let cy;
  export let r;
  export let fill;
  export let opacity;
  export let stroke;
  export let strokeWidth;
  export let caseData;
  export let hoveredCaseData;
  export let tooltipX;
  export let tooltipY;
  export let showTooltip;
  export let tooltipType;

  function handleMouseOver(event) {
    tooltipType = 'case'
    showTooltip = true;
    tooltipX = event.clientX;
    tooltipY = event.clientY;
    hoveredCaseData = caseData;
  }
  function handleMouseOut() {
    //showTooltip = false;
    //test
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
