<script>
	import copy from '../data/copy.json';
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { base } from '$app/paths';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import CaseTable from '$lib/components/CaseTable.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Select from 'svelte-select';

	let cases = [];

	onMount(async function () {
		//const response = await csv(`https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/Demo_Attribution_Data.csv`);
		const response = await csv(`${base}/Demo_Attribution_Data.csv`);
		cases = response;
	});

	$: actorNations =
		cases.length > 0 ? [...new Set(cases.map((d) => d.actor_nation.split(', ')).flat())] : [];
	$: actorNationsUnique = [...new Set(actorNations)];
	let selectedActorNations = null;

	$: filteredCases = selectedActorNations
		? cases.filter((d) => d.actor_nation.includes(selectedActorNations[0].value))
		: cases;
</script>

<section class="section">
	<div class="container has-text-centered">
		<h1 class="is-size-1">{copy.meta.title}</h1>
		{#each copy.content as block}
			{#if block.type == 'text'}
				<p>{block.text}</p>
			{/if}
		{/each}
	</div>
</section>

<section class="section">
	<div class="select-container">
		<Select
			items={actorNationsUnique}
			multiple={true}
			bind:value={selectedActorNations}
			placeholder={'Select 1 or more actor countries'}
		></Select>
	</div>
</section>

<section class="section">
	<div>
		<Timeline cases={filteredCases}></Timeline>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="grid is-col-min-12">
			{#each filteredCases as attrCase}
				<div class="cell">
					<CaseCard cardData={attrCase}></CaseCard>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<CaseTable cases={filteredCases}></CaseTable>
	</div>
</section>

<style>
	.select-container {
		width: 360px;
	}
</style>
