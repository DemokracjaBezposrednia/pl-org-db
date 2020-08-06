<template>
	<Layout>
		<main v-if="ready">
			<section resource="person" typeof="Person" class="container-fluid row-new">
				<div>
					<div>
						<div class="text-container">
							<h1 property="name">{{person.name}}</h1>
							<div v-html="person.content_html"/>
							<section class="text-container">
								<h2>Najnowsze artykuły</h2>
								<article v-for="edge in person.articles.edges" :key="edge.node.path" class="text-container">
									<h3><g-link :to="edge.node.path">{{edge.node.name}}</g-link></h3>
									<div v-html="edge.node.content_html"></div>
									<div class="flex-row">
										<g-link :to="edge.node.path" class="btn btn-dark">Więcej</g-link>
									</div>
								</article>
							</section>
						</div>
					</div>
					<div class="sidebar">
						<aside class="text-container">
							<div rel="image" v-if="person.image">
								<img :src="person.image">
							</div>
							<h2 property="name">{{person.name}}</h2>
							<p property="description">{{person.bio}}</p>
							<nav rev="author">
								<h3>Artykuły</h3>
								<ul>
									<li v-for="edge in person.articles.edges" :key="edge.node.path">
										<g-link :to="edge.node.path">{{edge.node.name}}</g-link>
									</li>
								</ul>
							</nav>
						</aside>
					</div>
				</div>
			</section>
		</main>
	</Layout>
</template>

<page-query>
query ($id: ID!) {
	person(id: $id) {
		path
		name
		bio
		image
		content_html

		articles: belongsTo (filter: {typeName: {eq: Article}}) {
			edges {
				node {
					... on Article {
						path
						name
						lead
						content_html
					}
				}
			}
		}
	}
}
</page-query>

<script>
import { DateTime } from 'luxon'

export default {
	metaInfo() {
		return {
			title: this.person.name
		}
	},
	data() {
		return {
			DateTime
		}
	},
	computed: {
		ready() {
			return this.$page
		},
		person() {
			return this.$page?.person
		},
	},
	mounted: () => {
		FB.XFBML.parse();
	},
}
</script>
