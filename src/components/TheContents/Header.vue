<template>
    <div class="header">
        <div class="account cursor-pointer relative pt-3" @click="showLogOut">
            <img src="../../assets/image/avatar.png" alt="">
            <p class="text-[#11142D] text-base"><strong class="text-[#777E89]">Hi</strong>, Admin</p>
            <img class="w-[12px] h-[12px]" src="../../assets/icons/chevron-down 2.svg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        showLogOut() {
            this.$store.commit("TOGGLE_LOGOUT");
        }
    }
}
</script>
<style scoped>
.header {
    height: 48px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    gap: 24px;
    padding: 0 48px;
    background: #f4f6f9;
    top: 0px;
    z-index: 1006;
    transform: translateY(0%);
    left: 256px;
}

.account {
    display: flex;
    align-items: center;
    gap: 12px;
}

.account img {
    /* width: 36px;
    height: 36px;
    border-radius: 100%; */
}
</style>