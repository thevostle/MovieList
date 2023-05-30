<template>
	<div class="wrapper">
		<div class="authPage">
			<div class="registerWrapper">
				<h2 class="authTitle">Авторизация</h2>
				<form class="authForm" action="" @submit.prevent="onSubmit">
					<input type="text" name="username" v-model="username" placeholder="Имя пользователя" />
					<button @click="registration">Войти</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserDataStore } from '@/store/userData';

export default {
	setup(props) {
		const router = useRouter();
		const storeUserData = useUserDataStore();

		const { getUsername } = storeToRefs(storeUserData);

		const { setUser } = storeUserData;

		const username = ref('');

		function registration() {
			saveUserData();
			onSubmit();
		}
		function saveUserData() {
			setUser(username.value);
			console.log(username.value);
		}
		async function onSubmit() {
            const apiUrl = `http://localhost:27017/api/users`;

            const newUser = {
                username: username.value
            }

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
			};
			try {
				const response = await fetch(apiUrl, requestOptions);

				if (response.ok) {
					const data = response.json();
                    router.push({ path: '/' });
				}
			} catch (error) {
				console.log(error);
			}
			
		}

		return { storeUserData, setUser, username, saveUserData, registration, onSubmit, getUsername };
	},
};
</script>

<style lang="scss">
.authPage {
	display: flex;
	justify-content: space-evenly;
}

.authTitle {
	margin-bottom: 1rem;
}

.authForm {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 20rem;

	input,
	button {
		padding: 0.6rem;
	}
}
</style>
