<script>
    import Dropdown from '$lib/components/Dropdown.svelte'
    import {
        platformFilter,
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
  $: console.log($platformFilter)

  function addCount(filter, property, cases) {
    return filter.map((d) => ({
      ...d,
      count: cases.map((d) => d[property]).flat().filter((a) => a === d.id).length,
      liveCount: cases.filter((d) => d.show).map((d) => d[property]).flat().filter((a) => a === d.id).length
    }));
  }

  $: console.log(addCount($platformFilter, 'platform', cases))

</script>

{#if cases}
<Dropdown items={addCount($platformFilter, 'platform', cases)}
                label="Platform"
                on:itemsAdded={(e) => platformFilter.select(e.detail)}
                on:itemsRemoved={(e) => platformFilter.unselect(e.detail)}>
</Dropdown>
<!--Dropdown items={items} label='Platform'></Dropdown-->
{/if}