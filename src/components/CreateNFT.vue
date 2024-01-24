<template>
  <div>
 <div>
  <span>我的地址：{{ getuseraddress }}</span><br>
</div>

<p>创建NFT</p>
<div>
  <label for="create_NFT">create_NFT:</label>
  <button @click="CreateNFT">创建</button>
  <h1>该小鱼的ID为 {{ Id }}</h1>
</div>

</div>
</template>

<script>
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../contract/config'

export default {
  name: 'CreateNFT',
  data () {
      return {
          name: '',
          symbol: '',
          getuseraddress:'',
          Id:''
      }
  },
  created () {
      this.Getuseraddress()
  },
  
  methods: {
      Getuseraddress () {
          this.getuseraddress = localStorage.getItem('useraddress')
      },
      Provider () {
          return this.$root.Provider()
      },

      Contract () {
          const provider = this.Provider()
          const signer = provider.getSigner()
          const Contract = new ethers.Contract(contractAddress, contractABI, signer)
          return Contract
      },

      async CreateNFT()
     {
      const contract = this.Contract()
      const useraddress=ethers.utils.getAddress(this.getuseraddress)

      try {
            const id =  await contract.mintPet(useraddress)
            this.Id = id.toString(); 
                alert("创建成功")
        } catch(error) {
                alert("创建失败", "原因：" + error.message)
            }

     }

  }
}
</script>

<style>

</style>