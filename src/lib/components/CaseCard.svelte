<script>
	export let cardData;
</script>

<div class="card">
	<div class="card-header">
		<div class="card-header-title">
			<h2 class="is-size-3">Don't cases have titles?</h2>
		</div>
	</div>
	<div class="card-image">
		<figure class="image">
			<img src={cardData.image_url} alt={cardData.image_credit} />
		</figure>
	</div>
	<div class="card-content">
		<div class="content">
            <p>{cardData.attribution_date}</p>
			<p>{cardData.short_description}</p>
            <p>
                <span class="tag is-info">{cardData.source}</span>
                <span class="tag is-danger">{cardData.actor_nation}</span>
                <span class="tag is-link">{cardData.source_category}</span>
            </p>
		</div>
	</div>
</div>
