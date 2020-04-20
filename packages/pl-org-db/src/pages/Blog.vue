<template>
	<Layout>
		<section id="blog" class="container-fluid">
			<h2>Blog</h2>
			<div class="card bg-dark" v-for="post in posts" :key="post.id">
				<h3 class="card-header">{{post.title}}</h3>
				<div class="card-body bg-white">
					<p>In ipsum ipsum, mattis non massa at, pellentesque cursus mi. Sed ultricies luctus hendrerit. Quisque id orci neque. Etiam id consectetur elit, semper sollicitudin mauris. Maecenas semper eget justo ac luctus. Maecenas faucibus dui ex, ut molestie neque lobortis in. Etiam laoreet accumsan magna, quis mattis urna. Ut at finibus lacus. Integer non pellentesque lectus, eu auctor dolor. Maecenas nec elit eleifend, convallis ligula eget, auctor libero. Proin molestie lacinia tempus. Nulla ultricies ligula a ex consectetur, non feugiat lectus tempus.</p>
					<g-link :to="`/blog/${post.id}`" class="btn btn-dark">Więcej</g-link>
				</div>
			</div>
			<Pager :info="pageInfo"/>
		</section>
	</Layout>
</template>

<page-query>
query ($page: Int) {
	allBlogPost(perPage: 5, page: $page) @paginate {
		pageInfo {
			totalPages
			currentPage
		}
		edges {
			node {
				id,
				title
			}
		}
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
		posts() {
			return this.$page?.allBlogPost.edges?.map(e => e.node)
		},
		pageInfo() {
			return this.$page?.allBlogPost.pageInfo
		}
	}
}
</script>
