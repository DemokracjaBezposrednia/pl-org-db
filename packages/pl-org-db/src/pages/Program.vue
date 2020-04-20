<template>
	<Layout>
		<section id="program" class="container-fluid" v-if="ready">
			<h2>Program</h2>
			<div class="card bg-dark" v-for="plank in planks" :key="plank.id">
				<h3 class="card-header">xxx</h3>
				<div class="card-body bg-white">
					<div v-html="plank.content"/>
					<g-link :to="`/program/${plank.id}`" class="btn btn-dark">Więcej</g-link>
				</div>
			</div>
			<Pager :info="pageInfo"/>
		</section>
	</Layout>
</template>

<page-query>
query ($page: Int) {
	allPlank(perPage: 10, page: $page) @paginate {
		pageInfo {
			totalPages
			currentPage
		}
		edges {
			node {
				id,
				content
			}
		}
	}
}
</page-query>

<script>
import { Pager } from 'gridsome'

export default {
	metaInfo: {
		title: 'Program'
	},
	components: {
		Pager
	},
	computed: {
		ready() {
			return this.$page
		},
		planks() {
			return this.$page.allPlank.edges?.map(e => e.node)
		},
		pageInfo() {
			return this.$page.allPlank.pageInfo
		},
	}
}
</script>
