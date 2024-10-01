<script>
    export let sidebarOpen
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
  
    const upperY = tweened(28, {
          duration: 500,
          easing: cubicOut
      });
    const lowerY = tweened(100, {
          duration: 500,
          easing: cubicOut
      });
    const strokeWidth = tweened(14, {
          duration: 500,
          easing: cubicOut
      });

    const circleRadius = tweened(0, {
          duration: 500,
          easing: cubicOut
      });
  
    $: if(sidebarOpen){
      upperY.set(140)
      lowerY.set(28)
      strokeWidth.set(0)
      circleRadius.set(0)
    }
    $: if(!sidebarOpen){
      upperY.set(28)
      lowerY.set(140)
      strokeWidth.set(14)
      circleRadius.set(14)
    }
  </script>
  
  <div class="hamburger-container">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 160">
    <g id="home" class={"dark"}>
      <line x1={8} y1={$upperY} x2={120} y2={28}/>
      <circle cx={44} cy={28} r={$circleRadius} style:stroke-width={$strokeWidth}></circle>
      <line x1={8} y1={80} x2={120} y2={80} style:stroke-width={$strokeWidth}/>
      <circle cx={100} cy={80} r={$circleRadius} style:stroke-width={$strokeWidth}></circle>
      <line x1={8} y1={$lowerY} x2={120} y2={140}/>
      <circle cx={70} cy={140} r={$circleRadius} style:stroke-width={$strokeWidth}></circle>
    </g>
  </svg>
  </div>
  
  <style>
    .hamburger-container {
      width: 20px;
      height: 20px;
      float: right;
    }
    line {
      transition: stroke 1s;
      stroke-width: 14;
      stroke-linecap: round;
    }
    circle {
        stroke-width: 14;
        fill: white;
    }
    .dark {
      stroke: #000000;
    }
  </style>