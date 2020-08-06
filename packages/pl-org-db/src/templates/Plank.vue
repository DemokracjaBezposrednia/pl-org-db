<template>
	<Layout>
		<main v-if="ready">
			<article resource="#plank" typeof="Chapter" class="container-fluid row-new">
				<div>
					<div>
						<div class="text-container">
							<h1 property="name">{{plank.name}}</h1>
							<nav>
								<span class="float-left">« <g-link href="/program/Referendum">Referendum</g-link></span>
								<span class="float-right"><g-link href="/program/Weto-obywatelskie">Weto obywatelskie</g-link> »</span>
							</nav>
							<p property="abstract" class="lead">{{plank.lead}}</p>
							<div property="articleBody" v-html="plank.content_html"/>
							<h2>Komentarze</h2>
							<div class="fb-comments" :data-href="`http://db.org.pl${plank.path}`" data-numposts="5" data-width="100%"></div>
						</div>
					</div>
					<div class="sidebar">
						<aside class="text-container">
							<nav rel="isPartOf" resource="/program#program" typeof="Book">
								<h2 property="name"><g-link to="/program">Nowe reguły gry</g-link></h2>
								<ul rel="hasPart">
									<li v-for="chapter in index" :key="chapter.path" :resource="`${chapter.path}#plank`" typeof="Chapter"><g-link :href="chapter.path">{{chapter.name}}</g-link></li>
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
	plank(id: $id) {
		id
		path
		name
		lead
		content_html
	}
	index: plank(id: "index") {
		content_mdast
	}
	allPlank {
		edges {
			node {
				id
				path
				name
				lead
			}
		}
	}
}
</page-query>

<script>
export default {
	metaInfo() {
		return {
			title: this.plank.name
		}
	},
	computed: {
		ready() {
			return this.$page
		},
		plank() {
			return this.$page.plank
		},
		index() {
			const mdast = JSON.parse(this.$page.index.content_mdast)
			if (mdast.children.length != 1) throw new Error('Invalid index format')
			const list = mdast.children[0]
			if (list.type != 'list') throw new Error('Invalid index format')

			const planks = new Map(this.$page.allPlank.edges?.map(e => [e.node.id, e.node]))

			const mapItem = (item) => {
				const [namePara, contentList] = item.children
				if (namePara.type != 'paragraph' || namePara.children.length != 1) throw new Error('Invalid index format')
				const name = namePara.children[0]
				if (contentList && contentList.type != 'list') throw new Error('Invalid index format')
				const content = contentList ? contentList.children.map(mapItem) : null

				const id = name.label.replace(/ /g, '-')
				const plank = planks.get(id)
				if (!plank) throw new Error(`Unknown link: ${id}`)
				return {...plank, content}
			}

			return list.children.map(mapItem)
		},
	},
	mounted: () => {
		FB.XFBML.parse();
	},
}
</script>
