// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['@/assets/styles/mainStyles.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/styles/global.scss";',
				},
			},
		},
	},
	modules: ['@nuxtjs/google-fonts'],
	googleFonts: {
		families: {
			Roboto: true,
			'Josefin+Sans': true,
			Lato: [100, 300],
			Raleway: {
				wght: [100, 400],
				ital: [100],
			},
		},
	},
});
