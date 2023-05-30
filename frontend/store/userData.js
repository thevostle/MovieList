import { defineStore } from 'pinia';

export const useUserDataStore = defineStore({
	id: 'userData',
	state: () => {
		return {
			username: 'gw'
		};
	},
	actions: {
		setUser(username) {
			this.username = username;
		},
	},
	getters: {
		getUsername: (state) => state.username,
	},
});
