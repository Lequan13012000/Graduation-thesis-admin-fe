<template>
    <div class="navbar">
        <div class="logo">
            <img src="../../assets/image/logo.png" alt="">
        </div>
        <div class="navbar-items">
            <!-- <div class="text-[#FFFFFF] pl-3">Quản lý</div> -->
            <router-link to="/dashboarch" class="navbar-item" :class="{ 'navbar-active': getPath == 'dashboarch' }">
                <i class="fas fa-chart-line"></i>
                <span>Trang chủ</span>
            </router-link>
            <router-link to="/category" class="navbar-item" :class="{ 'navbar-active': getPath == 'category' }">
                <i class="fas fa-grip-lines"></i>
                <span>Danh mục</span>
            </router-link>
            <router-link to="/product" class="navbar-item" :class="{ 'navbar-active': getPath == 'product' }">
                <i class="fas fa-store"></i>
                <span>Hàng hóa</span>
            </router-link>
            <router-link to="/customer" class="navbar-item" :class="{ 'navbar-active': getPath == 'customer' }">
                <i class="fas fa-users"></i>
                <span>Khách hàng</span>
            </router-link>
            <router-link to="/order" class="navbar-item" :class="{ 'navbar-active': getPath == 'order' }">
                <i class="fas fa-shopping-cart"></i>
                <span>Đơn hàng</span>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        getPath() {
            return this.$route.path.replace(/\//g, "");
        },
    },
}
</script>
<style scoped>
.navbar {
    background-color: #11142D;
    left: 0px;
    z-index: 1008;
    transform: translateX(0%);
    position: fixed;
    height: calc((100% - 0px) - 0px);
    top: 0px;
    bottom: 0px;
    width: 256px;
}

.logo {
    height: 150px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
}

.navbar-item {
    display: block;
    opacity: 0.8;
    height: 48px;
    padding: 4px 12px;
    display: flex;
    gap: 24px;
    align-items: center;
    padding-left: 1.5rem;
    margin: 0 16px;
    border-radius: 8px;
}


.navbar-item span {
    color: #fff;
    font-size: 14px;
}

.navbar-item:hover {
    text-decoration: none;
    background-color: #64463d;
}

.navbar-active {
    opacity: 1;
    background-color: #F15B2B;
    color: #fff;
    cursor: pointer;
}
</style>