<template>
  <NuxtLink class="v-cardMovie" :to="link">
    <img 
        class="v-cardMovie__image" 
        :src="imageSrc ?? '/images/logo.png'"/>
    {{ title }}
  </NuxtLink>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
        },
        link: {
            type: String,
        },
        imageSrc: {
            type: String,
        },
    }
}
</script>

<style>
.v-cardMovie {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    color: white;
    text-decoration: none;
    width: 15rem;
}

.v-cardMovie__image {
    width: 100%;
}
</style>