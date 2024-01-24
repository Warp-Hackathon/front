<template>
  <el-dialog
    :title="title"
    :visible="modalVisible"
    @buy:visible="buyModalVisible"
    :before-close="handleClose"
    width="30%"
    center>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="Address">
        <el-input v-model="formData.address"></el-input>
      </el-form-item>
      <el-form-item label="TokenERI">
        <el-input type="url" v-model="formData.tokenURI"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name:'BuyModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: "Buy NFT"
    }
  },
  emits: ["buy:visible", "submit"],
  data() {
    return {
      modalVisible: this.visible,
      formData: {
        address: "",
        tokenURI: ""
      }
    };
  },
  methods: {
      handleClose (done) {
      this.$confirm("Are you sure to close this dialog?").then(() => {
        done();
      }).catch(() => {});
    },
    handleSubmit() {
      this.$emit("submit", this.formData);
      this.updateModalVisible(false);
    },
    updateModalVisible(value) {
      this.modalVisible = value;
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