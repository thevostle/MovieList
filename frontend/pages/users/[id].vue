<template>
  <div class="wrapper">
    <div class="userProfile">
        <div class="userProfile__userDataContainer">
            <div class="userProfile__userDataName">{{ username ?? 'null' }}</div>
        </div>
        <div class="userProfile__watchedMoviesWrapper">
            <h2 class="userProfile__watchedMoviesSectionTitle">Просмотренные фильмы</h2>
            <div class="userProfile__watchedMoviesContainer">
                <div class="userProfile__watchedMovieWrapper">
                  <div class="userProfile__watchedMovieTitleWrapper">
                    <div class="userProfile__watchedMovieIndex">id</div>
                    <div class="userProfile__watchedMovieTitle">Название</div>
                  </div>
                  <div class="userProfile__watchedMovieRating">Оценка</div>
                </div>
                <div class="userProfile__watchedMovieWrapper" v-for="(movie, index) in movies" :key="index">
                  <div class="userProfile__watchedMovieTitleWrapper">
                    <div class="userProfile__watchedMovieIndex">{{ index + 1 }}</div>
                    <NuxtLink class="userProfile__watchedMovieTitle" :to="`/movies/${movie.movieId._id}`">{{ movie.movieId.title }}</NuxtLink>
                  </div>
                  <div class="userProfile__watchedMovieRating">{{ movie.rating }}</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      username: "",
    }
  },
  async mounted() {
    const username = this.$route.fullPath.split('/').at(-1)
    this.username = username
    const apiUrl = `http://localhost:27017/api/watch/${ username }`;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

    console.log(apiUrl)
    
    try {
			const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
				const data = await response.json();
        this.movies = data.watchedMovies

        console.log(data)
      }
    } catch (error) {
			console.log(error);
		}
  }
}
</script>

<style>
.userProfile__userDataContainer {
  margin-bottom: 2rem;
  font-size: 1.6rem;
}
.userProfile__watchedMoviesSectionTitle {
  margin-bottom: 2rem;
  font-size: 1.4rem;
}
.userProfile__watchedMoviesContainer {
  display: flex;
  flex-direction: column;
  width: 30%;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem 2rem;
  gap: 0.6rem;
}
.userProfile__watchedMovieWrapper {
  display: flex;
  justify-content: space-between;
}
.userProfile__watchedMovieTitleWrapper {
  display: flex;
}
.userProfile__watchedMovieIndex {
  margin-right: 2rem;
}

.userProfile__watchedMovieRating {
  text-align: right;
}
</style>