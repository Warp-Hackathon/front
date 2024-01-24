<template>
  <div>
  <p>createProposal</p>
  <div>
    <label for="token_id1">token_id:</label>
    <input type="txt" id ="token_id1" v-model="token_id1">
    <label for="target_amount">target_amount:</label>
    <input type="txt" id ="target_amount" v-model="target_amount">
    <label for="deadline">deadline:</label>
    <input type="txt" id ="deadline" v-model="deadline">
    <button @click="createProposal">创建提案</button>
     </div>
 <p>投票</p>
 <div>
   <label for="proposalId">proposalId:</label>
   <input type="txt" id="proposalId" v-model="proposalId">
   <button @click="contribute">投票</button>
 </div>

<p>查看议案是否存在</p>
<div>
  <label for="proposalId1">proposalId:</label>
  <input type="txt" id="proposalId1" v-model="proposalId1">
   <button @click="hasExpired">查看议案存在</button>
</div>
<p>获取贡献人的权益</p>
<div>
  <label for="proposalId2">proposalId:</label>
  <input type="txt" id="proposalId2" v-model="proposalId2">
  <label for="contributor">contributor:</label>
  <input type="txt" id="contributor" v-model="contributor">
  <button @click="getContributorShare">查看权益</button>
  <h1>{{ contributes }}</h1>
  </div>

  <p>权益转移</p>
  <div>
    <label for="recipient">recipient:</label>
    <input type="txt" id="recipient" v-model="recipient">
    <label for="token_id1">token_id:</label>
    <input type="txt" id="token_id1" v-model="token_id">
    <label for="transfer_count">transfer_count:</label>
    <input type="txt" id="transfer_count" v-model="transfer_count">
    <button @click="transferSlice">权益转移</button>
  </div>

  <p>根据nftID找到权益持有者的地址</p>
  <div>
    <label for="aimTokenId">aimTokenId:</label>
    <input type="txt" id="aimTokenId" v-model="aimTokenId">
    <button @click="TokenIdTofindStaker">获取权益持有者地址</button>
    <h1>{{ contributes }}</h1>
  </div>
  <p>根据id获取权益分割情况</p>
  <div>
    <label for="aimTokenId1">aimTokenId:</label>
    <input type="txt" id="aimTokenId1" v-model="aimTokenId1">
    <button @click="TokenIdToStake">获取权益分割情况</button>
    <h1>{{ TokenIdstake }}</h1>
  </div>
  <p>输入地址,找到对应的权益持有者ID号</p>
  <div>
    <label for="aimStaker">aimStaker:</label>
    <input type="txt" id="aimStaker" v-model="aimStaker">
    <button @click="FindstakeNo">获取持有者id</button>
    <h1>{{ ID }}</h1>

  </div>
</div>
</template>


<script>
import { ethers } from 'ethers';
import {} from '../contract/myNFT';
import {} from  '../contract/NFTExchange';
import { contractNFTVOTE, NFTVOTE  } from '../contract/NFTVote'

export default {
    name: 'VotePage',
    data () {
        return {
            getbalance: '',
            balance_account: '',
            name: '',
            symbol: '',
            getbalanceof: '',
            transfer_recipient: '',
            transfer_amount:'',
            token_id:'',
            target_amount:'',
            deadline:'',
            proposalId:'',
            contributor:'',
            contributes:'',
            transfer_count:'',
            recipient:'',
            aimTokenId:'',
            TokenIdstake:'',
            aimStaker:'',
            ID:'',
            aimTokenId1:'',
            token_id1:'',

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
            const Contract = new ethers.Contract(NFTVOTE,contractNFTVOTE,  signer)
            return Contract
        },

        async getBalance () {
            console.log('====================================');
            const get = this.getuseraddress
            const balance = await this.Provider().getBalance(get)
            console.log(balance)
            console.log('====================================');
            this.getbalance = ethers.utils.formatEther(balance)
        },


        async createProposal () {
            const createProposal = {
                token_id: this.token_id1,
                target_amount: this.target_amount,
                deadline: this.deadline
                        }
            const contract = this.Contract()
            const token_id =ethers.utils.parseUnits(createProposal.token_id)
            const target_amount = ethers.utils.parseUnits(createProposal.target_amount)
            const deadline = ethers.utils.parseUnits(createProposal.deadline)
            const tx =await contract.createProposal(token_id,target_amount,deadline)
            await tx.wait()
            alert("创建提案")
        },
        async contribute (){
              const contribute ={
                proposalId: this.proposalId,
              }
              const contract =this.Contract()
              const proposalId=ethers.utils.parseUnits(contribute.proposalId)
              const tx=await contract.contribute(proposalId)
              await tx.wait()
              alert("投票成功")
        },
        async hasExpired (){
            const hasExpired ={
              proposalId: this.proposalId1,
            }
            const contract =this.Contract()
              const proposalId=ethers.utils.parseUnits(hasExpired.proposalId)
              let tx = null
              try {
                tx = await contract.hasExpired(proposalId)
                await tx.wait()
                alert("议案存在")
            } catch(error) {
                alert("议案不存在", "原因：" + error.message)
            }
        },
        async getContributorShare (){
           const getcontri ={
            proposalId: this.proposalId2,
            contributor: this.contributor,
           }
           const contract =this.Contract()
           const proposalId=ethers.utils.parseUnits(getcontri.proposalId)
           const contributor=ethers.utils.getAddress(getcontri.contributor)
            
           this.contributes=await contract.getContributorShare(proposalId,contributor)
        },
        async transferSlice (){
           const transferEther ={
            recipient: this.recipient,
            token_id: this.token_id,
            transferCount: this.transfer_count,
           }
           const contract =this.Contract()
           const recipient=ethers.utils.getAddress(transferEther.recipient)
           const token_id=ethers.utils.parseUnits(transferEther.token_id)
           const transfer_count=ethers.utils.parseUnits(transferEther.transferCount)
            
           const tx= await contract.transferSlice(recipient,token_id,transfer_count)
           await tx.wait()
           alert("转移成功")
        },
        async TokenIdTofindStaker(){
           const TokenIdTofindStaker ={
             aimTokenId: this.aimTokenId, 
           }
           const contract=this.Contract()
           const aimTokenId=ethers.utils.parseUnits(TokenIdTofindStaker.aimTokenId)

          this.contributes= await contract.TokenIdTofindStaker(aimTokenId)
        },
        async TokenIdToStake(){
          const TokenIdToStake ={
            aimTokenID: this.aimTokenId1,
          }
          const contract=this.Contract()
           const aimTokenId=ethers.utils.getAddress(TokenIdToStake.aimTokenID)
           this.TokenIdstake=await contract.TokenIdToStake(aimTokenId)
        },
        async FindstakeNo(){
          const findstakeNo ={
            aimStaker: this.aimStaker,
          }
          const contract=this.Contract()
          const aimStaker=ethers.utils.getAddress(findstakeNo.aimStaker)
          this.ID =await contract.findstakeNo(aimStaker)

        }


    }
  }
</script>

<style>

</style>