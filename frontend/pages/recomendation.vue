<template>
  <div class="wrapper">
    <h2>Возможно, вам будет интересно</h2>
    <MovieCardsContainer :movies="moviesList" />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserDataStore } from '@/store/userData';

import MovieCardsContainer from '@/components/MovieCardsContainer.vue';
export default {
	components: { MovieCardsContainer },
	data() {
		return {
			moviesList: [],
		};
	},
  computed: {
    ...mapState(useUserDataStore, ['username'])
  },
	async mounted() {
		const apiUrl = `http://localhost:27017/api/recommendations/${this.username}`;
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

<style>

</style>