<script>
	import { fade } from 'svelte/transition';
	import { utcFormat } from 'd3-time-format';
	import { platformFilter, actorNationFilter, sourceFilter } from '../../stores/filters';
	import ScoreBar from '$lib/components/ScoreBar.svelte';
	import ScoreQuestions from '$lib/components/ScoreQuestions.svelte';
	import { slide } from 'svelte/transition';

	export let cardData;
	export let expanded;
	export let modalOpen;
	export let activeCaseData;

	let openCase = function () {
		modalOpen = true;
		activeCaseData = cardData;
	};

	let scoreQuestionsExpanded = false;
</script>

<div class="card" transition:fade id={'case-' + cardData.attribution_id}>
	<div class="header">
		<div class="card-header-title">
			<h2 class="is-size-5">{cardData.short_title}</h2>
		</div>
		{#if expanded}
			<div class="card-content">
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
					<span
						class="score-info-icon disable-select"
						on:click|self={() => (scoreQuestionsExpanded = !scoreQuestionsExpanded)}
					>
						{scoreQuestionsExpanded ? 'X' : '?'}
					</span>
				</div>
				{#if scoreQuestionsExpanded}
					<div class="score-questions-container" transition:slide|local>
						<ScoreQuestions {cardData}></ScoreQuestions>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div class="card-image">
		<figure class="image">
			<img src={`/images/${cardData.attribution_id}.jpg`} />
		</figure>
		{#if expanded}
			<div class="image-credit">
				Image: <a
					href={cardData.image_credit_url == 'attribution_url'
						? cardData.attribution_url_x
						: cardData.image_credit_url}
					target="_blank">{cardData.image_credit}</a
				>
			</div>
		{/if}
	</div>
	<div class="card-content">
		<div class="content">
			{#if expanded}
				<p>{utcFormat('%B %d, %Y')(new Date(cardData.attribution_date))}</p>
				<p><a href={cardData.attribution_url_x} target="_blank">{cardData.source}</a></p>
			{/if}
			<p>{cardData.short_description}</p>
			{#if expanded}
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
			{/if}
		</div>
	</div>
	{#if !expanded}
		<footer class="card-footer">
			<button on:click={openCase(cardData.attribution_id)} class="card-footer-item"
				>Open case</button
			>
		</footer>
	{/if}
</div>

<style>
	div.card {
		max-width: 780px;
	}
	.image-credit {
		padding: 0px 24px;
		font-size: 0.8rem;
		position: relative;
		height: 24px;
		top: -24px;
		color: white;
		background-color: black;
		opacity: 0.5;
		line-height: 1.7;
	}
	.image-credit a {
		color: white;
		text-decoration: underline;
	}
	.score-bars {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
	}
	.score-bars span.score-info-icon {
		width: 1.3rem;
		height: 1.3rem;
		margin: 0;
		padding: 0 auto 0.1rem auto;
		font-size: 0.8rem;
		font-weight: bold;
		text-align: center;
		color: var(--usa-lightred);
		border: 2px solid var(--text-darkgray);
		border-radius: 2px;
		background-color: var(--text-darkgray);
		transition: all 400ms ease;
		cursor: pointer;
	}

	.score-bars span.score-info-icon:hover {
		color: var(--text-darkgray);
		background-color: var(--usa-lightred);
	}

	.score-bar-wrapper {
		flex: 1 1 0;
		display: inline-block;
	}

	.score-bar-wrapper p {
		font-size: 0.7rem;
	}
</style>
