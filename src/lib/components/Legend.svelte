<script>
    export let width
    export let margins
    export let radiusScale
    export let opacityScale

    let minOpacity = opacityScale.domain()[0]
    let maxOpacity = opacityScale.domain()[1]
    let opacityRange = maxOpacity - minOpacity
    let opacities = [
        minOpacity,
        minOpacity + opacityRange/5,
        minOpacity + opacityRange*2/5,
        minOpacity + opacityRange*3/5,
        minOpacity + opacityRange*4/5,
        maxOpacity]

    let height = 60
</script>

<svg {width} height={height}>
    <g transform={`translate(${margins.left},${0})`}>
    <text
        x={72}
        y={12}
        text-anchor={'middle'}
    >Breakout scale</text>
    {#each radiusScale.domain() as rad,i}
        <circle
            cx={12 - radiusScale(rad) + i*30}
            cy={32}
            r={radiusScale(rad)}
            fill={'#555555'}
        ></circle>
    {/each}
    <text
        x={(width - margins.left - margins.right)/2}
        y={12}
        text-anchor={'middle'}
    >Offline mobilization</text>
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
    <text
        x={width - margins.left - margins.right - 72}
        y={12}
        text-anchor={'middle'}
    >Attribution score</text>
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
</svg>