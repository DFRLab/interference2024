<script>
	import { scaleUtc, scalePoint, scaleOrdinal } from 'd3-scale';
	import { extent } from 'd3-array';
	import { utcFormat } from 'd3-time-format';
	import { fade } from 'svelte/transition'

	export let cases;

	const margins = {
		top: 24,
		right: 24,
		bottom: 38,
		left: 120
	};

	let width;
	let height = 280;

	$: dateExtent = extent(cases.map((d) => new Date(d.attribution_date)));

	$: xScale = scaleUtc(dateExtent, [0, width - margins.right - margins.left]);
	$: ticks = xScale.ticks(5);

	const actorNations = ['China', 'Iran', 'North Korea', 'Russia'];
	const colors = ['#0f4c8a', '#8a0f8a', '#8a4d0f', '#0f8a0f'];

	let yScale = scalePoint(actorNations, [height - margins.bottom - margins.top, 0]).padding(1);
	let colorScale = scaleOrdinal(actorNations, colors);
</script>

<div class="timeline-container" bind:clientWidth={width}>
	<svg {width} {height}>
		{#if xScale}
			<g transform={`translate(${margins.left},${margins.top})`}>
				<!--line
					x1={0}
					x2={width}
					y1={height - margins.bottom - margins.top}
					y2={height - margins.bottom - margins.top}
					stroke={'#000000'}
					stroke-width={2}
				></line-->
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
						text-anchor={"end"}
						fill={colorScale(nation)}
					>{nation}</text>
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
						<a href={'#case-' + attrCase.attribution_id} transition:fade>
							<circle
								cx={xScale(new Date(attrCase.attribution_date))}
								cy={yScale(attrCase.actor_nation[0])}
								r={6}
								style:fill={colorScale(attrCase.actor_nation[0])}
								stroke={'#ffffff'}
								stroke-width={2}
							></circle>
						</a>
					{/if}
				{/each}
			</g>
		{/if}
	</svg>
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
</style>
