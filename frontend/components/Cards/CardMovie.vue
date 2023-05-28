<template>
  <a class="v-cardMovie" :href="link">
    <img 
        class="v-cardMovie__image" 
        v-if="imageSrc" 
        :src="imageSrc"/>
    {{ title }}
  </a>
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
}

.v-cardMovie__image {
    width: 10rem;
}
</style>