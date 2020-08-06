<template>
	<Layout>
		<main>
			<section class="hero">
				<div>
					<div>
						<div class="container-fluid">
							<h1><span>Idziemy do&nbsp;przodu.</span></h1>
							<p class="lead"><span>Czas, by&nbsp;politycy przestali&nbsp;nam w&nbsp;tym&nbsp;przeszkadzać.</span></p>
							<a class="btn btn-light" href="#polska-2020">Zobacz więcej</a>
						</div>
					</div>
				</div>
			</section>

			<section id="polska-2020" class="container-fluid epic">
				<h2>Polska 2020 - rok kryzysu, rok zmiany</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare sagittis augue, sollicitudin eleifend lorem ultricies a. Duis tincidunt volutpat aliquet. Quisque et tortor erat. Cras at volutpat ipsum. Mauris pretium aliquet dui id euismod. Maecenas augue lectus, convallis ut tellus et, tempus varius ante. Duis sit amet est molestie, tempor felis eu, hendrerit magna. Nam nisi massa, tincidunt at lorem at, interdum accumsan erat. Aenean a tortor orci. Fusce accumsan sit amet orci lacinia vulputate. Mauris ut velit egestas, fringilla mauris sit amet, efficitur nunc.</p>
				<div class="row-new">
					<div class="bg-dark">
						<div>
							<div class="card">
								<h3 class="card-header">Pracodawcy,</h3>
								<div class="card-body bg-white">
									<p>Fusce facilisis nec massa vitae pulvinar. Etiam tincidunt nulla purus, quis blandit urna sagittis eu. Quisque pharetra luctus volutpat. Donec sem quam, aliquet sed pretium in, tristique eget velit.</p>
									<a href="#" class="btn btn-dark">Więcej</a>
								</div>
							</div>
						</div>
						<div>
							<div class="card">
								<h3 class="card-header">Pracownicy,</h3>
								<div class="card-body bg-white">
									<p>In at odio ipsum. Fusce posuere est mauris, sit amet sagittis metus vestibulum eu. Aenean iaculis dictum ipsum. Nulla facilisi. Praesent interdum tortor in rhoncus sollicitudin. Cras et semper orci.</p>
									<a href="#" class="btn btn-dark">Więcej</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="nowe-reguły-gry" class="container-fluid epic">
				<h2>Demokracja bezpośrednia, czyli nowe reguły gry</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare sagittis augue, sollicitudin eleifend lorem ultricies a. Duis tincidunt volutpat aliquet. Quisque et tortor erat. Cras at volutpat ipsum. Mauris pretium aliquet dui id euismod. Maecenas augue lectus, convallis ut tellus et, tempus varius ante. Duis sit amet est molestie, tempor felis eu, hendrerit magna. Nam nisi massa, tincidunt at lorem at, interdum accumsan erat. Aenean a tortor orci. Fusce accumsan sit amet orci lacinia vulputate. Mauris ut velit egestas, fringilla mauris sit amet, efficitur nunc.</p>
				<div class="row-new">
					<div class="bg-dark">
						<div>
							<div class="card">
								<h3 class="card-header">Inicjatywa</h3>
								<div class="card-body bg-white">
									<p>Fusce facilisis nec massa vitae pulvinar. Etiam tincidunt nulla purus, quis blandit urna sagittis eu. Quisque pharetra luctus volutpat. Donec sem quam, aliquet sed pretium in, tristique eget velit.</p>
									<g-link :to="`/program/Inicjatywa-obywatelska`" class="btn btn-dark">Więcej</g-link>
								</div>
							</div>
						</div>
						<div>
							<div class="card">
								<h3 class="card-header">Weto</h3>
								<div class="card-body bg-white">
									<p>In at odio ipsum. Fusce posuere est mauris, sit amet sagittis metus vestibulum eu. Aenean iaculis dictum ipsum. Nulla facilisi. Praesent interdum tortor in rhoncus sollicitudin. Cras et semper orci.</p>
									<g-link :to="`/program/Weto-obywatelskie`" class="btn btn-dark">Więcej</g-link>
								</div>
							</div>
						</div>
						<div>
							<div class="card">
								<h3 class="card-header">Kontrola sądownictwa</h3>
								<div class="card-body bg-white">
									<p>Proin vitae porttitor erat, sed dignissim sapien. In imperdiet dolor felis, id hendrerit odio commodo nec. Maecenas arcu metus, ultricies quis diam ut, auctor vulputate odio. Praesent viverra lectus eu interdum viverra.</p>
									<g-link :to="`/program/Obywatelska-kontrola-sądownictwa`" class="btn btn-dark">Więcej</g-link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div><g-link :to="`/program`" class="btn btn-dark btn-lg">Przeczytaj cały program</g-link></div>
			</section>

			<section id="zespół" class="container-fluid epic">
				<h2>Nasz zespół</h2>
				<div class="carousel">
					<div class="carousel-inner">
						<div class="carousel-item" v-for="person in people" :key="person.path">
							<div class="card bg-dark flex-row-md">
								<img v-if="person.image" :src="person.image" style="width: 300px; margin-right: 1px;">
								<div class="flex-grow-1">
									<h3 class="card-header">{{person.name}}</h3>
									<div class="card-body bg-white flex-grow-1">
										<div v-html="person.content_html"></div>
										<div class="flex-row">
											<g-link :to="person.path" class="btn btn-dark">Więcej</g-link>
											<a v-if="person.facebook_url" :href="person.facebook_url" class="btn btn-dark"><i class="fa fa-facebook"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="blog" class="container-fluid epic">
				<h2>Blog</h2>
				<div class="row-new">
					<div class="bg-dark">
						<div v-for="post in posts" :key="post.id">
							<div class="card">
								<h3 class="card-header">{{post.name}}</h3>
								<div class="card-body bg-white">
									<div v-html="post.lead"></div>
									<g-link :to="post.path" class="btn btn-dark">Więcej</g-link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div><g-link :to="`/blog/2`" class="btn btn-dark">Starsze wpisy</g-link></div>
			</section>

			<section id="kontakt" class="container-fluid epic">
				<h2>Kontakt</h2>
				<div class="row-new">
					<div>
						<div>
							<div>
								<p><strong>Demokracja Bezpośrednia</strong><br>ul. Nowolipki 14/130,<br>01-019 Warszawa</p>
								<p><a href="mailto:kontakt@db.org.pl">kontakt@db.org.pl</a></p>
								<p>EwP 322<br>NIP 5213636084<br>REGON 146281388</p>
							</div>
						</div>
						<div>
							<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDemokracjaBezposrednia%2F&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" width="340" height="214" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
						</div>
					</div>
				</div>
			</section>

			<section id="wspieraj" class="container-fluid epic">
				<h2>Wspieraj Demokrację Bezpośrednią</h2>
				<p>In ipsum ipsum, mattis non massa at, pellentesque cursus mi. Sed ultricies luctus hendrerit. Quisque id orci neque. Etiam id consectetur elit, semper sollicitudin mauris.</p>

				<div class="card bg-dark" style="max-width: 600px; width: 100%;">
					<h3 class="card-header">Wpłać darowiznę</h3>
					<div class="card-body bg-white">
						<p>Nasze konto:</p>
						<p><strong>Demokracja Bezpośrednia</strong><br>ul. Nowolipki 14/130, 01-019 Warszawa<br>83 2490 0005 0000 4530 3239 9304</p>
						<p>Zachęcamy do ustawienia stałego, comiesięcznego przelewu - dzięki temu cały czas będziemy mieć środki na działanie.</p>
					</div>
				</div>
				<form class="card bg-dark" style="max-width: 600px; width: 100%;">
					<h3 class="card-header">Zaangażuj się</h3>
					<div class="card-body bg-white">
						<div class="form-grid">
							<div class="form-row">
								<div class="col">
									<input type="text" class="form-control" placeholder="Imię">
								</div>
								<div class="col">
									<input type="text" class="form-control" placeholder="Nazwisko">
								</div>
							</div>
							<div class="form-row">
								<div class="col">
									<input type="text" class="form-control" placeholder="Telefon">
								</div>
								<div class="col">
									<input type="text" class="form-control" placeholder="E-mail">
								</div>
								<div class="col">
									<input type="text" class="form-control" placeholder="Kod pocztowy">
								</div>
							</div>
							<div style="text-align: left;">
								<div class="form-row">
									<div class="col">
										<div class="custom-control custom-radio">
											<input type="radio" id="organizacja-spotkań" name="typ-pomocy" class="custom-control-input">
											<label class="custom-control-label" for="organizacja-spotkań">Organizacja spotkań</label>
										</div>
									</div>
									<div class="col">
										<div class="custom-control custom-radio">
											<input type="radio" id="udział-w-akcjach-ulicznych" name="typ-pomocy" class="custom-control-input">
											<label class="custom-control-label" for="udział-w-akcjach-ulicznych">Udział w akcjach ulicznych</label>
										</div>
									</div>
								</div>
								<div class="form-row">
									<div class="col">
										<div class="custom-control custom-radio">
											<input type="radio" id="zarządzanie-social-media" name="typ-pomocy" class="custom-control-input">
											<label class="custom-control-label" for="zarządzanie-social-media">Pomoc w zarządzaniu social media</label>
										</div>
									</div>
									<div class="col">
										<div class="custom-control custom-radio">
											<input type="radio" id="kreacja" name="typ-pomocy" class="custom-control-input">
											<label class="custom-control-label" for="kreacja">Kreacja / grafika / produkcja filmów</label>
										</div>
									</div>
								</div>
								<div class="form-row">
									<div class="col">
										<div class="custom-control custom-radio">
											<input type="radio" id="badania-i-analizy" name="typ-pomocy" class="custom-control-input">
											<label class="custom-control-label" for="badania-i-analizy">Badania i analizy</label>
										</div>
									</div>
									<div class="col">
										<div class="custom-control custom-radio">
											<input type="radio" id="przygotowywanie-publikacji" name="typ-pomocy" class="custom-control-input">
											<label class="custom-control-label" for="przygotowywanie-publikacji">Przygotowywanie publikacji</label>
										</div>
									</div>
								</div>
								<div class="form-row">
									<div class="col">
										<div class="custom-control custom-radio">
											<input type="radio" id="zarządzanie-bazami-danych" name="typ-pomocy" class="custom-control-input">
											<label class="custom-control-label" for="zarządzanie-bazami-danych">Zarządzanie bazami danych / CRM</label>
										</div>
									</div>
									<div class="col">
										<div class="custom-control custom-radio">
											<input type="radio" id="wsparcie-it" name="typ-pomocy" class="custom-control-input">
											<label class="custom-control-label" for="wsparcie-it">Wsparcie IT</label>
										</div>
									</div>
								</div>
							</div>
							<div>
								<textarea class="form-control" placeholder="Kilka zdań o Tobie, Twoich doświadczeniach i umiejętnościach" rows="4"></textarea>
							</div>
							<div>
								<button type="submit" class="btn btn-dark">Zaangażuj się!</button>
							</div>
						</div>
					</div>
				</form>
			</section>
		</main>
	</Layout>
</template>

<page-query>
query ($page: Int) {
	allArticle(perPage: 5, page: $page) @paginate {
		pageInfo {
			totalPages
			currentPage
		}
		edges {
			node {
				id
				name
				lead
				path
			}
		}
	}

	allPerson {
		edges {
			node {
				path
				name
				image
				facebook_url
				content_html
			}
		}
	}
}
</page-query>

<script>
export default {
	computed: {
		posts() {
			return this.$page?.allArticle.edges?.map(e => e.node)
		},
		people() {
			return this.$page?.allPerson.edges?.map(e => e.node)
		},
	},
	mounted() {
		setTimeout(() => {
			const element = document.getElementById(decodeURIComponent(location.hash.substr(1)))
			console.log('scroll to', location.hash, element)
			if (element) {
				window.scrollTo(0, element.offsetTop)
			}
		}, 1000)

		for (const carousel of document.getElementsByClassName('carousel-inner')) {
			const itemCount = carousel.getElementsByClassName('carousel-item').length

			const itemWidth = () => parseInt(window.getComputedStyle(carousel.getElementsByClassName('carousel-item')[0]).width)
			const position = () => carousel.scrollLeft / itemWidth()
			const setPosition = (position) => carousel.scrollTo({left: ((itemCount + position) % itemCount) * itemWidth(), behavior: 'smooth'})

			const prev = document.createElement('a')
			prev.classList.add('carousel-control-prev')
			prev.role = 'button'
			const prevIcon = document.createElement('span')
			prevIcon.classList.add('carousel-control-prev-icon')
			prev.appendChild(prevIcon)
			prev.addEventListener('click', () => setPosition(position() - 1))
			carousel.parentNode.appendChild(prev)

			const next = document.createElement('a')
			next.classList.add('carousel-control-next')
			next.role = 'button'
			const nextIcon = document.createElement('span')
			nextIcon.classList.add('carousel-control-next-icon')
			next.appendChild(nextIcon)
			next.addEventListener('click', () => setPosition(position() + 1))
			carousel.parentNode.appendChild(next)

			if (0) {
				const indicators = document.createElement('ol')
				indicators.classList.add('carousel-indicators')
				for (let i = 0; i < itemCount; ++i) {
					const indicator = document.createElement('li')
					indicator.addEventListener('click', () => setPosition(i))
					indicators.appendChild(indicator)
				}
				carousel.parentNode.appendChild(indicators)
			}
		}
	},
}
</script>
