<script>
	import {
		textSearchFilter,
		attributionScoreFilter,
		actorNationFilter,
		platformFilter,
		sourceFilter,
		sourceCategoryFilter,
		methodFilter,
		campaignFilter,
		timeRangeFilter
	} from '../../stores/filters';
	import { searchParamsFromFilters } from '../utils/share';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	//import Icon from 'svelte-awesome';
	//import { twitter, clipboard } from 'svelte-awesome/icons';

	export let text = '';
	//export let caseId = '';
	export let mode = 'standard';

	async function copyToClipBoard() {
		await navigator.clipboard.writeText($page.url);
		const previousText = text;
		text = 'Copied to clipboard!';
		setTimeout(() => (text = previousText), 3000);
	}

	/*$: url = urlFromFilters(
        $textSearchFilter,
        $attributionScoreFilter,
        $actorNationFilter,
        $platformFilter,
        $sourceFilter,
        $sourceCategoryFilter,
        $methodFilter
    )
	$: params = searchParamsFromFilters(
		$textSearchFilter,
		$attributionScoreFilter,
		$actorNationFilter,
		$platformFilter,
		$sourceFilter,
		$sourceCategoryFilter,
		$methodFilter
	);*/

	function handleClick() {
		let params = searchParamsFromFilters(
			$textSearchFilter,
			$attributionScoreFilter,
			$actorNationFilter,
			$platformFilter,
			$sourceFilter,
			$sourceCategoryFilter,
			$methodFilter,
			$campaignFilter
		);
		$page.url.searchParams.set('filters', params);
		//goto(`?${$page.url.searchParams.toString()}`);
        copyToClipBoard()

	};
</script>

<div class="share">
	<!--a class="twitter-share-button"
       class:gray={mode === 'tooltip'}
       href="https://twitter.com/intent/tweet?url={url.replace('#', '%23')}"
       data-size="large"
       target="_blank">
      <Icon data={twitter} scale="1.2" />
    </a-->
	<!--span class="pseudolink" class:gray={mode === 'tooltip'} on:click={copyToClipBoard}>
		<Icon data={clipboard}/>
	</span-->
	<p><button on:click={handleClick}>Share this view</button></p>
    <p class:gray={mode === 'tooltip'}>{text}</p>
</div>

<style>
	.share {
		/*display: flex;
		align-items: center;
		justify-content: center;*/
		margin: 0 0.5rem 0 0;
		font-family: var(--font-02);
		font-size: 0.8rem;
		pointer-events: all;
		text-align: center;
		padding-top: 0.7rem;
	}

	p {
		color: var(--usa-blue);
		white-space: nowrap;
	}

	.gray {
		color: var(--text-darkgray);
		transition: all 200ms ease;
	}

	.gray:hover {
		color: var(--text-black);
	}
</style>
