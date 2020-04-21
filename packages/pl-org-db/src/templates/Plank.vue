<template>
	<Layout>
		<section id="program" class="container-fluid" v-if="ready">
			<h2>{{plank.title}}</h2>
			<p>{{plank.lead}}</p>
			<div v-html="plank.content_html"/>
			<div class="fb-comments" :data-href="`http://db.org.pl/program/${plank.id}`" data-numposts="5" data-width="100%"></div>
		</section>
	</Layout>
</template>

<page-query>
query ($id: ID!) {
	plank(id: $id) {
		id
		title
		lead
		content_html
	}
}
</page-query>

<script>
export default {
	metaInfo() {
		return {
			title: this.plank.title
		}
	},
	computed: {
		ready() {
			return this.$page
		},
		plank() {
			return this.$page.plank
		},
	},
	mounted: () => {
		FB.XFBML.parse();
	},
}
</script>
