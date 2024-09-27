<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import SearchText from '$lib/components/SearchText.svelte';
	import { attributionScoreScale } from '../../stores/scales';
	import {
		platformFilter,
		actorNationFilter,
		sourceFilter,
		sourceCategoryFilter,
		methodFilter,
		selectAllFilters,
		attributionScoreFilter,
		attributionScoreDef,
		textSearchFilter
	} from '../../stores/filters';

	export let cases;

	function handleButtonClick() {
		selectAllFilters();
		/*contextData.unselectAll();
    $highlightPolarization = false;
    $highlightCib = false;
    if ($originalTimeDomain) {
      $timeScale.domain($originalTimeDomain);
      $timeScale = $timeScale;
      $originalTimeDomain = null;
    }*/
	}

	function addCount(filter, property, cases) {
		return filter.map((d) => ({
			...d,
			count: cases
				.map((d) => d[property])
				.flat()
				.filter((a) => a === d.id).length,
			liveCount: cases
				.filter((d) => d.show)
				.map((d) => d[property])
				.flat()
				.filter((a) => a === d.id).length
		}));
	}
</script>

{#if cases}
	<div class="controls-wrapper">
		<div class="grid is-col-min-8">
			<SearchText
				searchString={$textSearchFilter}
				label="Search"
				on:change={(e) => ($textSearchFilter = e.detail)}
				on:reset={() => textSearchFilter.reset()}
			/>
			<Slider
				value={$attributionScoreFilter}
				label="Attribution Score"
				min={attributionScoreDef[0]}
				max={attributionScoreDef[1]}
				showHandleLabels={false}
				startColor={'#ffffff'}
				stopColor={'#000000'}
				on:changed={(e) => ($attributionScoreFilter = e.detail)}
			/>
			<Dropdown
				items={addCount($actorNationFilter, 'actor_nation', cases)}
				label="Actor nation"
				on:itemsAdded={(e) => actorNationFilter.select(e.detail)}
				on:itemsRemoved={(e) => actorNationFilter.unselect(e.detail)}
			></Dropdown>
			<Dropdown
				items={addCount($platformFilter, 'platform', cases)}
				label="Platform"
				on:itemsAdded={(e) => platformFilter.select(e.detail)}
				on:itemsRemoved={(e) => platformFilter.unselect(e.detail)}
			></Dropdown>
			<Dropdown
				items={addCount($sourceFilter, 'source', cases)}
				label="Source"
				on:itemsAdded={(e) => sourceFilter.select(e.detail)}
				on:itemsRemoved={(e) => sourceFilter.unselect(e.detail)}
			></Dropdown>
			<Dropdown
				items={addCount($sourceCategoryFilter, 'source_category', cases)}
				label="Source Category"
				on:itemsAdded={(e) => sourceCategoryFilter.select(e.detail)}
				on:itemsRemoved={(e) => sourceCategoryFilter.unselect(e.detail)}
			></Dropdown>
			<Dropdown
				items={addCount($methodFilter, 'methods', cases)}
				label="Method"
				on:itemsAdded={(e) => methodFilter.select(e.detail)}
				on:itemsRemoved={(e) => methodFilter.unselect(e.detail)}
			></Dropdown>
			<button class="reset-filters" on:click={() => handleButtonClick()}> Reset </button>
		</div>
	</div>
{/if}

<style>
	button {
		pointer-events: all;
	}

	button.reset-filters {
		align-self: flex-end;
		min-width: 100px;
		height: 1.7rem;
		max-height: 1.7rem;
		margin: 0.3rem 0.3rem 0 0.3rem;
		padding: 0.1rem 0.3rem;
		font-family: var(--font-02);
		font-size: 0.8rem;
		font-weight: normal;
		line-height: 1.3rem;
		color: var(--usa-blue);
		background-color: var(--bg);
		border: 2px solid var(--usa-blue);
		border-radius: 3px;
		outline: none;
		overflow: hidden;
		transition: all 200ms ease;
	}

	button.reset-filters:hover {
		color: var(--bg);
		background-color: var(--usa-blue);
		cursor: pointer;
	}
</style>
