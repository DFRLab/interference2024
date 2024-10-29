<script>
	import copy from '../../data/copy.json';
</script>

<section class="content title section" id="top" style:background-image={"url('images/fiat_2024_banner_background_new.jpg')"}>
	<div class="container has-text-centered">
		<div class="logos">
			<a href="https://www.atlanticcouncil.org"
				><img src="logos/ac.svg" alt="Atlantic Council Logo" /></a
			>
			<a
				class="smaller"
				href="https://www.atlanticcouncil.org/programs/digital-forensic-research-lab/"
				><img src="logos/dfrlab.svg" alt="Digital Forensic Research Lab Logo" /></a
			>
		</div>
		<h1 class="title is-size-1 is-size-2-mobile">{copy.meta.title}</h1>
		<h2 class="subtitle is-size-4 is-size-5-mobile has-text-weight-bold">{copy.meta.subtitle}</h2>
		<p class="subsubtitle is-italic is-size-6">{copy.meta.subsubtitle}</p>
	</div>
</section>

<style>
	section.content.title {
		padding-top: 1rem;
		position: relative;
		background-size: contain;
        background-repeat: no-repeat;
		background-position: center;
        max-width: 800px;
        margin: auto;
	}

	section.title .logos {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 2.2rem;
	}

	section.title .logos a {
		height: 100%;
	}

	section.title .logos a:not(:last-child) {
		margin-right: 1rem;
	}

	section.title .logos a img {
		height: 100%;
	}

	section.title .logos a.smaller {
		height: 80%;
	}

	.title {
		font-family: var(--font-01);
		color: var(--usa-blue);
	}
	.subtitle {
		font-family: var(--font-02);
		color: var(--usa-blue);
	}
	.subsubtitle {
		font-family: var(--font-02);
		color: var(--usa-blue);
	}
</style>
