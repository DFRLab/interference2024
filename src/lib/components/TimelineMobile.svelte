<script>
	import { scaleUtc, scalePoint, scaleOrdinal } from 'd3-scale';
	import { extent } from 'd3-array';
	import { utcFormat } from 'd3-time-format';
	import { fade } from 'svelte/transition'

	export let cases;

	const margins = {
		top: 32,
		right: 12,
		bottom: 12,
		left: 32
	};

	let width;
	let height = 400;

	$: dateExtent = extent(cases.map((d) => new Date(d.attribution_date)));

	$: yScale = scaleUtc(dateExtent, [0, height - margins.top - margins.bottom]);
	$: ticks = yScale.ticks(5);

	const actorNations = ['China', 'Iran', 'North Korea', 'Russia'];
	const colors = ['#0f4c8a', '#8a0f8a', '#8a4d0f', '#0f8a0f'];

	$: xScale = scalePoint(actorNations, [0, width - margins.left - margins.right]).padding(1);
	let colorScale = scaleOrdinal(actorNations, colors);
</script>

<div class="timeline-container" bind:clientWidth={width}>
	<svg {width} {height}>
		{#if xScale}
			<g transform={`translate(${margins.left},${margins.top})`}>
				{#each actorNations as nation}
					<line
						x1={xScale(nation)}
						x2={xScale(nation)}
                        y1={0}
						y2={height - margins.bottom - margins.top}
						style:stroke={colorScale(nation)}
						stroke-width={2}
						opacity={0.3}
					></line>
					<text
						class="country-label"
						y={-10}
						x={xScale(nation)}
						text-anchor={"middle"}
						fill={colorScale(nation)}
					>{nation}</text>
				{/each}
				{#each ticks as tick}
					<line
                        x1={0}
						x2={10}
						y1={yScale(tick)}
						y2={yScale(tick)}
						stroke={'#bbbbbb'}
						stroke-width={1}
					></line>
					<text
						class="time-axis-tick-label"
						x={-4}
                        y={yScale(tick) + 4}
						text-anchor={'end'}>{utcFormat('%b')(tick)}</text
					>
				{/each}
				{#each cases as attrCase}
					{#if attrCase.show}
						<a href={'#case-' + attrCase.attribution_id} transition:fade>
							<circle
								cy={yScale(new Date(attrCase.attribution_date))}
								cx={xScale(attrCase.actor_nation[0])}
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
