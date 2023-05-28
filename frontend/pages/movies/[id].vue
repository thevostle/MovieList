<template>
	<div class="wrapper">
		<div class="movieInfo__wrapper">
			<div class="movieInfo__wrapperMain">
				<img class="movie__posterImage" v-if="imageSrc" :src="imageSrc" />
				<h1 class="movieTitle">{{ title }}</h1>
				<div class="userRatingSelectorWrapper">
					<div class="userRatingSelector">
						<span class="userRatingSelector__valueByWords">{{ getRatingAsText }}</span>
						<input type="number" min="0" max="10" class="userRatingSelector__numberInput" v-model="userRating" />
					</div>
					<VButton @click="setUserRating">Сохранить</VButton>
				</div>
			</div>
			<div class="movieInfo__wrapperAdditional">
				<div class="movieGenresList">
					<div class="movieGenreItem" v-for="genre in genres" :key="genre">{{ genre }}</div>
				</div>
				<div class="movieDescription">{{ description }}</div>
				<div class="movieReleaseYear">Год выхода: {{ releaseYear }}</div>
				<div class="movieAgeRestriction">Возрастное ограничение: {{ ageRestriction }}</div>
				<div class="directorsList">
					Авторы
					<div class="directorItem" v-for="director in directors" :key="director">{{ director }}</div>
				</div>
				<div class="countriesList">
					Страны
					<div class="countriesItem" v-for="country in countries" :key="country">{{ country }}</div>
				</div>
			</div>
			<div class="movieInfo__wrapperExtra">
				<div class="movieRating">
					<div class="movieRating__value">
						{{ movieRating }}
					</div>
					<div class="movieRating__indicator" :class="getRatingClass"></div>
				</div>
				<div class="movieRatingCount">оценок пользователей: {{ movieRatingCount }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: 'test',
			description:
				'abobaaboba abobaabobaabobaaboba abobaabobaaboba abobaabobaaboba abobaabobaabobaabobaaboba abobaabobaaboba abobaabobaabobaabobavabobaaboba',
			releaseYear: 1999,
			movieRating: 8.8,
			movieRatingCount: 57001,
			ageRestriction: 'R+',
			imageSrc: '/images/logo.png',
			genres: [],
			directors: [],
			countries: [],
			filmId: null,
			userRating: 0,
		};
	},
	async mounted() {
		const movieId = this.$route.fullPath.split('/').at(-1)
		console.log(movieId)
		const apiUrl = `http://localhost:27017/api/movies/${movieId}`;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		try {
			const response = await fetch(apiUrl, requestOptions);

			if (response.ok) {
				const data = await response.json();
				this.title = data.title;
				this.description = data.description;
				this.releaseYear = data.releaseYear;
				this.movieRating = data.movieRating ?? 10;
				this.movieRatingCount = data.movieRatingCount ?? 0;
				this.ageRestriction = data.ageRestriction ?? ''
				this.imageSrc = data.image ?? ''
				this.genres = data.genres ?? []
				this.directors = data.directors ?? []
				this.countries = data.countries ?? []
			}
		} catch (error) {
			console.log(error);
		}
	},
	computed: {
		getRatingClass() {
			if (this.movieRating >= 8) {
				return 'ratingGreat';
			}
			if (this.movieRating >= 6 && this.movieRating < 8) {
				return 'ratingGood';
			}
			return 'ratingBad';
		},
		getRatingAsText() {
			switch (this.userRating) {
				case 1:
					return 'Хуже некуда';
				case 2:
					return 'Ужасно';
				case 3:
					return 'Очень плохо';
				case 4:
					return 'Плохо';
				case 5:
					return 'Более-менее';
				case 6:
					return 'Нормально';
				case 7:
					return 'Хорошо';
				case 8:
					return 'Отлично';
				case 9:
					return 'Великолепно';
				case 10:
					return 'Эпик вин!';
			}
		},
	},
	methods: {
		async setUserRating() {
            alert('Оценка сохранена')
			await fetch('/');
		},
	},
};
</script>

<style lang="scss">
.movieInfo__wrapper {
	display: flex;
	gap: 4rem;

	@include tablets {
		flex-direction: column;
	}
}

.movieInfo__wrapperAdditional {
	width: 40rem;
}

.movieTitle {
	font-size: 2rem;
	margin-bottom: 2rem;
}

.movieDescription {
	font-size: 1.4rem;
	margin-bottom: 1.4rem;
}

.movieRating {
	background-color: rgba(0, 0, 0, 0.75);
	position: relative;
	border-radius: 12px;
	font-size: 3.6rem;
	font-weight: 700;

	.movieRating__indicator {
		position: absolute;
		height: 100%;
		width: 1rem;
		top: 0;
		right: 20px;

		&.ratingGreat {
			background-color: green;
		}

		&.ratingGood {
			background-color: orange;
		}

		&.ratingBad {
			background-color: red;
		}
	}

	.movieRating__value {
		margin: 1rem;
	}
}

.movie__posterImage {
	width: 20rem;
}

.userRatingSelector {
	width: 100%;
	display: flex;
	justify-content: space-between;
}

.movieGenresList {
	display: flex;
	gap: 0.6rem;
	margin-bottom: 2rem;
}

.movieAgeRestriction {
	margin-bottom: 2rem;
}

.movieReleaseYear {
	margin-bottom: 2rem;
}

.directorsList {
	margin-bottom: 2rem;
}
</style>
