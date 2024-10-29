<script>
	import { scaleUtc, scalePoint, scaleOrdinal, scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { utcFormat } from 'd3-time-format';
	import { timeRangeFilter } from '../../stores/filters';

	export let cases;
	export let modalOpen;
	export let activeCaseData

	const margins = {
		top: 40,
		right: 12,
		bottom: 12,
		left: 36
	};

	let width;
	let height = 500;

	$: yScale = scaleUtc($timeRangeFilter, [0, height - margins.top - margins.bottom]);
	$: opacityScale = scaleLinear()
		.domain([0, max(cases.map(d => d.attribution_total_score))])
		.range([0.2, 1])
	$: ticks = yScale.ticks(5);

	const actorNations = ['Other', 'China', 'Iran', /*'North Korea', */'Russia'];
	const colors = ['#555555', '#bf0a0a', '#0f8a0f', /*'#8a4d0f', */'#0f4c8a'];

	$: xScale = scalePoint(actorNations, [0, width - margins.left - margins.right]).padding(0.5);
	let colorScale = scaleOrdinal(actorNations, colors);

	let radiusScale = scaleOrdinal(
		['Category One', 'Category Two', 'Category Three', 'Category Four', 'Category Five', 'Category Six'],
		[6, 8, 10, 11, 12, 13]
	)

	let openCase = function(cardData) {
		modalOpen = true;
		activeCaseData = cardData;
	};
</script>

<div class="timeline-container" bind:clientWidth={width}>
	<svg {width} {height}>
		{#if xScale}
			<g transform={`translate(${margins.left},${margins.top})`}>
				{#each actorNations as nation, i}
					<line
						x1={xScale(nation)}
						x2={xScale(nation)}
                        y1={0}
						y2={height - margins.bottom - margins.top}
						style:stroke={colorScale(nation)}
						stroke-width={xScale.step()*0.9}
						opacity={0.3}
					></line>
					<text
						class="country-label"
						y={i % 2 == 1 ? -24 : -10}
						x={xScale(nation)}
						text-anchor={"middle"}
						fill={colorScale(nation)}
					>{nation}</text>
				{/each}
				{#each ticks as tick}
					<line
                        x1={0}
						x2={-10}
						y1={yScale(tick)}
						y2={yScale(tick)}
						stroke={'#bbbbbb'}
						stroke-width={1}
					></line>
					<text
						class="time-axis-tick-label"
						x={-14}
                        y={yScale(tick) + 4}
						text-anchor={'end'}>{utcFormat('%b')(tick)}</text
					>
				{/each}
				{#each cases as attrCase}
					{#if attrCase.show}
							<circle
								cy={yScale(new Date(attrCase.attribution_date))}
								cx={actorNations.includes(attrCase.actor_nation[0])
									? xScale(attrCase.actor_nation[0])
									: xScale('Other')}
								r={radiusScale(attrCase.breakout_scale)}
								style:fill={actorNations.includes(attrCase.actor_nation[0]) 
									? colorScale(attrCase.actor_nation[0])
									: colorScale('Other')}
								stroke={'#ffffff'}
								stroke-width={1.5}
								opacity={opacityScale(attrCase.attribution_total_score)}
								on:click={openCase(attrCase)}
							></circle>
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
