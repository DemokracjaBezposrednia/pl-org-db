<template>
	<Layout>
		<main class="container-fluid epic" v-if="ready">
			<h1>Program</h1>
			<section v-for="chapter in index" :key="chapter.path" class="epic">
				<h2>{{chapter.name}}</h2>
				<p>{{chapter.lead || "Duis accumsan ut dolor vel viverra. Donec tempus mattis faucibus. Nullam hendrerit felis tellus, nec aliquet lectus pellentesque ac. Suspendisse tempus vitae purus vitae porta. Vivamus facilisis tristique sodales."}}</p>
				<div class="row-new" v-if="chapter.content">
					<div class="bg-dark">
						<div v-for="link in chapter.content" :key="link.path">
							<div class="card">
								<h3 class="card-header">{{link.name}}</h3>
								<div class="card-body bg-white">
									<p>{{link.lead || "Duis accumsan ut dolor vel viverra. Donec tempus mattis faucibus. Nullam hendrerit felis tellus, nec aliquet lectus pellentesque ac. Suspendisse tempus vitae purus vitae porta. Vivamus facilisis tristique sodales."}}</p>
									<g-link :to="link.path" class="btn btn-dark">Więcej</g-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div class="fb-comments" :data-href="`http://db.org.pl/program`" data-numposts="5" data-width="100%"></div>
		</main>
	</Layout>
</template>

<page-query>
{
	index: plank(id: "index") {
		content_mdast
	}
	allPlank {
		edges {
			node {
				path
				id
				name
				lead
			}
		}
	}
}
</page-query>

<script>
export default {
	metaInfo: {
		title: 'Program'
	},
	computed: {
		ready() {
			return this.$page
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
		FB.XFBML.parse()
	},
}
</script>
