<script>
	import { fade } from 'svelte/transition';
	import { utcFormat } from 'd3-time-format';
	import { platformFilter, actorNationFilter, sourceFilter } from '../../stores/filters';
	export let cardData;
</script>

<div class="card" transition:fade id={'case-' + cardData.attribution_id}>
	<!--div class="card-header">
		<div class="card-header-title">
			<h2 class="is-size-3">Don't cases have titles?</h2>
		</div>
	</div-->
	<div class="card-image">
		<figure class="image">
			<img src={`/images/${cardData.attribution_id}.jpg`} alt={cardData.image_credit} />
		</figure>
	</div>
	<div class="card-content">
		<div class="content">
			<p>{utcFormat('%B %d, %Y')(cardData.attribution_date)}, {cardData.attribution_id}</p>
			<p><a href={cardData.attribution_url} target='_blank'>{cardData.source}</a></p>
			<p>{cardData.short_description}</p>
			<p>
				<button class="button is-info is-small" on:click={sourceFilter.selectOne(cardData.source)}
					>{cardData.source}</button
				>
				{#each cardData.actor_nation as nation}
					<button class="button is-danger is-small" on:click={actorNationFilter.selectOne(nation)}
						>{nation}</button
					>
				{/each}
				{#each cardData.platform as platform}
					<button
						class="button is-link is-small"
						on:click={platformFilter.selectOne(platform)}>{platform}</button
					>
				{/each}
			</p>
		</div>
	</div>
</div>

<style>
	div.card {
		max-width: 780px;
	}
</style>
