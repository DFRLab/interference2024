<script>
	import { fade } from 'svelte/transition';
	import { utcFormat } from 'd3-time-format';
	import { platformFilter, actorNationFilter, sourceFilter } from '../../stores/filters';
	import ScoreBar from '$lib/components/ScoreBar.svelte';
	export let cardData;
</script>

<div class="card" transition:fade id={'case-' + cardData.attribution_id}>
	<div class="card-header">
		<div class="card-header-title">
			<h2 class="is-size-5">{cardData.short_title}</h2>
		</div>
	</div>
	<div class="score-bars">
		<div class="score-bar-wrapper">
			<ScoreBar value={cardData.credibility} maxValue={5} />
			<p>Credibility</p>
		</div>
		<div class="score-bar-wrapper">
			<ScoreBar value={cardData.objectivity} maxValue={3} />
			<p>Objectivity</p>
		</div>
		<div class="score-bar-wrapper">
			<ScoreBar value={cardData.evidence} maxValue={5} />
			<p>Evidence</p>
		</div>
		<div class="score-bar-wrapper">
			<ScoreBar value={cardData.transparency} maxValue={5} />
			<p>Transparency</p>
		</div>
		<!--span class="score-info-icon disable-select" on:click|self={() => scoreQuestionsExpanded = !scoreQuestionsExpanded}>
		  {scoreQuestionsExpanded ? 'X' : '?'}
		</span-->
	</div>
	<div class="card-image">
		<figure class="image">
			<img src={`/images/${cardData.attribution_id}.jpg`} />
		</figure>
	</div>
	<div class="card-content">
		<div class="content">
			<p>{utcFormat('%B %d, %Y')(new Date(cardData.attribution_date))}</p>
			<p><a href={cardData.attribution_url} target="_blank">{cardData.source}</a></p>
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
					<button class="button is-link is-small" on:click={platformFilter.selectOne(platform)}
						>{platform}</button
					>
				{/each}
			</p>
		</div>
	</div>
</div>

<style>
	div.card {
		max-width: 780px;
		/*max-height: 600px;
		overflow-y: scroll;*/
	}
	.score-bars {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.score-bar-wrapper {
		flex: 1 1 0;
		display: inline-block;
	}

	.score-bar-wrapper p {
		font-size: 0.7rem;
	}
</style>
