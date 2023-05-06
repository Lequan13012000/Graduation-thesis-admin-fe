<template>
    <div class="content">
        <Header></Header>
        <div v-if="isLogOut" class="signout" @click="logout">
            <span>Đăng xuất</span>
        </div>
        <router-view class="base-view"></router-view>
    </div>
</template>
<script>
import Header from './Header'
export default {
    components: {
        Header,
    },
    methods: { 
        logout() {
            this.$store.commit("TOGGLE_ADMIN", "");
            this.$store.commit("TOGGLE_LOGOUT");
        },
    },
    computed: {
        isLogOut() {
            return this.$store.state.isLogOut;
        }
    }
}
</script>
<style scoped>
.signout {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2.5rem;
    z-index: 10000;
    right: 3rem;
    height: 32px;
    width: 100px;
    background-color: #fff;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 9px rgba(0, 0, 0, 0.06), 0px 3px 5px rgba(0, 0, 0, 0.07);
    border-radius: 4px;
}

.signout span {
    color: #F15B2B;
    font-size: 14px;
}

.signout:hover {
    opacity: 1;
    cursor: pointer;
}

.content {
    width: 100%;
    margin-left: 256px;
}

.base-view {
    overflow: scroll;
    height: 100vh;
}
</style>