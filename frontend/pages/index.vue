<template>
	<div class="wrapper">
		<h2>hello</h2>
		<MovieCardsContainer :movies="moviesList" />
	</div>
</template>

<script>
import MovieCardsContainer from '@/components/MovieCardsContainer.vue';
export default {
	components: { MovieCardsContainer },
	data() {
		return {
			moviesList: [],
		};
	},
	async mounted() {
		const apiUrl = 'http://localhost:27017/api/movies';
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		try {
			const response = await fetch(apiUrl, requestOptions);

			if (response.ok) {
				const data = await response.json();
				this.moviesList = data;
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	},
};
</script>

<style></style>
