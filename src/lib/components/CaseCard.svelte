<script>
    import { fade } from 'svelte/transition'
	export let cardData;
</script>

<div class="card" transition:fade id={"case-" + cardData.attribution_id}>
	<!--div class="card-header">
		<div class="card-header-title">
			<h2 class="is-size-3">Don't cases have titles?</h2>
		</div>
	</div-->
	<div class="card-image">
		<figure class="image">
			<img src={cardData.image_url} alt={cardData.image_credit} />
		</figure>
	</div>
	<div class="card-content">
		<div class="content">
            <p>{cardData.attribution_date}</p>
			<p>{cardData.short_description}</p>
            <p>
                <span class="tag is-info">{cardData.source}</span>
				{#each cardData.actor_nation as nation}
                	<span class="tag is-danger">{nation}</span>
				{/each}
                <span class="tag is-link">{cardData.source_category}</span>
            </p>
		</div>
	</div>
</div>

<style>
    div.card {
        max-width: 780px;
    }
</style>
