// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
	// Set default layout as a global component
	Vue.component('Layout', DefaultLayout)

	head.link.push({
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap',
	})
	head.link.push({
		rel: 'stylesheet',
		href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	})
}
