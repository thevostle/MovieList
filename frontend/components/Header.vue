<template>
	<div class="v-header">
		<div class="v-headerContainer wrapper">
			<div class="v-header__logoWrapper">
				<img class="v-header__logoImage" src="/images/logo.png" alt="" />
				<NuxtLink v-if="getUsername" :to="`/users/${getUsername}`">{{ getUsername }}</NuxtLink>
			</div>
			<div class="v-header__linkContainer">
				<ul class="v-header__linkContainerList">
					<li v-for="link in links" :key="link.title">
						<NuxtLink :to="link.href" class="v-header__linkItem">{{ link.title }}</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useUserDataStore } from '@/store/userData'

export default {
	data() {
		return {
			links: [
				{
					title: 'Home',
					href: '/',
				},
				{
					title: 'About',
					href: '/about',
				},
				{
					title: 'Auth',
					href: '/auth',
				},
			],
		};
	},
	setup(props) {
		const storeUserData = useUserDataStore()
		const { getUsername } = storeToRefs(storeUserData)

    	return { getUsername }
	}
};
</script>

<style lang="scss">
.v-header {
	//background-color: var(--colorBackground);
	background-color: rgba(0, 0, 0, 0.75);
	color: white;
    margin-bottom: 4rem;
}

.v-headerContainer {
    display: flex;
    align-items: center;
    padding: 0.4rem 0;
    justify-content: space-between;
}

.v-header__logoWrapper {
    display: flex;
    align-items: center;
}

.v-header__logoImage {
	width: 4rem;
}

.v-header__linkContainerList {
	display: flex;
	gap: 1rem;
	list-style: none;
	width: fit-content;
	margin: 0 auto;
}

.v-header__linkItem {
	color: white;
	text-decoration: none;
}
</style>
