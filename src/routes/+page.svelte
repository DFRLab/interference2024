<script>
	import copy from '../data/copy.json';
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { base } from '$app/paths';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import CaseTable from '$lib/components/CaseTable.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	//import Select from 'svelte-select';
    import Controls from '$lib/components/Controls.svelte';
    import { splitString, haveOverlap } from '$lib/utils/misc'

    import {
        platformFilter,
    } from '../stores/filters';

	let cases = [];

	onMount(async function () {
		//const response = await csv(`https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/Demo_Attribution_Data.csv`);
		const response = await csv(`${base}/Demo_Attribution_Data.csv`);
		cases = response;
        cases.forEach(d => {
            d.platform = splitString(d.platform)
            d.show = false
        })

        platformFilter.init(cases, 'platform');
	});

    $: if (cases) {
        cases = cases.map(d => ({
            ...d,
            show: haveOverlap($platformFilter, d.platform)
        }))
    }
</script>

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

<section class="section">
    <Controls {cases}></Controls>
</section>

<section class="section">
	<div>
		<Timeline {cases}></Timeline>
	</div>
</section>

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

<section class="section">
	<div class="container">
		<CaseTable {cases}></CaseTable>
	</div>
</section>

<style>
    .intro {
        max-width: 800px;
        margin: auto;
    }
	.select-container {
		width: 360px;
	}
</style>
