<template>
    <div class="base-view">
        <div class="card">
            <div class="card-item">
                <div class="card-item-header">
                    <div class="card-item-header-title">{{ title }}</div>
                    <button class="button flex items-center gap-x-1" @click="$emit('add')" v-if="!noAdd"><img
                            src="../../assets/icons/add.svg" alt="">Tạo Mới</button>
                </div>
                <div class="card-item-content">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th v-for="(item, index) in tableheader" :key="index + item.name">{{ item.name }}</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tr, index) in items" :key="index + tr.name">
                                <td class="text-sm">{{ index + (page - 1) * 10 + 1 }}</td>
                                <td v-for="(td, index) in tableheader" :key="index + td.id">
                                    <span v-if="td.id == 'description'" v-html="tr[td.id]"></span>
                                    <span v-else>{{ tr[td.id] }}</span>
                                </td>
                                <td style="text-align:left; width:200px;padding-left: 0;">
                                    <button class="" title="Sửa thông tin"><i
                                            class="fa fa-edit text-[#99ABB4] font-normal text-sm"
                                            @click="$emit('edit', tr)"></i></button>
                                    <button class="" title="Xem chi tiết"><i class="fa fa-eye text-[#F15B2B] text-sm"
                                            @click="$emit('detail', tr)"></i></button>
                                    <button class="" title="Xóa bản ghi"><i class="fa fa-trash text-[#FC4B6C] text-sm"
                                            @click="$emit('delete', tr)"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["title", "tableheader", "items", "noAdd", "page"]
}
</script>
<style scoped>
.base-view {
    /* width: 100%; */
    overflow: hidden;
    padding-bottom: 24px;
}

.card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.view-title {
    font-size: 30px;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
}

.card-item {
    /* background-color: #fff;
    border-radius: 8px;
    padding: 32px; */
}

.card-item-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0 0 6px 0;
}

.card-item-header-title {
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 27px;
    color: #11142D;

}

.card-item-content {
    display: flex;
    gap: 12px;
}

.card-item-content input {
    width: 400px;
}

table {
    width: 100%;
}

table tr {
    height: 50px;
    border-bottom: 1px solid #ECF0F2;
    transition: all linear .3s;
}

table tr:hover {
    /* background: #eee; */
}

table th {
    min-width: 120px;
    padding: 0 12px;
    text-align: left;
    color: #99ABB4;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
}

table td {
    padding: 0 12px;
    width: auto;
}

table td span {
    font-size: 14px;
}


table button {
    min-width: 40px;
    width: 40px;
    margin: 0 6px;
    padding: 0;
    text-align: center;
}
</style>