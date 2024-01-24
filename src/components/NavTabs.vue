<!-- eslint-disable vue/no-unused-components -->
<template>
  <el-row :gutter="10">
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple">

        <el-button class="transparent-button">
          <router-link class="routerlink" to="/createNFT">
            创建NFT
          </router-link>
        </el-button>

  </div></el-col>

  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light">
    <el-button type="text">
        <router-link class="routerlink" to="/feedfood">
            投喂食物
        </router-link>
    </el-button>
  </div></el-col>

  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content bg-purple">
        <div>
          <el-button class="transparent-button" @click="openUploadModal">上传NFT</el-button>
        </div>
      </div>
    </el-col>
  
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content bg-purple">
        <div>
          <el-button class="transparent-button" @click="openBuyModal">购买NFT</el-button>
        </div>
      </div>
    </el-col>



  <upload-modal v-model="uploadModalVisible" @submit="handleUploadSubmit">
    <template #title>
      Custom Upload Title
    </template>
  </upload-modal>

  <buy-modal v-model="buyModalVisible" @submit="handleBuySubmit">
    <template #title>
      Custom Buy Title
    </template>
  </buy-modal>

  <!-- <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light">
    <el-button type="text">
        <router-link class="routerlink" to="/votenft">
            voteNFT
        </router-link>
    </el-button>
  </div></el-col> -->



  

</el-row>
</template>



<script>
import UploadModal from './UploadNFT.vue';
import BuyModal from './BuyNFT.vue';

export default {
  components: {
    UploadModal,
    BuyModal
  },
  data() {
    return {
      uploadModalVisible: false,
      buyModalVisible: false
    };
  },
  methods: {
    openUploadModal() {
      this.uploadModalVisible = true;
    },
    handleUploadSubmit(formData) {
      console.log('Upload Form Data:', formData);
      this.uploadModalVisible = false;
    },
    openBuyModal() {
      this.buyModalVisible = true;
    },
    handleBuySubmit(formData) {
      console.log('Buy Form Data:', formData);
      this.buyModalVisible = false;
    }
  }
};
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
  }
  .routerlink{
    text-decoration: none;
  }

  .transparent-button {
  background-color: transparent;
  border-color: transparent;
  color: #333;
}
</style>