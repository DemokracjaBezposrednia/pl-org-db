<template>
	<div>
		<div class="bg-dark" style="height: 20px;"></div>

		<nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
			<div class="container-fluid">
				<a class="navbar-brand" href="/#">
					<span>Demokracja</span>
					<span>Bezpośrednia</span>
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbar-content">
					<ul class="navbar-nav flex-grow-1 justify-content-center">
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Polska 2020</a>
							<div class="dropdown-menu" aria-labelledby="dropdown01">
							<a class="dropdown-item" href="#">Pracodawcy</a>
							<a class="dropdown-item" href="#">Pracownicy</a>
							</div>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/#nowe-reguły-gry">Nowe reguły gry</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/#zespół">Nasz zespół</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/#blog">Blog</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/#kontakt">Kontakt</a>
						</li>
					</ul>
					<a class="btn btn-light" href="/#wspieraj">Wspieraj</a>
				</div>
			</div>
		</nav>

		<div class="bg-dark" style="height: 20px;"></div>

		<slot/>
	</div>
</template>

<style lang="scss">
@import "../theme/theme.scss";
</style>
