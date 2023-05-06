<template>
  <div class="form-container">
    <div class="form-content">
      <div class="form-header">
        <div class="form-title">{{ titleHeader }}</div>
      </div>
      <div class="form-body">
        <div class="form-body-item">
          <div class="w-1/2">
            <div class="label">
              Tên sản phẩm<span style="color: red"> * </span>:
            </div>
            <div class="value">
              <input type="text" class="input" v-model="product.name" :disabled="isDetail" required />
            </div>
          </div>
          <div class="w-1/2">
            <div class="label">Danh mục<span style="color: red"> * </span>:</div>
            <div class="value">
              <md-field>
                <md-select v-model="product.cat_id">
                  <md-option :value="category.id" v-for="(category, index) in categories" :key="index + category.id">
                    {{ category.name }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </div>
        <div class="form-body-item">
          <div class="w-1/2">
            <div class="label">Xuất xứ:</div>
            <div class="value">
              <input type="text" class="input" v-model="product.origin" :disabled="isDetail" />
            </div>
          </div>
          <div class="w-1/2">
            <div class="label">Giá bán<span style="color: red"> * </span>:</div>
            <div class="value">
              <input type="text" class="input" v-model="product.price" :disabled="isDetail" required />
            </div>
          </div>
        </div>
        <div class="form-body-item">
          <div class="w-1/2">
            <div class="label">
              Số lượng còn<span style="color: red"> * </span>:
            </div>
            <div class="value">
              <input type="number" class="input" v-model="product.amount" :disabled="isDetail" required />
            </div>
          </div>
          <div class="w-1/2">
            <div class="label">
              Đơn vị tính<span style="color: red"> * </span>:
            </div>
            <div class="value">
              <input type="text" class="input" v-model="product.unit" :disabled="isDetail" required />
            </div>
          </div>
        </div>
        <div class="px-[12px]">
          <div class="label">Ảnh mô tả:</div>
          <div style="display: flex; align-items: center; gap: 12px" v-if="!isDetail">
            <div class="image-container relative" v-if="product.image">
              <img :src="product.image" alt="" class="image-product" />
              <img @click="removeImage" class="cursor-pointer absolute top-1 right-1" src="../../assets/icons/close.svg"
                alt="">
            </div>
            <img class="w-[120px] h-[120px] cursor-pointer" @click="clickUploadFile($event)"
              src="../../assets/icons/upload.svg" alt="">
            <div class="p-0 hidden">
              <input type="file" ref="upload" @change="upLoadFile($event)" accept="image/*" />
            </div>
          </div>
          <div v-else>
            <div class="image-container-detail" v-if="product.image">
              <img :src="product.image" alt="" class="image-product" />
            </div>
            <div v-else style="display: flex; justify-content: center; color: red">
              Không có ảnh mô tả
            </div>
          </div>
        </div>
        <div class="px-[12px]">
          <div class="label">Mô tả:</div>
          <div class="value" v-if="!isDetail">
            <ckeditor tag-name="textarea" v-model="product.description" :config="editorConfig"></ckeditor>
          </div>
          <div class="value w-[800px]" v-else>
            <span v-html="product.description"></span>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button class="button bg-[#FFFFFF] text-[#777E89] border-solid border-[#777E89]"
          @click="$emit('close')">Đóng</button>
        <button class="button bg-[#F15B2B]" :class="{ disable: disableButton }" v-if="this.statusData == 0"
          @click="addItem()" :disabled="disableButton">Lưu</button>
        <button class="button bg-[#39CB7F]" :class="{ disable: disableButton }" v-if="this.statusData == 1"
          @click="updateItem()" :disabled="disableButton">Cập nhật</button>
      </div>
    </div>
    <ErrorPopup :title="message" @close="close" v-if="hasError"></ErrorPopup>
  </div>
</template>
<script>
import api from "@/js/api";
import ErrorPopup from "@/components/Bases/BasePopup/ErrorPopup";
export default {
  props: ["title", "status", "item"],
  components: { ErrorPopup },
  data() {
    return {
      disableButton: false,
      isAdd: true,
      editorConfig: {},
      isDetail: false,
      data: this.item,
      statusData: this.status,
      product: {
        id: 0,
        cat_id: 0,
        name: "",
        origin: "",
        price: "",
        image: "",
        description: "",
        amount: "",
        unit: "",
      },
      categories: [],
      message: "",
      hasError: false,
    };
  },
  created() {
    if (this.status == 1) {
      this.isAdd = true;
    }
    if (this.status == 1) {
      this.isAdd = false;
      this.product = this.data;
    }
    if (this.status == 2) {
      this.isAdd = false;
      this.product = this.data;
      this.isDetail = true;
    }
    this.$axios.get(api.CategoryApi).then((res) => {
      this.categories = res.data;
    });
  },
  computed: {
    titleHeader() {
      if (this.statusData == 0) {
        return "Thêm " + this.title;
      }
      if (this.statusData == 1) {
        return "Sửa " + this.title;
      }
      if (this.statusData == 2) {
        return "Chi Tiết " + this.title;
      }
      return "";
    },
  },
  methods: {
    clickUploadFile() {
      const input = this.$refs.upload;
      input?.click();
    },
    removeImage() {
      this.product.image = '';
    },
    upLoadFile(e) {
      let endPoint = e.target.files[0].name.split(".").pop();
      if (
        endPoint != "png" &&
        endPoint != "jpg" &&
        endPoint != "gif" &&
        endPoint != "jpeg" &&
        endPoint != "psd"
      ) {
        this.message =
          "File mô tả phải là file ảnh(.png, .jpg, .gif, .jpge, .psd";
        this.hasError = true;
        return;
      }
      var me = this;
      let file = "";
      this.disableButton = true;
      const url = `https://api.cloudinary.com/v1_1/djgj7gzsw/upload`;
      let reader = new FileReader();
      reader.onloadend = async () => {
        file = await reader.result;
        let fileUpload = {
          file: file,
          upload_preset: "vanphongpham",
          folder: "image/vanphongpham",
        };
        me.$axios.post(url, fileUpload).then((res) => {
          if (res.data.secure_url) {
            me.product.image = res.data.secure_url;
          } else {
            me.product.image = "";
          }
          me.disableButton = false;
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    },
    getNewItem() {
      return {
        id: 0,
        name: "",
        description: "",
      };
    },
    statusAdd() {
      this.product = this.getNewItem();
      this.isDetail = false;
      this.statusData = 0;
    },
    statusEdit() {
      this.product = this.data;
      this.isDetail = false;
      this.statusData = 1;
    },
    statusDetail() {
      this.product = this.data;
      this.isDetail = true;
      this.statusData = 2;
    },
    addItem() {
      if (!this.product.name) {
        this.message = "Tên sản phẩm không được để trống.";
        this.hasError = true;
        return;
      }
      if (!this.product.cat_id) {
        this.message = "Mã danh mục không được để trống.";
        this.hasError = true;
        return;
      }
      if (!this.product.price) {
        this.message = "Giá sản phẩm không được để trống.";
        this.hasError = true;
        return;
      }
      if (!/^\d+$/.test(this.product.price)) {
        this.message = "Giá bán phải là số, vui lòng kiểm tra lại.";
        this.hasError = true;
        return;
      }
      if (!this.product.amount) {
        this.message = "Số lượng còn không được để trống.";
        this.hasError = true;
        return;
      }
      if (!/^\d+$/.test(this.product.amount)) {
        this.message = "Số lượng còn phải là số, vui lòng kiểm tra lại.";
        this.hasError = true;
        return;
      }
      if (!this.product.unit) {
        this.message = "Đơn vị tính không được để trống.";
        this.hasError = true;
        return;
      }
      this.$axios
        .post(api.ProductApi, this.product)
        .then(() => {
          this.$emit("close");
          this.$emit("success");
        })
        .catch(() => {
          this.message = "Có lỗi xảy ra, vui lòng kiểm tra lại.";
          this.hasError = true;
        });
    },
    updateItem() {
      if (!this.product.name) {
        this.message = "Tên sản phẩm không được để trống.";
        this.hasError = true;
        return;
      }
      if (!this.product.cat_id) {
        this.message = "Mã danh mục không được để trống.";
        this.hasError = true;
        return;
      }
      if (!this.product.price) {
        this.message = "Giá sản phẩm không được để trống.";
        this.hasError = true;
        return;
      }
      if (!/^\d+$/.test(this.product.price)) {
        this.message = "Giá bán phải là số, vui lòng kiểm tra lại.";
        this.hasError = true;
        return;
      }
      if (!/^\d+$/.test(this.product.amount)) {
        this.message = "Số lượng còn phải là số, vui lòng kiểm tra lại.";
        this.hasError = true;
        return;
      }
      if (!this.product.amount) {
        this.message = "Số lượng còn không được để trống.";
        this.hasError = true;
        return;
      }
      if (!this.product.unit) {
        this.message = "Đơn vị tính không được để trống.";
        this.hasError = true;
        return;
      }
      this.$axios
        .put(`${api.ProductApi}/${this.product.id}`, this.product)
        .then(() => {
          this.$emit("close");
          this.$emit("success");
        })
        .catch(() => {
          this.message = "Có lỗi xảy ra, vui lòng kiểm tra lại.";
          this.hasError = true;
        });
    },
    close() {
      this.hasError = false;
    },
  },
};
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
  max-height: 600px;
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
  height: 400px;
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

.file-text {
  color: #045ebe;
  font-size: 20px;
  cursor: pointer;
}

.image-container {
  height: 120px;
  width: 120px;
  /* border: 1px solid #045ebe; */
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container-detail {
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #777E89; */
  border-radius: 4px;
}

.image-product {
  max-height: 100%;
  max-width: 100%;
}

.disable {
  background: #fff;
  color: #bbb;
  border: 1px solid #bbb;
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

.md-field {
  margin: 0;
  padding: 0;
  min-height: 40px;
}
</style>
