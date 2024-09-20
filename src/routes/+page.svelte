<script>
    import copy from "../data/copy.json"
    import { onMount } from "svelte";
    import { csv } from "d3-fetch"
    import { base } from '$app/paths';
    import CaseCard from "$lib/components/CaseCard.svelte";
    import CaseTable from "$lib/components/CaseTable.svelte";

    let cases = []

    onMount(async function () {
        //const response = await csv(`https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/Demo_Attribution_Data.csv`);
        const response = await csv(`${base}/Demo_Attribution_Data.csv`);
        cases = response
    })
    $: console.log(cases)
</script>

<section class="section">
	<div class="container">
		<h1 class="is-size-1">{copy.meta.title}</h1>
        {#each copy.content as block}
            {#if block.type == "text"}
                <p>{block.text}</p>
            {/if}
        {/each}
	</div>
</section>

<section>
    <div class="container">
        <div class="grid is-col-min-16">
        {#each cases as attrCase}
            <div class="cell">
                <CaseCard cardData={attrCase}>

                </CaseCard>
            </div>
        {/each}
        </div>
    </div>
</section>
<section>
    <div class="container">
        <CaseTable {cases}></CaseTable>
    </div>
</section>
