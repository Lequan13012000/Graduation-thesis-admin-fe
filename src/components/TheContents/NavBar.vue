<template>
    <div class="navbar">
        <div class="logo">
            <img src="../../assets/image/logo.png" alt="">
        </div>
        <div class="navbar-items">
            <router-link to="/dashboarch" class="navbar-item">
                <i class="fas fa-chart-line"></i>
                <span>Trang chủ</span>
            </router-link>
            <router-link to="/category" class="navbar-item">
                <i class="fas fa-grip-lines"></i>
                <span>Danh mục</span>
            </router-link>
            <router-link to="/product" class="navbar-item">
                <i class="fas fa-store"></i>
                <span>Hàng hóa</span>
            </router-link>
            <router-link to="/customer" class="navbar-item">
                <i class="fas fa-users"></i>
                <span>Khách hàng</span>
            </router-link>
            <router-link to="/order" class="navbar-item">
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
}
</script>
<style scoped>
.navbar {
    /* display: flex;
    flex-direction: column; */
    background-color: #11142D;
    /* min-width: 250px;
    max-width: 250px;
    min-height: 700px;
    height: 100vh; */
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
    height: 60px;
    padding: 4px 12px;
    display: flex;
    gap: 24px;
    align-items: center;
    padding-left: 1.5rem;
}


.navbar-item span {
    color: #fff;
}

.navbar-item:hover {
    opacity: 1;
    background-color: #f07a53;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
}

.navbar-item:focus {
    opacity: 1;
    background-color: #F15B2B;
    color: #fff;
    cursor: pointer;
}</style>