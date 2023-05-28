<template>
	<div class="v-movieCardsContainer">
		<CardMovie v-for="movie in movies" :key="movie.title" :title="movie.title" :href="`/movies/${movie._id}`" :imageSrc="movie.image" />
	</div>
</template>

<script>
import CardMovie from '@/components/Cards/CardMovie.vue';
export default {
	components: {
		CardMovie,
	},
	props: {
		movies: {
			type: Array,
			desc: 'массив карточек в формате: title, href, imageLink',
			default: [
				{
					title: 'test',
					href: '/movies/1',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 2',
					href: '/movies/1',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 3',
					href: '/movies/1',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 4',
					href: '/movies/1',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 5',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 6',
					href: '/',
					imageLink: '/images/logo.png',
				},
                {
					title: 'test',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 2',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 3',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 4',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 5',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 6',
					href: '/',
					imageLink: '/images/logo.png',
				},
                {
					title: 'test',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 2',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 3',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 4',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 5',
					href: '/',
					imageLink: '/images/logo.png',
				},
				{
					title: 'test 6',
					href: '/',
					imageLink: '/images/logo.png',
				},
			],
		},
	},
};
</script>

<style lang="scss">
.v-movieCardsContainer {
	display: grid;
    column-gap: 50px;
    row-gap: 50px;
    grid-template-columns: repeat(3, 1fr);
}
</style>
