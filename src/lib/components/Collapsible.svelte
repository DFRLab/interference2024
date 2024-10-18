<script>
	import AttributionInformation from '$lib/components/AttributionInformation.svelte';
	export let title;
	export let paragraphs;
	export let id;
</script>

<div class="collapsible-container">
	<input {id} class="toggle" type="checkbox" />
	<label for={id} class="lbl-toggle top">{title}</label>
	<div class="collapsible-content">
		{#each paragraphs as par}
			<p class="mb-4">{@html par}</p>
		{/each}
		{#if id == 'taxonomy'}
			<AttributionInformation />
		{/if}
	</div>
</div>

<style>
	.collapsible-container {
		margin: 0 2rem;
	}
	input.toggle[type='checkbox'] {
		display: none;
	}

	.lbl-toggle {
		display: block;
		margin-left: -0.3rem;
		padding: 0.2rem 0;
		font-weight: normal;
		font-style: italic;
		color: var(--text-black);
		cursor: pointer;
		transition: all 200ms ease;
	}

	.lbl-toggle.top {
		font-weight: normal;
		font-style: normal;
	}

	.lbl-toggle::before {
		content: ' ';
		display: inline-block;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 5px solid currentColor;
		vertical-align: middle;
		margin-top: 2px;
		transform: translateX(-0.6rem) translateY(-2px);
		transition: transform 200ms ease-out;
	}

	.collapsible-content {
		max-height: 0px;
		overflow: hidden;
		transition: max-height 500ms ease-in-out;
	}

	.collapsible-content p {
		padding: 0 1rem;
	}

	.toggle:checked + .lbl-toggle + .collapsible-content {
		max-height: 10000px;
		border: 1px solid var(--dfrlab-lightgray);
		border-radius: 3px;
	}

	.toggle:checked + .lbl-toggle::before {
		transform: rotate(90deg) translateY(0.6rem);
	}

	.toggle:checked + .lbl-toggle {
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
