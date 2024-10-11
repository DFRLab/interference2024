<script>
    import { fade } from 'svelte/transition';
    import CaseCard from '$lib/components/CaseCard.svelte';

    export let tooltipX;
    export let tooltipY;
    export let hoveredCaseData;
    export let width;

  </script>
  
  <div
    transition:fade="{{ duration: 250 }}"
    class="tooltip"
    style="
        top:{tooltipY}px;
        left:{tooltipX < width - 300 ? tooltipX + 10 : tooltipX - 300 - 10}px;
      "
  >
    <CaseCard cardData={hoveredCaseData} expanded={true}></CaseCard>
  </div>
  
  <style>
    .tooltip {
      position: fixed;
      border: 1px solid #ccc;
      font-size: 13px;
      background: rgba(255, 255, 255, 0.95);
      transform: translate(0%, -50%);
      padding: 5px;
      z-index: 1000;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      max-width: 500px;
    }
  </style>
  