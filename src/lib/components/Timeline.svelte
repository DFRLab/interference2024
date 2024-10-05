<script>
	import { scaleUtc, scalePoint, scaleOrdinal, scaleLinear, scaleTime } from 'd3-scale';
	import { extent } from 'd3-array';
	import { utcFormat } from 'd3-time-format';
	import { area, stack, curveNatural } from 'd3-shape';
	import { max, union, index } from 'd3-array';
	import { fade } from 'svelte/transition';
	import Bubble from '$lib/components/Bubble.svelte';
	import Square from '$lib/components/Square.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { actorNationFilter } from '../../stores/filters';


	export let cases;
	export let events;
	export let metrics;

	const margins = {
		top: 24,
		right: 24,
		bottom: 38,
		left: 120
	};

	let width;
	let height = 280;

	$: dateExtent = extent(cases.map((d) => new Date(d.attribution_date)));

	$: xScale = scaleTime(dateExtent, [0, width - margins.right - margins.left]);
	$: ticks = xScale.ticks(5);

	const actorNations = ['Key event', 'China', 'Iran', 'North Korea', 'Russia'];
	const colors = ['#555555', '#0f4c8a', '#8a0f8a', '#8a4d0f', '#0f8a0f'];

	let yScale = scalePoint(actorNations, [height - margins.bottom - margins.top, 0]).padding(1);
	let colorScale = scaleOrdinal(actorNations, colors);

	$: displayCountryMetrics = $actorNationFilter.filter(d => d.selected).map(d => d.name)
	$: filteredMetrics = metrics.filter(d => displayCountryMetrics.includes(d.country))

	$: stackedMetrics = stack()
		.keys(union(filteredMetrics.map((d) => d.country)))
		.value(([, D], key) => D.get(key).posts)
			(index(filteredMetrics, d => d.date, d => d.country));

	let stackMax = 0;
	$: if (stackedMetrics.length > 0) {
		stackMax = max(stackedMetrics[stackedMetrics.length - 1].map((d) => d[1]));
	}

	$: yScaleStack = scaleLinear([0, stackMax], [height - margins.bottom - margins.top, 0]);
	let areaGenerator
	$: if(xScale && yScaleStack) {
		areaGenerator = area()
		.x((d) => xScale(d.data[0]))
		.y0((d) => yScaleStack(d[0]))
		.y1((d) => yScaleStack(d[1]))
		.curve(curveNatural)
	}

	// Tooltip
	let showTooltip = false;
	let tooltipContent;
	let tooltipX;
	let tooltipY;
</script>

<div class="timeline-container" bind:clientWidth={width}>
	<svg {width} {height}>
		{#if xScale}
			<g transform={`translate(${margins.left},${margins.top})`}>
				{#each actorNations as nation}
					<line
						x1={0}
						x2={width}
						y1={yScale(nation)}
						y2={yScale(nation)}
						style:stroke={colorScale(nation)}
						stroke-width={2}
						opacity={0.3}
					></line>
					<text
						class="country-label"
						x={-10}
						y={yScale(nation) + 4}
						text-anchor={'end'}
						fill={colorScale(nation)}>{nation}</text
					>
				{/each}
				{#each ticks as tick}
					<line
						x1={xScale(tick)}
						x2={xScale(tick)}
						y1={height - margins.bottom - margins.top}
						y2={height - margins.bottom - margins.top + 10}
						stroke={'#bbbbbb'}
						stroke-width={1}
					></line>
					<text
						class="time-axis-tick-label"
						x={xScale(tick)}
						y={height - margins.bottom - margins.top + 24}
						text-anchor={'middle'}>{utcFormat('%b')(tick)}</text
					>
				{/each}
				{#each cases as attrCase}
					{#if attrCase.show}
						<a href={'#case-' + attrCase.Attribution_ID} transition:fade>
							<Bubble
								cx={xScale(new Date(attrCase.attribution_date))}
								cy={yScale(attrCase.actor_nation[0])}
								r={6}
								fill={colorScale(attrCase.actor_nation[0])}
								stroke={'#ffffff'}
								stroke-width={2}
								ttContent={`<p class="countryname">${attrCase.Short_Title}</p>`}
								bind:tooltipContent
								bind:tooltipX
								bind:tooltipY
								bind:showTooltip
							></Bubble>
						</a>
					{/if}
				{/each}
				{#if xScale}
					{#each events as event}
						<line
							x1={xScale(event.date)}
							x2={xScale(event.date)}
							y1={yScale('Key event')}
							y2={0}
							stroke={colorScale('Key event')}
							stroke-width={2}
							opacity={0.5}
						></line>
						<Square
							x={xScale(event.date)}
							y={yScale('Key event')}
							width={12}
							fill={colorScale('Key event')}
							stroke={'#ffffff'}
							stroke-width={2}
							ttContent={`<p style='font-weight; bold;'>${event.Title}</p>
										<p>${event.Description}</p>`}
							bind:tooltipContent
							bind:tooltipX
							bind:tooltipY
							bind:showTooltip
						></Square>
					{/each}
				{/if}
			</g>
		{/if}
	</svg>
	<svg {width} height={height}>
		{#if xScale}
			<g transform={`translate(${margins.left},${margins.top})`}>
				{#if stackedMetrics.length > 0 && areaGenerator}
					{#each stackedMetrics as serie}
						<path d={areaGenerator(serie)} stroke={'white'} stroke-width={1} fill={colorScale(serie.key)}>
						</path>
					{/each}
				{/if}
			</g>
		{/if}
	</svg>
	{#if showTooltip}
		<Tooltip {tooltipX} {tooltipY} {tooltipContent} {width}/>
	{/if}
</div>

<style>
	.timeline-container {
		width: 100%;
	}
	.country-label {
		font-weight: bold;
		font-size: 0.9rem;
	}
	.time-axis-tick-label {
		font-size: 0.8rem;
		fill: #888888;
	}
	.event-title {
		font-weight: bold;
	}
</style>
