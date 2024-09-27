<script>
	import { scaleUtc, scalePoint, scaleOrdinal } from 'd3-scale';
	import { extent } from 'd3-array';
	import { utcFormat } from 'd3-time-format';
	import { fade } from 'svelte/transition';

	export let cases;

	const margins = {
		top: 24,
		right: 24,
		bottom: 38,
		left: 120
	};

	const keyEvents = [
		{
			date: new Date('2024-03-21'),
			title: 'Key event number 1',
			description: 'A very interesting event that happened somewhere.'
		},
		{
			date: new Date('2024-04-25'),
			title: 'Key event number 2',
			description: 'A somewhat less interesting event, still interesting, though.'
		},
		{
			date: new Date('2024-08-01'),
			title: 'Key event number 3',
			description: 'Yet another key event.'
		}
	];

	let width;
	let height = 280;

	$: dateExtent = extent(cases.map((d) => new Date(d.attribution_date)));

	$: xScale = scaleUtc(dateExtent, [0, width - margins.right - margins.left]);
	$: ticks = xScale.ticks(5);

	const actorNations = ['Key event', 'China', 'Iran', 'North Korea', 'Russia'];
	const colors = ['#555555', '#0f4c8a', '#8a0f8a', '#8a4d0f', '#0f8a0f'];

	let yScale = scalePoint(actorNations, [height - margins.bottom - margins.top, 0]).padding(1);
	let colorScale = scaleOrdinal(actorNations, colors);
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
				{#if xScale}
					{#each keyEvents as event}
						<line
							x1={xScale(event.date)}
							x2={xScale(event.date)}
							y1={yScale('Key event')}
							y2={0}
							stroke={colorScale('Key event')}
							stroke-width={2}
							opacity={0.5}
						></line>
						<rect
							x={xScale(event.date) - 6}
							y={yScale('Key event') - 6}
							width={12}
							height={12}
							fill={colorScale('Key event')}
							stroke={'#ffffff'}
							stroke-width={2}
						></rect>
					{/each}
				{/if}
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
