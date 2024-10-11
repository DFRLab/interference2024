<script>
    import { fade } from 'svelte/transition';
    import CaseCard from '$lib/components/CaseCard.svelte';

    export let tooltipX;
    export let tooltipY;
    export let hoveredCaseData;
    export let width;
    export let showTooltip;

    function handleMouseOut() {
      showTooltip = false;
    }

  </script>
  
  <div
    transition:fade="{{ duration: 250 }}"
    class="tooltip"
    style="
        top:{tooltipY}px;
        left:{tooltipX < width - 500 ? tooltipX + 10 : tooltipX - 500 - 10}px;
      "
      on:mouseout={handleMouseOut}
  >
      <CaseCard cardData={hoveredCaseData} expanded={true}></CaseCard>
  </div>
  
  <style>
    .tooltip {
      position: fixed;
      /*border: 1px solid #ccc;
      font-size: 13px;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      padding: 5px;*/
      border-radius: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      transform: translate(0%, -200px);
      z-index: 1000;
      max-width: 500px;
      max-height: 400px;
      overflow-y: scroll;
    }
  </style>
  