<template>
    <div>
        <div class="view">
            <div class="view-title" data-aos="flip-left" data-aos-duration="1000">
                Quản Lý Sản Phẩm
            </div>
            <div class="card">
                <div class="card-item" data-aos="flip-right" data-aos-easing="ease-out-cubic" data-aos-duration="1200">
                    <div class="card-item-header">
                        <div class="card-itm-header-title">Tìm Kiếm</div>
                    </div>
                    <div class="card-item-content" data-aos="fade-left" data-aos-duration="1500">
                        <input type="text" class="input" placeholder="Nhập tên sản phẩm..." title="Tìm kiếm sản phẩm"
                            v-model="search">
                        <button class="button bg-[#F15B2B]" @click="findProduct">Tìm Kiếm</button>
                        <button class="button button-secondary" @click="refresh">Làm Mới</button>
                    </div>
                </div>
            </div>
            <div class="bg-[#fff] table my-6" data-aos="flip-right" data-aos-easing="ease-out-cubic"
                data-aos-duration="1200">
                <BaseView :page="page" :title="header" :items="items" :tableheader="tableHeader" v-if="!noData"
                    @add="addItem" @edit="editItem" @detail="detailItem" @delete="deleteItem"></BaseView>
                <div class="nodata" v-if="noData">
                    <img src="../assets/image/empty.svg" alt="No image">
                    Không có dữ liệu để hiển thị.
                </div>
                <div class="pagination" v-show="!noData">
                    <div class="text-xs flex text-[#99ABB4]">Total record: <p class="text-xs font-bold pl-1 text-[#11142D]">
                            {{ totalItems }} records</p>
                    </div>
                    <Pagination class="pr-[6rem]" ref="pagination" :itemCount="totalItems" :maxDisplayPage="3" :page="page"
                        :perPage="10" @pageChange="pageChange"></Pagination>
                    <div></div>
                </div>
            </div>
        </div>
        <Loader v-if="hasLoader"></Loader>
        <ErrorPopup @close="close" :title="title" v-if="hasError"></ErrorPopup>
        <ProductForm title="Sản Phẩm" :status="status" :item="item" v-if="showForm" @close="closeForm" @success="success">
        </ProductForm>
        <ToastMesage :mesage="title" @closeToast="closeToast" v-if="hasToast"></ToastMesage>
        <QuestionPopup :title="title" @close="close" @yes="yes" v-if="hasQuestion"></QuestionPopup>
    </div>
</template>
<script>
import BaseView from '../components/Bases/BaseView'
import Pagination from '@/components/Bases/Pagination'
import Loader from '@/components/Bases/Loader'
import ErrorPopup from '@/components/Bases/BasePopup/ErrorPopup'
import api from '@/js/api'
import ProductForm from '@/view/forms/ProductForm'
import ToastMesage from '@/components/Bases/ToastMesage'
import QuestionPopup from '@/components/Bases/BasePopup/QuestionPopup'
export default {
    components: {
        BaseView, Pagination, Loader, ErrorPopup, ProductForm, ToastMesage, QuestionPopup
    },
    data() {
        return {
            tableHeader: [{ id: "name", name: "Tên sản phẩm" }, { id: "price", name: "Giá sản phẩm" }, { id: "amount", name: "Số lượng còn" }],
            header: "Danh Sách Sản Phẩm",
            items: [],
            page: 1,
            totalItems: 0,
            search: "",
            hasLoader: false,
            hasError: false,
            title: "",
            noData: false,
            showForm: false,
            status: 0,
            item: {},
            hasToast: false,
            hasQuestion: false
        }
    },
    created() {
        this.getProduct();
    },
    methods: {
        closeToast() {
            this.hasToast = false
        },
        success() {
            this.title = "Cập nhật thành công."
            this.hasToast = true;
            setTimeout(() => {
                this.hasToast = false
            }, 3000);
            this.page = 1,
                this.search = ""
            this.getProduct();
        },
        closeForm() {
            this.showForm = false
        },
        addItem() {
            this.status = 0
            this.item = {};
            this.showForm = true;
        },
        editItem(item) {
            this.status = 1
            this.item = item
            this.showForm = true;
        },
        detailItem(item) {
            this.status = 2
            this.item = item
            this.showForm = true;
        },
        deleteItem(item) {
            this.item = item;
            this.title = `Bạn có thật sự muốn xóa danh mục này không.`
            this.hasQuestion = true;
        },
        yes() {
            this.$axios.delete(`${api.ProductApi}/${this.item.id}`).then(() => {
                this.title = "Xóa thành công."
                this.hasToast = true;
                setTimeout(() => {
                    this.hasToast = false
                }, 3000);
                this.hasQuestion = false;
                this.page = 1,
                    this.search = ""
                this.getProduct();
            })
                .catch(() => {
                    this.hasQuestion = false
                    this.title = "Có lỗi xảy ra, vui lòng kiểm tra lại."
                    this.hasError = true;
                })
        },
        async getProduct() {
            let param = {
                PageNumber: this.page,
                search_key: this.search,
                limit: 10
            }
            this.hasLoader = true
            let data = await this.$axios.get(`${api.ProductApi}/search`, { params: param }).then(res => res.data).finally(() => this.hasLoader = false)
            this.items = data.data;
            console.log(data);
            this.totalItems = data.totalRecord;
            if (this.totalItems == 0) {
                this.noData = true;
            }
            else {
                this.noData = false
            }
        },
        pageChange(value) {
            this.page = value;
            console.log("pagechange");
            this.getProduct();
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        async findProduct() {
            this.$refs.pagination.resetPage();
            this.page = 1
            console.log("find");
            this.getProduct();
            setTimeout(() => {
                this.header = `Có ${this.totalItems} kết quả tìm kiếm trùng khớp`
            }, 100);
        },
        refresh() {
            this.header = "Danh Sách Sản Phẩm";
            this.noData = false;
            this.$refs.pagination.resetPage();
            this.page = 1
            this.search = "";
            console.log("refresh");
            this.getProduct();
        },

        close() {
            this.hasError = false
            this.hasQuestion = false
        }
    },

}
</script>
<style scoped>
.view {
    width: 100%;
    padding: 0px 32px 24px 32px;
}

.card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 9px rgba(0, 0, 0, 0.06), 0px 3px 5px rgba(0, 0, 0, 0.07);
}

.view-title {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 39px;
    color: #11142D;
    margin: 1rem 0;
}

.card-item {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 9px rgba(0, 0, 0, 0.06),
        0px 3px 5px rgba(0, 0, 0, 0.07);
}

.card-item-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0 0 6px 0;
}

.card-itm-header-title {
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

.table {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 9px rgba(0, 0, 0, 0.06),
        0px 3px 5px rgba(0, 0, 0, 0.07);
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    padding: 32px;
}

.pagination {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.nodata {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    text-align: center;
    color: #a11f2c;
}

.nodata img {
    width: 260px;
    height: 260px;
}
</style>