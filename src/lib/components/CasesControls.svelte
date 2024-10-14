<script>
    export let displayDataAs
    export let selectedSorting

    const sortOptions = [
		{ id: 'attribution_date', label: 'Attribution Date', type: 'date' },
		{ id: 'attribution_score', label: 'Attribution Score', type: 'number' },
		{ id: 'actor_nation', label: 'Actor Nation', type: 'array' },
		{ id: 'platform', label: 'Platform', type: 'array' },
		{ id: 'source', label: 'Source', type: 'array' },
		{ id: 'source_category', label: 'Source Category', type: 'string' }
	];

</script>

<div class="container cases-controls">
    <div class="cases-control">
        <div class="buttons has-addons">
            <button
                class={displayDataAs == 'Table'
                    ? 'button is-dark is-selected is-small'
                    : 'button is-small'}
                on:click={() => {
                    displayDataAs = 'Table';
                }}>Table</button
            >
            <button
                class={displayDataAs == 'Cards'
                    ? 'button is-dark is-selected is-small'
                    : 'button is-small'}
                on:click={() => {
                    displayDataAs = 'Cards';
                }}>Cards</button
            >
        </div>
    </div>
    <div class="cases-control">
        <label for="sort-select" class="sort-label">Sort cases by </label>
        <div class="select is-small">
            <select bind:value={selectedSorting} id="sort-select">
                {#each sortOptions as sortOpt}
                    <option value={sortOpt}>
                        {sortOpt.label}
                    </option>
                {/each}
            </select>
        </div>
    </div>
    <div class="cases-control">
        <a
            href="https://fiat-2024-processed-data.s3.us-west-2.amazonaws.com/dfrlab-fiat-2024-dataset.csv"
            class="button is-small">Download the data</a
        >
    </div>
</div>

<style>
    .cases-controls {
        margin-bottom: 1rem;
    }
	.cases-control {
		display: inline-block;
		margin-right: 3rem;
	}
	.sort-label {
		font-size: 0.9rem;
	}
</style>