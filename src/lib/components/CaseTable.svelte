<script>
    export let cases
</script>

<div class="table-container">
<table class="table is-striped is-fullwidth">
    <thead>
        <tr>
            <td>Description</td>
            <td>Attribution date</td>
            <td>Source</td>
            <td>Source category</td>
            <td>Actor nation</td>
        </tr>
    </thead>
    <tbody>
        {#each cases as attrCase}
            <tr>
                <td>{attrCase.short_description}</td>
                <td>{attrCase.attribution_date}</td>
                <td>{attrCase.source}</td>
                <td>{attrCase.source_category}</td>
                <td>{attrCase.actor_nation}</td>
            </tr>
        {/each}
    </tbody>
</table>
</div>

<style>
    thead {
        font-weight: bold;
    }
</style>

