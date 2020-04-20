<template>
	<Layout>
		<section id="program" class="container-fluid" v-if="ready">
			<h2>Program</h2>
			<div class="row-new">
				<div class="bg-dark">
					<div v-for="plank in planks" :key="plank.id">
						<div class="card">
							<h3 class="card-header">{{plank.title}}</h3>
							<div class="card-body bg-white">
								<div v-html="plank.lead"/>
								<g-link :to="`/program/${plank.id}`" class="btn btn-dark">Więcej</g-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</Layout>
</template>

<page-query>
{
	allPlank {
		pageInfo {
			totalPages
			currentPage
		}
		edges {
			node {
				id
				title
				lead
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
	}
}
</script>
