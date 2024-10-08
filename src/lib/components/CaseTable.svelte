<script>
    import { utcFormat } from 'd3-time-format';
    export let cases
</script>

<div class="table-container">
<table class="table is-striped is-fullwidth">
    <thead>
        <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Attribution date</td>
            <td>Source</td>
            <td>Source category</td>
            <td>Actor nation</td>
        </tr>
    </thead>
    <tbody>
        {#each cases as attrCase}
        {#if attrCase.show}
            <tr id={'case-' + attrCase.attribution_id}>
                <td>{attrCase.short_title}</td>
                <td>{attrCase.short_description}</td>
                <td>{utcFormat('%B %d, %Y')(new Date(attrCase.attribution_date))}</td>
                <td>{attrCase.source}</td>
                <td>{attrCase.source_category}</td>
                <td>{#each attrCase.actor_nation as nation, i}
                    {attrCase.actor_nation.length != (i + 1) ? nation + ', ' : nation}
                    {/each}</td>
            </tr>
            {/if}
        {/each}
    </tbody>
</table>
</div>

<style>
    thead {
        font-weight: bold;
    }
</style>

