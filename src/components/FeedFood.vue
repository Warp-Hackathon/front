<template>
    <div>

    <div>
  <span>我的地址：{{ getuseraddress }}</span><br>
</div>

  <p>投喂食物</p>
  <div>
    <label for="id">ID:</label>
    <input type="text" 
           id="id"
           required
           v-model="id">
    <br>
    <label for="amount">数量:</label>

    <input type="text" 
           id="amount"
           step="1" 
           min="1" 
           max="100" 
           required
           placeholder="整数, 输入范围为1--100" 
           v-model="amount">

    <br>
    <button @click="Feed">投喂</button>
  </div>

  </div>
</template>

<script>
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../contract/config'

export default {
    name: 'FeedFood',
    data () {
        return {
            id: '',
            amount: '',
            getuseraddress:''

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



        async Feed () {
            const data = {
                id: this.id,
                amount:this.amount
            }
            const amount = ethers.utils.getAddress(data.amount, 18)
            const id = ethers.utils.parseUnits(data.id, 18)
            const contract = this.Contract()


            try {
                const tx = await contract.feedPet(id, amount)
                await tx.wait()
                alert("投喂成功")
            } catch(error) {
                alert("投喂失败", "原因：" + error.message)
            }
        },

    }
}
</script>

<style>

</style>