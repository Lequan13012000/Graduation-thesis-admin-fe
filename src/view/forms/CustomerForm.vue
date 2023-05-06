<template>
    <div class="form-container">
        <div class="form-content">
            <div class="form-header">
                <div class="form-title">{{ titleHeader }}</div>
            </div>
            <div class="form-body">
                <div class="form-body-item">
                    <div class="w-1/2">
                        <div class="label">Email<span style="color:red"> * </span>:</div>
                        <div class="value">
                            <input type="text" class="input" v-model="customer.email" :disabled="isDetail">
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="label">Mật khẩu<span style="color:red"> * </span>:</div>
                        <div class="value">
                            <input type="text" class="input w-full" v-model="customer.password" :disabled="isDetail">
                        </div>
                    </div>
                </div>
                <div class="form-body-item">
                    <div class="w-1/2">
                        <div class="label">Tên khách hàng<span style="color:red"> * </span>:</div>
                        <div class="value">
                            <input type="text" class="input" v-model="customer.name" :disabled="isDetail">
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="w-full">
                            <div class="label">Số điện thoại:</div>
                            <div class="value">
                                <input type="text" class="input" v-model="customer.tel" :disabled="isDetail">
                            </div>
                        </div>

                    </div>
                </div>
                <div class="px-3">
                    <div class="label">Địa chỉ:</div>
                    <div class="value">
                        <input type="text" class="input w-full" v-model="customer.address" :disabled="isDetail">
                    </div>
                </div>
            </div>
            <div class="form-footer">
                <button class="button bg-[#FFFFFF] text-[#777E89] border-solid border-[#777E89]"
                    @click="$emit('close')">Đóng</button>
                <button class="button bg-[#F15B2B]" v-if="this.statusData == 0" @click="addItem()">Lưu</button>
                <button class="button bg-[#39CB7F]" v-if="this.statusData == 1" @click="updateItem()"> Cập nhật </button>
            </div>
        </div>
        <ErrorPopup :title="message" @close="close" v-if="hasError"></ErrorPopup>
    </div>
</template>
<script>
import api from '@/js/api'
import ErrorPopup from '@/components/Bases/BasePopup/ErrorPopup'
export default {
    props: ["title", "status", "item"],
    components: { ErrorPopup },
    data() {
        return {
            isAdd: true,
            editorConfig: {},
            isDetail: false,
            data: this.item,
            statusData: this.status,
            customer: {
                id: 0,
                email: "",
                password: "",
                name: "",
                tel: "",
                address: ""
            },
            message: "",
            hasError: false
        }
    },
    created() {
        if (this.status == 1) {
            this.isAdd = true
        }
        if (this.status == 1) {
            this.isAdd = false
            this.customer = this.data;
        }
        if (this.status == 2) {
            this.isAdd = false
            this.customer = this.data;
            this.isDetail = true
        }
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
        getNewItem() {
            return {
                id: 0,
                email: "",
                password: "",
                name: "",
                tel: "",
                address: ""
            }
        },
        statusAdd() {
            this.customer = this.getNewItem();
            this.isDetail = false;
            this.statusData = 0;
        },
        statusEdit() {
            this.customer = this.data;
            this.isDetail = false;
            this.statusData = 1;
        },
        statusDetail() {
            this.customer = this.data;
            this.isDetail = true;
            this.statusData = 2;
        },
        async addItem() {
            if (!this.customer.email) {
                this.message = "Email không được để trống."
                this.hasError = true
                return
            }
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.customer.email))) {
                this.message = "Email không đúng định dạng."
                this.hasError = true
                return
            }
            if (!this.customer.password) {
                this.message = "Mật khẩu không được để trống."
                this.hasError = true
                return
            }
            if (!this.customer.name) {
                this.message = "Tên khách hàng không được để trống."
                this.hasError = true
                return
            }
            if (this.customer.tel && !(/^\d{10}$/.test(this.customer.tel))) {
                this.message = "Số điện thoại không đúng định dạng."
                this.hasError = true
                return
            }
            let user = await this.$axios.get(`${api.CustomerApi}/${this.customer.email}`).then(res => res.data)
            if (user) {
                this.message = "Email đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
                this.hasError = true
                return
            }
            this.customer.date_create = new Date().toISOString().slice(0, 10)
            this.$axios.post(api.CustomerApi, this.customer).then(() => {
                this.$emit("close");
                this.$emit("success");
            })
                .catch(() => {
                    this.message = "Có lỗi xảy ra, vui lòng kiểm tra lại.";
                    this.hasError = true;
                })
        },
        updateItem() {
            if (!this.customer.email) {
                this.message = "Email không được để trống."
                this.hasError = true
                return
            }
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.customer.email))) {
                this.message = "Email không đúng định dạng."
                this.hasError = true
                return
            }
            if (!this.customer.password) {
                this.message = "Mật khẩu không được để trống."
                this.hasError = true
                return
            }
            if (!this.customer.name) {
                this.message = "Tên khách hàng không được để trống."
                this.hasError = true
                return
            }
            if (this.customer.tel && !(/^\d{10}$/.test(this.customer.tel))) {
                this.message = "Số điện thoại không đúng định dạng."
                this.hasError = true
                return
            }
            this.$axios.put(`${api.CustomerApi}/${this.customer.id}`, this.customer).then(() => {
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
    height: 260px;
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

::-webkit-scrollbar {
    appearance: none;
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background: #777E89;
    border-radius: 25px;
}
</style>