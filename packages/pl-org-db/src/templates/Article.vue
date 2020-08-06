<template>
	<Layout>
		<main v-if="ready">
			<article resource="#article" typeof="Article" class="container-fluid row-new">
				<div>
					<div>
						<div class="text-container">
							<h1 property="name">{{article.name}}</h1>
							<p>{{article.author.name}}, <span property="datePublished" :content="article.date">{{DateTime.fromISO(article.date).toLocaleString(DateTime.DATE_FULL)}}</span></p>
							<nav>
								<span class="float-left" v-if="previous">« <g-link :to="previous.path">{{previous.name}}</g-link></span>
								<span class="float-right" v-if="next"><g-link :to="next.path">{{next.name}}</g-link> »</span>
							</nav>
							<div property="articleBody" v-html="article.content_html"/>
							<nav>
								<span class="float-left" v-if="previous">« <g-link :to="previous.path">{{previous.name}}</g-link></span>
								<span class="float-right" v-if="next"><g-link :to="next.path">{{next.name}}</g-link> »</span>
							</nav>
							<h2>Komentarze</h2>
							<div class="fb-comments" :data-href="`http://db.org.pl${article.path}`" data-numposts="5" data-width="100%"></div>
						</div>
					</div>
					<div class="sidebar">
						<aside rel="author" resource="#author" typeof="Person" class="text-container">
							<div rel="image" v-if="article.author.image">
								<img :src="article.author.image">
							</div>
							<h2 property="name">{{article.author.name}}</h2>
							<p property="description">{{article.author.bio}}</p>
							<nav rev="author">
								<h3>Artykuły</h3>
								<ul>
									<li v-for="edge in article.author.articles.edges" :key="edge.node.path">
										<g-link :to="edge.node.path">{{edge.node.name}}</g-link>
									</li>
								</ul>
							</nav>
						</aside>
					</div>
				</div>
			</article>
		</main>
	</Layout>
</template>

<page-query>
query ($id: ID!) {
	article(id: $id) {
		path
		name
		date
		lead
		content_html

		author {
			name
			bio
			image

			articles: belongsTo (filter: {typeName: {eq: Article}}) {
				edges {
					node {
						... on Article {
							path
							name
						}
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
			title: this.article.name
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
		article() {
			return this.$page.article
		},
		index() {
			return this.article.author.articles.edges.findIndex(e => e.node.path === this.article.path)
		},
		previous() {
			return this.article.author.articles.edges[this.index + 1]?.node
		},
		next() {
			return this.article.author.articles.edges[this.index - 1]?.node
		},
	},
	mounted: () => {
		FB.XFBML.parse();
	},
}
</script>
