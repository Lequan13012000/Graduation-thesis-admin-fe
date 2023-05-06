<template>
    <div class="m-loader">
        <span class="loader"></span>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.m-loader {
    position: fixed;
    inset: 0;
    /* background-color: rgba(0, 0, 0, 0.2); */
}

.loader {
    position: absolute;
    top: 50%;
    right: 45%;
    border: 5px solid #39CB7F;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    width: 32px;
    height: 32px;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>