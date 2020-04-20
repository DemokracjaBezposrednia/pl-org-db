module.exports = function (Vue, options, { isServer: disabled, router }) {
	if (process.isClient) {
		const fbRoot = document.createElement('fb-root')
		fbRoot.id = 'fb-root'
		document.body.appendChild(fbRoot)

		const script = document.createElement('script')
		script.async = true
		script.defer = true
		script.crossOrigin = 'anonymous'
		script.src = "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v6.0&appId=256449778823781&autoLogAppEvents=1"
		document.body.appendChild(script)
	}
}
