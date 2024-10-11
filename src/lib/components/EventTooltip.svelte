<script>
    import { fade } from 'svelte/transition';
    import { utcFormat } from 'd3-time-format';

    export let tooltipX;
    export let tooltipY;
    export let hoveredEventData;
    export let width;

  </script>
  
  <div
    transition:fade="{{ duration: 250 }}"
    class="event-tooltip"
    style="
        top:{tooltipY}px;
        left:{tooltipX < width - 300 ? tooltipX + 10 : tooltipX - 300 - 10}px;
      "
  >
      <p class="date">{utcFormat('%B %d, %Y')(hoveredEventData.date)}</p>
      <h2>{hoveredEventData.Title}</h2>
      <p class="description">{hoveredEventData.Description}</p>
  </div>
  
  <style>
    .event-tooltip {
      position: fixed;
      /*border: 1px solid #ccc;*/
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      padding: 5px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      transform: translate(0%, -50%);
      z-index: 1000;
      max-width: 300px;
      max-height: 400px;
      overflow-y: scroll;
    }
    .date {
    font-size: 0.7rem;
  }

  h2 {
    margin: 0.2rem 0;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .description {
    font-size: 0.8rem;
    line-height: 1.5;
  }
  </style>