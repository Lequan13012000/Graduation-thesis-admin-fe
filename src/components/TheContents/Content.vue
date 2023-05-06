<template>
    <div class="content">
        <Header></Header>
        <router-view class="base-view"></router-view>
    </div>
</template>
<script>
import Header from './Header'
export default {
    components: {
        Header,
    }
}
</script>
<style scoped>
.content {
    width: 100%;
    margin-left: 256px;
}

.base-view {
    overflow: scroll;
    height: 100vh;
}
</style>