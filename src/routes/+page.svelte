<script>
	import copy from '../data/copy.json';
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { base } from '$app/paths';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import CaseTable from '$lib/components/CaseTable.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
    import TimelineMobile from '$lib/components/TimelineMobile.svelte';
    import Controls from '$lib/components/Controls.svelte';
    import AnimatedFilterIcon from '$lib/components/AnimatedFilterIcon.svelte';
    import { splitString, haveOverlap, withinRange, includesTextSearch } from '$lib/utils/misc'
    import { setScales } from '$lib/utils/scales';

    import {
        platformFilter,
        actorNationFilter,
        sourceFilter,
        sourceCategoryFilter,
        methodFilter,
        attributionScoreFilter,
        attributionScoreDef,
        textSearchFilter
    } from '../stores/filters';

    $: innerWidth = 0
    $: isMobile = innerWidth < 520
    $: displayDataAs = isMobile ? "Cards" : "Table"

	let cases = [];

    let events = [];

	onMount(async function () {
		const response = await csv(`https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/Demo_Attribution_Data.csv`);
		//const response = await csv(`${base}/Demo_Attribution_Data.csv`);
		cases = response;
        cases = cases.filter(d => d.Attribution_ID != '')
        cases.forEach(d => {
            d.platform = splitString(d.Platforms)
            d.actor_nation = splitString(d.Actor_Nation)
            d.source = splitString(d.Source)
            d.methods = splitString(d.Methods)
            d.attribution_total_score = +d.attribution_total_score
            d.attribution_date = new Date(d.Attribution_Date)
            d.search = [d.Short_Description, d.Short_Title, d.platform, d.methods, d.Source, d.Source_Nation, d.Source_cCtegory].flat().join('__').toLowerCase()

            d.show = false
        })

        platformFilter.init(cases, 'platform');
        actorNationFilter.init(cases, 'actor_nation');
        sourceFilter.init(cases, 'source')
        sourceCategoryFilter.init(cases, 'Source_Category')
        methodFilter.init(cases, 'methods')
        $attributionScoreFilter = attributionScoreDef;

        const eventsResponse = await csv(`https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/Key_Events_List.csv`)
        events = eventsResponse
        events.forEach(d => {
            d.date = new Date(d.Date)
        })
        
	});

    $: if (cases) {
        cases = cases.map(d => ({
            ...d,
            show: haveOverlap($actorNationFilter, d.Actor_Nation) 
                && haveOverlap($platformFilter, d.platform)
                && haveOverlap($sourceFilter, d.source)
                && haveOverlap($sourceCategoryFilter, d.Source_Category)
                && haveOverlap($methodFilter, d.methods)
                && withinRange($attributionScoreFilter, d.attribution_total_score)
                && includesTextSearch($textSearchFilter, d.search)
        }))
    }

    let width = 1200
    let margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    }

    // set the scales
    $: setScales(cases, width, margin);

    let sidebarOpen = false;
	
	let toggleSidebar = function(){
		sidebarOpen = !sidebarOpen
	}

</script>

<svelte:window bind:innerWidth />

{#if isMobile}
<div class="filter-button">
	<button on:click={() => toggleSidebar()}><AnimatedFilterIcon {sidebarOpen}></AnimatedFilterIcon></button>
</div>
{/if}

<section class="section">
	<div class="container has-text-centered">
		<h1 class="is-size-1">{copy.meta.title}</h1>
		{#each copy.content as block}
			{#if block.type == 'text'}
				<p class="intro">{block.text}</p>
			{/if}
		{/each}
	</div>
</section>

<section class={isMobile && sidebarOpen 
    ? "section sidebar open controls"
    : isMobile && !sidebarOpen
        ? "section sidebar closed controls"
        : "section sticky controls"}>
    <Controls {cases} {isMobile}></Controls>
</section>

<section class="section">
	<div>
        {#if isMobile}
		    <TimelineMobile {cases}></TimelineMobile>
            {:else}
            <Timeline {cases} {events}></Timeline>
        {/if}
	</div>
</section>

<section class="section">
    <div class="container">
<div class="field has-addons">
    <div class="buttons has-addons">
        <button class={displayDataAs == "Table" ? "button is-dark is-selected is-small" : "button is-small"} on:click={() => {displayDataAs = "Table"}}>Table</button>
        <button class={displayDataAs == "Cards" ? "button is-dark is-selected is-small" : "button is-small"} on:click={() => {displayDataAs = "Cards"}}>Cards</button>
      </div>
  </div>
</div>
</section>

{#if displayDataAs == "Cards"}
<section class="section">
	<div class="container">
		<div class="grid is-col-min-12">
			{#each cases as attrCase}
            {#if attrCase.show}
				<div class="cell">
					<CaseCard cardData={attrCase}></CaseCard>
				</div>
                {/if}
			{/each}
		</div>
	</div>
</section>
{/if}

{#if displayDataAs == "Table"}
<section class="section">
	<div class="container">
		<CaseTable {cases}></CaseTable>
	</div>
</section> 
{/if}

<style>
    .intro {
        max-width: 800px;
        margin: auto;
    }
    .controls {
        background-color: #ffffffdd;
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
