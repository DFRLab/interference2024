<script>
    import { fade } from 'svelte/transition';
    export let tooltipX;
    export let tooltipY;
    export let tooltipContent;
  </script>
  
  <div
    transition:fade="{{ duration: 250 }}"
    class="tooltip"
    style="
        top:{tooltipY < 100 ? tooltipY + 60 : tooltipY - 40}px;
        left:{tooltipX < 800 ? tooltipX - 30 : tooltipX - 360}px;
      "
  >
    {@html tooltipContent}
  </div>
  
  <style>
    .tooltip {
      position: absolute;
      border: 1px solid #ccc;
      font-size: 13px;
      background: rgba(255, 255, 255, 0.95);
      transform: translate(0%, -200%);
      padding: 5px;
      z-index: 1000;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      width: 300px;
    }
  </style>
  