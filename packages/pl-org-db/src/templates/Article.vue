<template>
	<Layout>
		<section class="container-fluid with-sidebar" v-if="ready">
			<article typeof="Article" resource="#article">
				<div>
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
				<aside rel="author" typeof="Person" resource="#author">
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
			</article>
		</section>
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
