<script>
	export let x;
	export let y;
	export let width;
	export let fill;
	export let stroke;
	export let strokeWidth;
	export let opacity;
	export let eventData;
	export let hoveredEventData;
	export let tooltipX;
	export let tooltipY;
	export let showEventTooltip;

	function handleMouseOver(event) {
		showEventTooltip = true;
		tooltipX = event.clientX;
		tooltipY = event.clientY;
		hoveredEventData = eventData;
	}
	function handleMouseOut() {
		showEventTooltip = false;
	}
</script>

<rect
	x={x - width / 2}
	y={y - width / 2}
	{width}
	height={width}
	{fill}
	{opacity}
	style:stroke
	stroke-width={strokeWidth + 'px'}
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
