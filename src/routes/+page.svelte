<script>
	import copy from '../data/copy.json';
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { max, extent } from 'd3-array';
	import Header from '$lib/components/Header.svelte';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import CaseTable from '$lib/components/CaseTable.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import TimelineMobile from '$lib/components/TimelineMobile.svelte';
	import Controls from '$lib/components/Controls.svelte';
	import CardModal from '$lib/components/CardModal.svelte';
	import AnimatedFilterIcon from '$lib/components/AnimatedFilterIcon.svelte';
	import Collapsible from '$lib/components/Collapsible.svelte';
	import CasesControls from '$lib/components/CasesControls.svelte';
	import { splitString, haveOverlap, withinRange, includesTextSearch } from '$lib/utils/misc';
	//import { setScales } from '$lib/utils/scales';
	import { page } from '$app/stores';
	import { parseUrl } from '$lib/utils/share';

	import {
		platformFilter,
		actorNationFilter,
		sourceFilter,
		sourceCategoryFilter,
		methodFilter,
		campaignFilter,
		attributionScoreFilter,
		attributionScoreDef,
		textSearchFilter,
		timeRangeFilter,
		fullTimeRange,
		defaultTimeRange
	} from '../stores/filters';

	$: innerWidth = 0;
	$: isMobile = innerWidth < 520;
	$: displayDataAs = isMobile ? 'Cards' : 'Table';

	let cases = [];
	let events = [];
	let metrics = [];
	let gdelt = [];
	let maxAttribution = 0;

	onMount(async function () {
		const response = await csv(
			`https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/fiat_2024_attribution_data.csv`
		);
		cases = response;
		cases = cases.filter((d) => d.attribution_id != '');
		cases.forEach((d) => {
			d.platform = splitString(d.platforms);
			d.medium = splitString(d.medium);
			d.actor_nation = splitString(d.actor_nation);
			d.source = splitString(d.source);
			d.methods = splitString(d.methods);
			d.campaign = splitString(d.campaign);
			d.attribution_total_score = +d.attribution_score;
			d.attribution_date = new Date(d.attribution_date);
			d.search = [
				d.short_description,
				d.short_title,
				d.platform,
				d.methods,
				d.source,
				d.source_nation,
				d.source_category
			]
				.flat()
				.join('__')
				.toLowerCase();

			d.show = false;
		});

		maxAttribution = max(cases.map((d) => d.attribution_score));

		platformFilter.init(cases, 'medium');
		actorNationFilter.init(cases, 'actor_nation');
		sourceFilter.init(cases, 'source');
		sourceCategoryFilter.init(cases, 'source_category');
		methodFilter.init(cases, 'methods');
		campaignFilter.init(cases, 'campaign');
		$attributionScoreFilter = attributionScoreDef;
		//$timeRangeFilter = extent(cases.map((d) => new Date(d.attribution_date)));
		$defaultTimeRange = [
			new Date('2024-01-01'),
			max(cases.map((d) => new Date(d.attribution_date)))
		];
		$timeRangeFilter = $defaultTimeRange;
		$fullTimeRange = extent(cases.map((d) => new Date(d.attribution_date)));
		//$fullTimeRange = [new Date('2022-01-01'), max(cases.map((d) => new Date(d.attribution_date)))];

		const eventsResponse = await csv(
			`https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/Key_Events_List.csv`
		);
		events = eventsResponse;
		events.forEach((d) => {
			d.date = new Date(d.Date);
		});

		const metricsResponse = await csv(
			'https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/fiat_country_metrics.csv'
		);

		metrics = metricsResponse.map((d) => {
			let obj = {};
			(obj.date = new Date(d.Date)), (obj.posts = +d.Posts);
			obj.country = d.Country;
			return obj;
		});
		metrics.sort((a, b) => {
			return a.date - b.date;
		});

		const gdeltResponse = await csv(
			'https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/gdelt_volume_timeline.csv'
		);

		gdelt = gdeltResponse.map(d => {
			let obj = {};
			obj.date = new Date(d.Date);
			obj.value = +d.Value;
			obj.country = d.Country
			return obj
		}).filter(d => !['North Korea', 'Israel'].includes(d.country))
		gdelt.sort((a, b) => {
			return a.date - b.date;
		});

		if ($page.url.searchParams.has('filters')) {
			const urlFilters = parseUrl($page.url.searchParams.get('filters'));
			actorNationFilter.applyBoolArray(urlFilters.actorNations);
			platformFilter.applyBoolArray(urlFilters.platforms);
			methodFilter.applyBoolArray(urlFilters.methods);
			sourceFilter.applyBoolArray(urlFilters.sources);
			sourceCategoryFilter.applyBoolArray(urlFilters.sourceCategories);
			campaignFilter.applyBoolArray(urlFilters.campaigns);
			$attributionScoreFilter = urlFilters.attributionScores;
			$textSearchFilter = urlFilters.textSearch;
		}
	});

	const sortFunction = (option) =>
		function (a, b) {
			if (option.type == 'string' || option.type == 'date' || option.type == 'number') {
				if (a[option.id] < b[option.id]) {
					return -1;
				}
				if (b[option.id] < a[option.id]) {
					return 1;
				} else {
					return 0;
				}
			}
			if (option.type == 'array') {
				if (a[option.id][0] < b[option.id][0]) {
					return -1;
				}
				if (b[option.id][0] < a[option.id][0]) {
					return 1;
				} else {
					return 0;
				}
			}
		};

	$: if (cases) {
		cases = cases.map((d) => ({
			...d,
			show:
				haveOverlap($actorNationFilter, d.actor_nation) &&
				haveOverlap($platformFilter, d.platform) &&
				haveOverlap($sourceFilter, d.source) &&
				haveOverlap($sourceCategoryFilter, d.source_category) &&
				haveOverlap($methodFilter, d.methods) &&
				haveOverlap($campaignFilter, d.campaign) &&
				withinRange($attributionScoreFilter, d.attribution_total_score) &&
				withinRange($timeRangeFilter, d.attribution_date) &&
				includesTextSearch($textSearchFilter, d.search)
		}));
	}
	$: sortedCases = [...cases].sort(sortFunction(selectedSorting));

	let width = 1200;
	let margin = {
		top: 30,
		right: 30,
		bottom: 30,
		left: 30
	};

	// set the scales
	//$: setScales(cases, width, margin);

	let sidebarOpen = false;

	let toggleSidebar = function () {
		sidebarOpen = !sidebarOpen;
	};

	const sortOptions = [
		{ id: 'attribution_date', label: 'Attribution Date', type: 'date' },
		{ id: 'attribution_score', label: 'Attribution Score', type: 'number' },
		{ id: 'actor_nation', label: 'Actor Nation', type: 'array' },
		{ id: 'platform', label: 'Platform', type: 'array' },
		{ id: 'source', label: 'Source', type: 'array' },
		{ id: 'source_category', label: 'Source Category', type: 'string' }
	];

	let selectedSorting = { id: 'attribution_date', label: 'Attribution Date', type: 'date' };

	let modalOpen = false;
	let activeCaseData;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>{copy.meta.title}</title>
	<meta property="og:site_name" content={copy.meta.og_site_name} />
	<meta property="og:description" content={copy.meta.og_description} />
	<meta property="og:url" content={copy.meta.og_url} />
	<meta property="og:image" content={copy.meta.og_image} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
</svelte:head>

{#if isMobile && !modalOpen}
	<div class="filter-button">
		<button on:click={() => toggleSidebar()}
			><AnimatedFilterIcon {sidebarOpen}></AnimatedFilterIcon></button
		>
	</div>
{/if}

<section class="section">
	<Header />
</section>

<section class="section">
	<div class="container has-text-centered">
		<div class="intro">
		{#each copy.intro as block}
			{#if block.type == 'text'}
				{#each block.paragraphs as par}
					<p class="mb-4">{@html par}</p>
				{/each}
			{/if}
		{/each}
	</div>
	</div>
	<div class="container">
		{#each copy.intro as block}
			{#if block.type == 'concealed-text'}
				<Collapsible title={block.title} paragraphs={block.paragraphs} id={block.id} />
			{/if}
		{/each}
	</div>
</section>

{#if !modalOpen}
	<section
		class={isMobile && sidebarOpen
			? 'section sidebar open controls'
			: isMobile && !sidebarOpen
				? 'section sidebar closed controls'
				: 'section sticky controls'}
	>
		<Controls {cases}></Controls>
	</section>
{/if}

<section class="section">
	<div>
		{#if isMobile}
			<TimelineMobile {cases} bind:modalOpen bind:activeCaseData></TimelineMobile>
		{:else}
			<Timeline {cases} {events} {metrics} {gdelt}></Timeline>
		{/if}
	</div>
</section>

{#if displayDataAs == 'Cards'}
	<section class="section">
		<div class="container">
			<CasesControls bind:displayDataAs bind:selectedSorting></CasesControls>
			<div class="grid is-col-min-16">
				{#each sortedCases as attrCase}
					{#if attrCase.show}
						<div class="cell">
							<CaseCard cardData={attrCase} expanded={false} bind:modalOpen bind:activeCaseData
							></CaseCard>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if displayDataAs == 'Table' && sortedCases.length > 0}
	<section class="section">
		<div class="container">
			<CasesControls bind:displayDataAs bind:selectedSorting></CasesControls>
			<CaseTable cases={sortedCases}></CaseTable>
		</div>
	</section>
{/if}

<section class="section">
	<div class="container">
		{#each copy.moreInfo as block}
			{#if block.type == 'text'}
				{#each block.paragraphs as par}
					<p class="mb-4">{@html par}</p>
				{/each}
			{/if}
			{#if block.type == 'concealed-text'}
				<Collapsible title={block.title} paragraphs={block.paragraphs} id={block.id} />
			{/if}
		{/each}
	</div>
</section>

<CardModal bind:modalOpen {activeCaseData}></CardModal>

<style>
	section {
		font-family: var(--font-02);
	}
	.intro {
		max-width: 800px;
		margin: auto;
	}
	.controls {
		background-color: var(--transparentbg);
		width: 100%;
		z-index: 500;
	}
	.sticky {
		position: sticky;
		top: 0px;
	}
	.sidebar {
		position: fixed;
		top: 0px;
		transition: left 0.5s;
		height: 100vh;
	}
	.closed {
		left: -100%;
	}
	.open {
		left: 0;
	}
	.filter-button {
		position: fixed;
		top: 0;
		right: 0;
		padding: 1rem;
		z-index: 750;
	}
</style>
