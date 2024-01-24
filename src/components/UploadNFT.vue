<template>
  <el-dialog
    :title="dialogTitle"
    :visible="isModalVisible"
    @update:visible="updateModalVisible"
    :before-close="handleCloseDialog"
    width="30%"
    center>
    <el-form ref="form" :model="formValues" label-width="80px">
      <el-form-item label="TokenId">
        <el-input type="number" v-model="formValues.tokenId"></el-input>
      </el-form-item>
      <el-form-item label="ListingPrice">
        <el-input type="number" v-model="formValues.listingPrice"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleFormSubmit">Submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'UploadModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    dialogTitle: {
      type: String,
      default: "Upload NFT"
    }
  },
  emits: ["update:visible", "submit"],
  data() {
    return {
      isModalVisible: this.isVisible,
      formValues: {
        tokenId: "",
        listingPrice: ""
      }
    };
  },
  methods: {
    handleCloseDialog(done) {
      this.$confirm("Are you sure you want to close this dialog?").then(() => {
        done();
      }).catch(() => {});
    },
    handleFormSubmit() {
      this.$emit("submit", this.formValues);
      this.updateModalVisible(false);
    },
    updateModalVisible(value) {
      this.isModalVisible = value;
      this.$emit("update:visible", value);
    }
  },
  
  watch: {
    visible(newVal) {
      this.modalVisible = newVal;
    }
  }
};
</script>