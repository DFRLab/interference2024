<script>
    import CaseCard from "./CaseCard.svelte";
    export let modalOpen
    export let activeCaseData

    function closeModal(){
        modalOpen = false
    }

</script>

<div id="card-modal" class={modalOpen ? "modal is-active" : "modal"}>
	<div class="modal-background" on:click={closeModal}></div>
	<div class="modal-content">
        {#if activeCaseData}
		 <CaseCard cardData={activeCaseData} expanded={true} ></CaseCard>
        {/if}
	</div>
    <div class="modal-close" on:click={closeModal}></div>
</div>