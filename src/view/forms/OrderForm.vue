<template>
    <div class="form-container">
        <div class="form-content">
            <div class="form-header">
                <div class="form-title">{{ titleHeader }}</div>
            </div>

            <div class="form-body">
                <div class="form-body-item">
                    <div class="w-1/2">
                        <div class="label">Họ tên người nhận<span style="color:red"> * </span>:</div>
                        <div class="value">
                            <input type="text" class="input" v-model="order.name" disabled>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="label">Số điện thoại:</div>
                        <div class="value">
                            <input type="text" class="input" v-model="order.tel" disabled>
                        </div>
                    </div>
                </div>
                <div class="form-body-item">
                    <div class="w-1/2">
                        <div class="label">Địa chỉ nhận:</div>
                        <div class="value">
                            <input type="text" class="input" v-model="order.address" disabled>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="label">Ngày đặt:</div>
                        <div class="value" style="padding-top:6px">
                            <input type="text" class="input" v-model="order.order_date" disabled>
                        </div>
                    </div>
                </div>
                <div class="form-body-item">
                    <div class="w-1/2">
                        <div class="label">Trạng thái:</div>
                        <div class="value">
                            <vue-single-select v-if="false" placeholder="Chọn 1 trạng thái" max-height="100px"
                                v-model="order.status" :options="options" :required="true"
                                :disabled="true"></vue-single-select>
                            <md-field>
                                <md-select :disabled="isDetail" v-model="order.status" name="font" id="font">
                                    <div v-for="(item, index) in options" :key="index">
                                        <md-option :value="item">{{ item }}</md-option>
                                    </div>
                                </md-select>
                            </md-field>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="label">Ghi chú:</div>
                        <div class="value">
                            <input type="text" class="input" v-model="order.notes" disabled>
                        </div>
                    </div>
                </div>
                <div class="px-3" v-if="isDetail">
                    <div class="label">Chi tiết đơn hàng:</div>
                    <div class="value">
                        <table>
                            <thead>
                                <tr>
                                    <th style="text-align: center">STT</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th style="text-align: center">Số lượng</th>
                                    <th>Giá bán</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in orderDetails" :key="index + item.name">
                                    <td style="text-align: center">{{ index + 1 }}</td>
                                    <td><img :src="item.image" alt=""></td>
                                    <td>{{ item.name }}</td>
                                    <td style="text-align: center">{{ item.quantity }}</td>
                                    <td>{{ item.price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="form-footer">
                <button class="button bg-[#FFFFFF] text-[#777E89] border-solid border-[#777E89]"
                    @click="$emit('close')">Đóng</button>
                <button class="button bg-[#F15B2B]" v-if="this.statusData == 0" @click="addItem()">Thêm mới</button>
                <button class="button bg-[#39CB7F]" v-if="this.statusData == 1" @click="updateItem()">Cập nhật</button>
            </div>
        </div>
        <ErrorPopup :title="message" @close="close" v-if="hasError"></ErrorPopup>
    </div>
</template>
<script>
import api from '@/js/api'
import ErrorPopup from '@/components/Bases/BasePopup/ErrorPopup'
import VueSingleSelect from "vue-single-select";
export default {
    props: ["title", "status", "item"],
    components: { ErrorPopup, VueSingleSelect },
    data() {
        return {
            isAdd: true,
            editorConfig: {},
            isDetail: false,
            data: this.item,
            statusData: this.status,
            order: {
                id: 0,
                cus_id: 0,
                order_date: "",
                status: "",
                notes: "",
                address: "",
                tel: "",
                name: ""
            },
            orderDetails: [],
            message: "",
            hasError: false,
            options: [
                'Đang chờ xác nhận',
                'Đang chờ xử lý',
                'Đang giao hàng',
                'Đã giao hàng',
                'Bị từ chối'
            ]
        }
    },
    created() {
        if (this.status == 1) {
            this.isAdd = true
        }
        if (this.status == 1) {
            this.isAdd = false
            this.order = this.data;
        }
        if (this.status == 2) {
            this.isAdd = false
            this.order = this.data;
            this.isDetail = true
        }
        this.getDetailOrders();
    },
    computed: {
        titleHeader() {
            if (this.statusData == 0) {
                return "Thêm " + this.title
            }
            if (this.statusData == 1) {
                return "Sửa " + this.title
            }
            if (this.statusData == 2) {
                return "Xem chi tiết " + this.title
            }
            return ""
        },

    },
    methods: {
        getDetailOrders() {
            this.$axios.get(`${api.OrderDetailApi}/${this.order.id}`).then(res => {
                this.orderDetails = res.data;
            }).catch(() => {
                this.message = "Có lỗi xảy ra, vui lòng kiểm tra lại."
                this.hasError = true
            })
        },
        getNewItem() {
            return {
                id: 0,
                cus_id: 0,
                order_date: "",
                status: "",
                notes: "",
                address: "",
                tel: "",
                name: ""
            }
        },
        statusAdd() {
            this.order = this.getNewItem();
            this.isDetail = false;
            this.statusData = 0;
        },
        statusEdit() {
            this.order = this.data;
            this.isDetail = false;
            this.statusData = 1;
        },
        statusDetail() {
            this.order = this.data;
            this.isDetail = true;
            this.statusData = 2;
        },
        addItem() {
            if (!this.order.name) {
                this.message = "Tên người nhận không được để trống."
                this.hasError = true
                return
            }
            this.$axios.post(api.OrderApi, this.order).then(() => {
                this.$emit("close");
                this.$emit("success");
            })
                .catch(() => {
                    this.message = "Có lỗi xảy ra, vui lòng kiểm tra lại.";
                    this.hasError = true;
                })
        },
        updateItem() {
            if (!this.order.name) {
                this.message = "Tên người nhânh không được để trống."
                this.hasError = true
                return
            }
            this.$axios.put(`${api.OrderApi}/${this.order.id}`, this.order).then(() => {
                this.$emit("close");
                this.$emit("success");
            })
                .catch(() => {
                    this.message = "Có lỗi xảy ra, vui lòng kiểm tra lại.";
                    this.hasError = true;
                })
        },
        close() {
            this.hasError = false;
        }
    }
}
</script>
<style scoped>
.form-container {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-content {
    background: #fff;
    border-radius: 8px;
    min-width: 800px;
    height: 420px;
    overflow: hidden;
}

.form-header {
    height: 40px;
    display: flex;
    justify-content: center;
    padding: 32px 0;
    align-items: center;
}

.form-title {
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 27px;
    color: #11142D;
}

.form-action {
    display: flex;
    gap: 12px;
}

.form-action-icon {
    display: flex;
    gap: 12px;
}

i {
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
}

i:hover {
    cursor: pointer;
    background: #fff;
}

.active {
    background: #fff;
}

.form-body {
    margin: 6px 0;
    overflow: auto;
    height: 280px;
    padding: 0 16px;
}

.form-body-item {
    padding: 6px 12px;
    display: flex;
    align-items: center;
    column-gap: 24px;
}

.label {
    font-size: 14px;
    font-weight: 600;
    padding: 6px 0;
}

.form-body-item .input {
    width: 100%;
}

.form-footer {
    width: 100%;
    padding-bottom: 24px;
    padding-top: 12px;
    display: flex;
    justify-content: center;
    justify-items: center;
    gap: 12px;
}

.search-input {
    outline: none;
}

::-webkit-scrollbar {
    appearance: none;
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background: #777E89;
    border-radius: 25px;
}

table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    width: 100%;
}

table tr:nth-child(2n) {
    background: #eee;
}

table th {
    height: 40px;
    line-height: 40px;
    padding: 4px 12px;
    background: #ccc;
    text-align: left;
}

table img {
    width: 36px;
    height: 36px;
    border-radius: 100%;
}

table td {
    height: 40px;
    line-height: 40px;
    padding: 4px 12px;
    text-align: left;
}

table input {
    width: 100px;
    outline: none;
    border: 1px solid #333;
    background-color: #fff;
    color: #000;
    border-radius: 4px;
    padding: 2px;
}

table input:focus {
    border: 1px solid #3daa12;
}

.md-field {
    margin: 0;
    padding: 0;
    min-height: 40px;
}
</style>