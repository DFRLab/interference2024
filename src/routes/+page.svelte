<script>
    import copy from "../data/copy.json"
</script>

<section class="section">
	<div class="container">
		<h1 class="is-size-1">{copy.meta.title}</h1>
        {#each copy.content as block}
            {#if block.type == "text"}
                <p>{block.text}</p>
            {/if}
        {/each}
	</div>
</section>
