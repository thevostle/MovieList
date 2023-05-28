<template>
    <button class="v-button"><slot/></button>
</template>

<style lang="scss">
.v-button {
    padding: 0.6rem 1.4rem;
    border-radius: 10px;
    border: 3px solid white;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
}
</style>

