<script>
	import { scaleUtc } from 'd3-scale';
	import { extent } from 'd3-array';
	import { utcFormat } from 'd3-time-format';

	export let cases;

	const margins = {
		top: 24,
		right: 24,
		bottom: 24,
		left: 24
	};

	let width;
	let height = 120;

	$: dateExtent = extent(cases.map((d) => new Date(d.attribution_date)));

	$: xScale = scaleUtc(dateExtent, [0, width - margins.right - margins.left]);
	$: ticks = xScale.ticks(5);
</script>

<div class="timeline-container" bind:clientWidth={width}>
	<svg {width} {height}>
		{#if xScale}
			<g transform={`translate(${margins.left},${margins.top})`}>
				<line x1={0} x2={width} y1={0} y2={0} stroke={'#000000'} stroke-width={2}></line>
				{#each ticks as tick}
					<line
						x1={xScale(tick)}
						x2={xScale(tick)}
						y1={0}
						y2={12}
						stroke={'#000000'}
						stroke-width={2}
					></line>
					<text x={xScale(tick)} y={32} text-anchor={'middle'}>{utcFormat('%b %d')(tick)}</text>
				{/each}
				{#each cases as attrCase}
					<a href={'#case-' + attrCase.attribution_id}>
						<circle
							cx={xScale(new Date(attrCase.attribution_date))}
							cy={0}
							r={6}
							fill={'#000000'}
							stroke={'#ffffff'}
							stroke-width={2}
						></circle>
					</a>
				{/each}
			</g>
		{/if}
	</svg>
</div>

<style>
	.timeline-container {
		width: 100%;
	}
</style>
