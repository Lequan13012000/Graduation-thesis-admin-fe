<template>
    <div class="m-toast-msg active">
        <div class="m-toast-content">
            <div class="icon-toast ">
                <img class="w-[24px] h-[24px]" src="../../assets/icons/tick.png" alt="">
            </div>

            <div class="m-toast-mesage">{{ mesage }}</div>
            <!-- <i class="fas fa-times" style="color:red"  @click="$emit('closeToast')"></i> -->
        </div>
    </div>
</template>
<script>
export default {
    props: ["mesage"]
}
</script>
<style scoped>
.m-toast-msg {
    position: fixed;
    right: 20px;
    top: 60px;
    max-width: 300px;
    padding: 4px;
    animation-name: example;
    animation-duration: 0.3s;
}

@keyframes example {
    0% {
        right: -200px;
        top: 60px
    }
}

.m-toast-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    max-width: 280px;
    margin: 4px 0;
    background-color: #39CB7F;
    padding: 20px;
    border-radius: 8px;
}

.m-toast-content .icon-toast {
    width: 32px;
    height: 32px;
    background-color: #FFFFFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.m-toast-content .m-toast-mesage {
    color: #FFFFFF;
    line-height: 24px;
    font-weight: 600;
    margin-left: 4px;
}

.m-toast-content i {
    font-size: 24px;
}
</style>