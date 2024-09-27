<script>
	import copy from '../data/copy.json';
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { base } from '$app/paths';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import CaseTable from '$lib/components/CaseTable.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
    import Controls from '$lib/components/Controls.svelte';
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
    $: isMobile = innerWidth < 720
    $: displayDataAs = isMobile ? "Cards" : "Table"

	let cases = [];

	onMount(async function () {
		//const response = await csv(`https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/Demo_Attribution_Data.csv`);
		const response = await csv(`${base}/Demo_Attribution_Data.csv`);
		cases = response;
        cases.forEach(d => {
            d.platform = splitString(d.platform)
            d.actor_nation = splitString(d.actor_nation)
            d.methods = splitString(d.methods)
            d.attribution_total_score = +d.attribution_total_score
            d.attribution_date = new Date(d.attribution_date)
            d.search = [d.short_description, d.platform, d.methods, d.source, d.source_nation, d.source_category].flat().join('__').toLowerCase()

            d.show = false
        })
        platformFilter.init(cases, 'platform');
        actorNationFilter.init(cases, 'actor_nation');
        sourceFilter.init(cases, 'source')
        sourceCategoryFilter.init(cases, 'source_category')
        methodFilter.init(cases, 'methods')
        $attributionScoreFilter = attributionScoreDef;
        
        //console.log(cases.map(d => d.attribution_date))
	});

    $: if (cases) {
        cases = cases.map(d => ({
            ...d,
            show: haveOverlap($actorNationFilter, d.actor_nation) 
                && haveOverlap($platformFilter, d.platform)
                && haveOverlap($sourceFilter, d.source)
                && haveOverlap($sourceCategoryFilter, d.source_category)
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

</script>

<svelte:window bind:innerWidth />

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

<section class="section sticky">
    <Controls {cases}></Controls>
</section>

<section class="section">
	<div>
		<Timeline {cases}></Timeline>
	</div>
</section>

<section class="section">
    <div class="container">
<div class="field has-addons">
    <div class="buttons has-addons">
        <button class={displayDataAs == "Table" ? "button is-success is-selected" : "button"} on:click={() => {displayDataAs = "Table"}}>Table</button>
        <button class={displayDataAs == "Cards" ? "button is-success is-selected" : "button"} on:click={() => {displayDataAs = "Cards"}}>Cards</button>
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
    .sticky {
        position: sticky;
		top: 0px;
        z-index: 1000;
        background-color: #ffffffdd
    }
</style>
