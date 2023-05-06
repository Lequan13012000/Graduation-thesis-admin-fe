<template>
    <div class="popup-container" id="InfoPupup">
        <div class="popup-bg"></div>
        <div class="m-popup info-popup">
            <div class="popup-content">
                <img src="../../../assets/image/delete.svg" alt="">
                <div class="popup-text">{{ title }}</div>
            </div>
            <div class="popup-footer">
                <button class="button button-close" @click="$emit('close')">Hủy</button>
                <div class="list-button">
                    <button class="button bg-[#FC4B6C]" @click="$emit('yes')">Xóa</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url('../../../styles/bases/popup.css');
</style>
<script>
export default {
    props: ['title'],
    components: {
    },
}
</script>