<script>
	import { scaleUtc, scalePoint, scaleOrdinal, scaleLinear, scaleTime } from 'd3-scale';
	import { utcFormat } from 'd3-time-format';
	import { format } from 'd3-format';
	import { area, stack, curveNatural } from 'd3-shape';
	import { max, union, index } from 'd3-array';
	import { fade } from 'svelte/transition';
	import Bubble from '$lib/components/Bubble.svelte';
	import Square from '$lib/components/Square.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import EventTooltip from '$lib/components/EventTooltip.svelte';
	import { actorNationFilter, timeRangeFilter } from '../../stores/filters';
	import Legend from './Legend.svelte';

	export let cases;
	export let events;
	export let metrics;
	export let gdelt;

	const margins = {
		top: 0,
		right: 24,
		bottom: 0,
		left: 120
	};
	const marginsKeyEvents = {
		top: 0,
		right: 24,
		bottom: 38,
		left: 120
	};

	let width;
	let height = 200;

	let dataToDisplay = 'meltwater';

	$: xScale = scaleTime($timeRangeFilter, [0, width - margins.right - margins.left]);
	$: opacityScale = scaleLinear()
		.domain([0, max(cases.map((d) => d.attribution_total_score))])
		.range([0.2, 1]);
	$: ticks = xScale.ticks(5);
	$: timeRangeDays = (xScale.domain()[1] - xScale.domain()[0]) / 86400000;
	$: dateFormat = timeRangeDays > 100 ? utcFormat('%B') : utcFormat('%b %-d');

	const actorNations = ['Other', 'China', 'Iran', /*'North Korea', */ 'Russia'];
	const colors = ['#555555', '#bf0a0a', '#0f8a0f', /*'#8a4d0f', */ '#0f4c8a'];

	let yScale = scalePoint(actorNations, [height - margins.bottom - margins.top, 0]).padding(0.5);
	let colorScale = scaleOrdinal(actorNations, colors);
	const keyEventColor = '#555555';

	const actorNationsGdelt = ['China', 'Iran', 'North Korea', 'Russia', 'Israel'];
	const colorsGdelt = ['#bf0a0a', '#0f8a0f', '#8a4d0f', '#0f4c8a', '#8a0f38'];
	let colorScaleGdelt = scaleOrdinal(actorNationsGdelt, colorsGdelt);

	let radiusScale = scaleOrdinal(
		[
			'Category One',
			'Category Two',
			'Category Three',
			'Category Four',
			'Category Five',
			'Category Six'
		],
		[6, 8, 10, 11, 12, 13]
	);

	//TODO: sort bubbles
	$: if (cases && radiusScale) {
		cases = cases.sort((a, b) => radiusScale(a.breakout_scale) < radiusScale(b.breakout_scale));
	}

	$: displayCountryMetrics = $actorNationFilter.filter((d) => d.selected).map((d) => d.name);

	// Metrics stacked areas
	$: filteredMetrics = metrics.filter((d) => displayCountryMetrics.includes(d.country));

	$: stackedMetrics = stack()
		.keys(union(filteredMetrics.map((d) => d.country)))
		.value(([, D], key) => D.get(key).posts)(
		index(
			filteredMetrics,
			(d) => d.date,
			(d) => d.country
		)
	);

	//GDELT stacked areas
	$: filteredGdelt = gdelt.filter((d) => displayCountryMetrics.includes(d.country));

	$: stackedGdelt = stack()
		.keys(union(filteredGdelt.map((d) => d.country)))
		.value(([, D], key) => D.get(key).value)(
		index(
			filteredGdelt,
			(d) => d.date,
			(d) => d.country
		)
	);

	let stackMax = 0;
	$: if (stackedMetrics.length > 0 && dataToDisplay == 'meltwater') {
		stackMax = max(stackedMetrics[stackedMetrics.length - 1].map((d) => d[1]));
	}

	$: if (stackedGdelt.length > 0 && dataToDisplay == 'gdelt') {
		stackMax = max(stackedGdelt[stackedGdelt.length - 1].map((d) => d[1]));
	}

	$: yScaleStack = scaleLinear([0, stackMax], [height - margins.bottom - margins.top, 0]);
	let areaGenerator;
	$: if (xScale && yScaleStack) {
		areaGenerator = area()
			.x((d) => xScale(d.data[0]))
			.y0((d) => yScaleStack(d[0]))
			.y1((d) => yScaleStack(d[1]))
			.curve(curveNatural);
	}
	$: yScaleStackTicks = yScaleStack.ticks(2).filter((d) => d != 0);

	// Tooltip
	let showTooltip = false;
	let showEventTooltip = false;
	let hoveredCaseData;
	let hoveredEventData;
	let tooltipX;
	let tooltipY;
</script>

<div class="timeline-container" bind:clientWidth={width}>
	<Legend {width} {margins} {radiusScale} {opacityScale}></Legend>
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
						stroke-width={yScale.step() * 0.9}
						opacity={0.1}
					></line>
					<text
						class="country-label"
						x={-10}
						y={yScale(nation) + 4}
						text-anchor={'end'}
						fill={colorScale(nation)}>{nation}</text
					>
				{/each}
				{#each cases as attrCase}
					{#if attrCase.show}
						{#each attrCase.actor_nation as actorNat}
						<g transition:fade>
							{#if attrCase.offline_mobilization == '1'}
								<circle
									cx={xScale(new Date(attrCase.attribution_date))}
									cy={actorNations.includes(actorNat)
										? yScale(actorNat)
										: yScale('Other')}
									r={radiusScale(attrCase.breakout_scale) + 2}
									fill={'none'}
									stroke={'#555555'}
									stroke-width={1.5}
									opacity={1}
								></circle>
							{/if}
							<Bubble
								cx={xScale(new Date(attrCase.attribution_date))}
								cy={actorNations.includes(actorNat)
									? yScale(actorNat)
									: yScale('Other')}
								r={radiusScale(attrCase.breakout_scale)}
								fill={actorNations.includes(actorNat)
									? colorScale(actorNat)
									: colorScale('Other')}
								stroke={'#ffffff'}
								strokeWidth={1.5}
								opacity={opacityScale(attrCase.attribution_score)}
								caseData={attrCase}
								bind:hoveredCaseData
								bind:tooltipX
								bind:tooltipY
								bind:showTooltip
							></Bubble>
						</g>
						{/each}
					{/if}
				{/each}
			</g>
		{/if}
	</svg>

	<div>
		<div class="buttons has-addons is-right">
            <button
                class={dataToDisplay == 'meltwater'
                    ? 'button is-dark is-selected is-small'
                    : 'button is-small'}
                on:click={() => {
                    dataToDisplay = 'meltwater';
                }}>Social media posts</button
            >
            <button
                class={dataToDisplay == 'gdelt'
                    ? 'button is-dark is-selected is-small'
                    : 'button is-small'}
                on:click={() => {
                    dataToDisplay = 'gdelt';
                }}>Television news mentions</button
            >
        </div>
		<svg {width} {height}>
			{#if xScale}
				<g transform={`translate(${margins.left},${margins.top})`}>
					{#if stackedMetrics.length > 0 && areaGenerator && dataToDisplay == 'meltwater'}
						{#each stackedMetrics as serie}
							<path
								d={areaGenerator(serie)}
								stroke={'white'}
								stroke-width={1}
								fill={colorScale(serie.key)}
							>
							</path>
						{/each}
					{/if}
					{#if stackedGdelt.length > 0 && areaGenerator && dataToDisplay == 'gdelt'}
						{#each stackedGdelt as serie}
							<path
								d={areaGenerator(serie)}
								stroke={'white'}
								stroke-width={1}
								fill={colorScaleGdelt(serie.key)}
							>
							</path>
						{/each}
					{/if}
					<rect
						x={-margins.left}
						y={-margins.top}
						width={margins.left}
						height={height - margins.top}
						fill={'#F9F8F8'}
					></rect>
					{#each yScaleStackTicks as tick}
						<line
							x1={-10}
							x2={-16}
							y1={yScaleStack(tick)}
							y2={yScaleStack(tick)}
							stroke={'#777777'}
							stroke-width={1}
						></line>
						<text
							class={'y-tick'}
							x={-18}
							y={yScaleStack(tick) + 4}
							text-anchor={'end'}
							fill={'#777777'}>{format('~s')(tick)}</text
						>
					{/each}
				</g>
			{/if}
		</svg>
	</div>

	<svg {width} height={height / 2}>
		{#if xScale}
			<g transform={`translate(${marginsKeyEvents.left},${marginsKeyEvents.top})`}>
				<line
					x1={0}
					x2={width}
					y1={32}
					y2={32}
					style:stroke={keyEventColor}
					stroke-width={32}
					opacity={0.1}
				></line>
				<text class="country-label" x={-10} y={32 + 4} text-anchor={'end'} fill={keyEventColor}
				></text>
				{#each ticks as tick}
					<line
						x1={xScale(tick)}
						x2={xScale(tick)}
						y1={height / 2 - marginsKeyEvents.bottom}
						y2={height / 2 - marginsKeyEvents.bottom + 10}
						stroke={'#777777'}
						stroke-width={1}
					></line>
					<text
						class="time-axis-tick-label"
						x={xScale(tick)}
						y={height / 2 - marginsKeyEvents.bottom + 24}
						text-anchor={'middle'}>{dateFormat(tick)}</text
					>
				{/each}
				{#if xScale}
					{#each events as event}
						<Square
							x={xScale(event.date)}
							y={32}
							width={12}
							fill={keyEventColor}
							stroke={'#ffffff'}
							strokeWidth={2}
							eventData={event}
							bind:hoveredEventData
							bind:tooltipX
							bind:tooltipY
							bind:showEventTooltip
						></Square>
					{/each}
				{/if}
			</g>
		{/if}
	</svg>
	{#if showTooltip}
		<Tooltip {tooltipX} {tooltipY} {hoveredCaseData} {width} bind:showTooltip />
	{/if}
	{#if showEventTooltip}
		<EventTooltip {tooltipX} {tooltipY} {hoveredEventData} {width} />
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
		font-size: 0.9rem;
		fill: #777777;
	}
	.y-tick {
		font-size: 0.9rem;
	}
</style>
