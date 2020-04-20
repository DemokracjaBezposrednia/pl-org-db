<template>
	<Layout>
		<section id="program" class="container-fluid" v-if="ready">
			<h2>XXX</h2>
			<div v-html="plank.content"/>
			<div class="fb-comments" :data-href="`http://db.org.pl/program/${plank.id}`" data-numposts="5" data-width="100%"></div>
		</section>
	</Layout>
</template>

<page-query>
query ($id: ID!) {
	plank(id: $id) {
		id
		content
	}
}
</page-query>

<script>
import { Pager } from 'gridsome'

export default {
	metaInfo: {
		title: 'Blog'
	},
	components: {
		Pager
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
	}
}
</script>
