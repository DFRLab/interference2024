<script>
    export let width
    export let margins
    export let radiusScale
    export let opacityScale
    export let tooltipX
    export let tooltipY
    export let hoveredLegendData
    export let showLegendTooltip

    $: minOpacity = opacityScale.domain()[0]
    $: maxOpacity = opacityScale.domain()[1]
    $: opacityRange = maxOpacity - minOpacity
    $: opacities = [
        minOpacity,
        minOpacity + opacityRange/5,
        minOpacity + opacityRange*2/5,
        minOpacity + opacityRange*3/5,
        minOpacity + opacityRange*4/5,
        maxOpacity]

    let height = 70

    const tooltipContent = {
        "breakout_scale": "Breakout Scale represents a range from Category One to Category Six. The smallest point on the visualization represents 'Not Applicable', indicating attributions which lack suitable evidence to justify a Breakout Scale classification.",
        "attribution_score": "The opacity of attributions corresponds to the 18-point Attribution Score which attempts to qualify the credibility of an attribution."
    }

    function handleMouseOver(event, id) {
		showLegendTooltip = true;
		tooltipX = event.clientX;
		tooltipY = event.clientY;
		hoveredLegendData = tooltipContent[id];
	}
	function handleMouseOut() {
		showLegendTooltip = false;
	}
</script>

<svg {width} height={height}>
    <g
        transform={`translate(${margins.left},${0})`}
    >
    <g
        on:mouseover={(e) => handleMouseOver(e, "breakout_scale")}
        on:focus={(e) => handleMouseOver(e, "breakout_scale")}
        on:mouseout={handleMouseOut}
        on:blur={handleMouseOut}    
    >
    <text
        x={72}
        y={12}
        text-anchor={'middle'}
    >Breakout Scale</text>
    {#each radiusScale.domain() as rad,i}
        <circle
            cx={12 - radiusScale(rad) + i*30}
            cy={32}
            r={radiusScale(rad)}
            fill={'#555555'}
        ></circle>
    {/each}
</g>

    <text
        x={(width - margins.left - margins.right)/2}
        y={12}
        text-anchor={'middle'}
    >Offline Mobilization</text>
    <circle
        cx={(width - margins.left - margins.right)/2}
        cy={32}
        r={12}
        fill={'none'}
        stroke={'#000000'}
        stroke-width={1.5}
    ></circle>
    <circle
        cx={(width - margins.left - margins.right)/2}
        cy={32}
        r={9}
        fill={'#555555'}
    ></circle>

    <g
    on:mouseover={(e) => handleMouseOver(e, "attribution_score")}
    on:focus={(e) => handleMouseOver(e, "attribution_score")}
    on:mouseout={handleMouseOut}
    on:blur={handleMouseOut}    
>
    <text
        x={width - margins.left - margins.right - 72}
        y={12}
        text-anchor={'middle'}
    >Attribution Score</text>
    {#each opacities as op,i}
        <circle
            cx={width - margins.left - margins.right - 150 + i*30}
            cy={32}
            r={9}
            fill={'#555555'}
            opacity={opacityScale(op)}
        ></circle>
    {/each}
    </g>
    <line
        x1={0}
        x2={width}
        y1={58}
        y2={58}
        stroke={'#bbbbbb'}
        stroke-width={1}
    ></line>
</g>
</svg>