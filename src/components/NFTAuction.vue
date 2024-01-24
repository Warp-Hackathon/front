<template>
    <div>
        <h1>auctions</h1>
    <p>mintNFT</p>
    <div>
    <label for="nftname">name:</label>
    <input type="txt" id ="nftname" v-model="nftname">
    <label for="tokenURI">tokenURI:</label>
    <input type="txt" id ="tokenURI" v-model="tokenURI">
    <label for="price">price:</label>
    <input type="txt" id ="price" v-model="price">
    <button @click="mintNFT">创建NFT</button>
     </div>
     <div>
    <p>获取拥有者</p>
    <label for="token_id">token_id:</label>
    <input type="txt" id ="token_id" v-model="token_id1">
    <button @click="getTokenOwner">获取token拥有者</button>
    <h1>{{ owner }}</h1>
    </div>
    <div>
        <p>获取NFT的metadata</p>
    <label for="token_id">token_id:</label>
    <input type="txt" id ="token_id" v-model="token_id2">
    <button @click="getTokenMetaData">获取token的metadata</button>
    <h1>{{ metadata }}</h1>
    </div>
    <div>
        <p>创建新的拍卖</p>
        <label for="token_id">token_id:</label>
    <input type="txt" id ="token_id" v-model="token_id3">
    <label for="min_bid">min_bid:</label>
    <input type="txt" id ="min_bid" v-model="min_bid">
    <label for="duration">duration:</label>
    <input type="txt" id ="duration" v-model="duration">
    <button @click="beginAuction">创建拍卖</button>
    </div>

    <div> 
        <p>加价</p>
    <label for="token_id">token_id:</label>
    <input type="txt" id ="token_id" v-model="token_id4">
    <label for="newbid">newbid:</label>
    <input type="txt" id ="newbid" v-model="newbid">
    <button @click="increaseBid">加价</button>
    </div>
    <div>
        <p>确认交易是否在进行</p>
        <label for="token_id">token_id:</label>
        <input type="txt" id ="token_id" v-model="token_id5">
        <button @click="endAuction">确认</button>
    </div>
   <div>
       <p>交易支付(购买者调用)</p>
       <label for="token_id">token_id:</label>
       <input type="txt" id="token_id" v-model="token_id6">
       <button @click="claimNFT">支付</button>
   </div>
   <div>
      <p>充值</p>
      <label for="account">account:</label>
       <input type="txt" id="account" v-model="account">
       <button @click="recharge">充值</button>
   </div>
   <div>
     <P>查询余额</P>
     <label for="account">account:</label>
       <input type="txt" id="account" v-model="account1">
       <button @click="ETHbalanceOf">余额</button>
       <h1>{{ balance_account }}</h1>
   </div>
</div>
</template>

<script>
import { ethers } from 'ethers';
import { NFTAuctionABI, NFTAuctionaddress } from '../contract/NFTAuction'

export default {
    name: 'AuctionsPage',
    data () {
        return {
            name: '',
            symbol: '',
            getbalance: '',
            token_id1:'',
            recharge_account: '',
            recharge_initialCurrency: '',
            balance_account: '',
            getbalanceof: '',
            transfer_recipient: '',
            transfer_amount:'',
            nftname:'',
            tokenURI:'',
            price:'',
            token_id:'',
            token_id2:'',
            token_id3:'',
            token_id4:'',
            token_id5:'',
            token_id6:'',
            owner:'',
            metadata:'',
            min_bid:'',
            duration:'',
            newbid:'',
            account:'',
            account1:'',
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
            const Contract = new ethers.Contract(NFTAuctionaddress,NFTAuctionABI, signer)
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

        async mintNFT () {
            const mint =  {
                name: this.nftname,
                uri: this.tokenURI,
                price:this.price,
            }
            const contract =this.Contract()
            const name =ethers.utils.toString(mint.name)
            const uri =ethers.utils.toString(mint.uri)
            const price =ethers.utils.parseUnits(mint.price)
            let tx = null
            try{
                tx=await contract.mintNFT(name,uri,price)
                await tx.wait()
                alert("NFT创建成功")                
            }catch(error){
                alert("议案不存在"+"原因：" + error.message)

            }
        },
        async getTokenOwner(){
            const token = {
                tokenid :this.token_id1,
            }
            const contract =this.Contract()
            const tokenid = ethers.utils.parseUnits(token.tokenid)
            this.owner =await contract.getTokenOwner(tokenid)
        },
        async getTokenMetaData(){
            const tokenmetadata ={
                 tokenid : this.token_id2,
            }
            const contract =this.Contract()
            const tokenid = ethers.utils.parseUnits(tokenmetadata.tokenid)
            this.metadata =await contract.getTokenMetaData(tokenid)
        },
        async beginAuction(){
            const Auction ={
                 tokenid: this.token_id,
                 minbid : this.min_bidm,
                 duration: this.duration,
            }
            const contract =this.Contract()
            const tokenid =ethers.BigNumber.from(Auction.tokenid)
            const minbid  = ethers.BigNumber.from(Auction.minbid)
            const duration =ethers.utils.parseUnits(Auction.duration)
            let vs = null
            try{
                vs =await contract.beginAuction(tokenid,minbid,duration)
                await vs.wait()
                alert("创建交易成功")
            }catch(error){
                 alert("创建交易失败","原因：" + error.message)
            }
        },
        
        async increaseBid(){
            const increase ={
                tokenid : this.token_id3,
                bid :this.newbid,
            }
            const contract =this.Contract()
            const  tokenid =ethers.utils.parseUnits(increase.tokenid)
            const bid =ethers.utils.parseUnits(increase.bid)
            let vs = null
            try{
               vs =await contract.increaseBid(tokenid,bid)
                await vs.wait()
                alert("加价成功")
            }catch(error){
                 alert("加价失败","原因：" + error.message)
            }
        },
        async endAuction(){
            const Cliam = {
                tokenid:this.token_id4
            }
            const contract =this.Contract()
            const tokenid=ethers.utils.parseUnits(Cliam.tokenid)
            let vs = null
            try{
               vs =await contract.endAuction(tokenid)
                await vs.wait()
                alert("竞拍结束")
            }catch(error){
                 alert("拍卖正在进行")
            }
        },
        async claimNFT(){
            const claim ={
                tokenid: this.token_id5
            }
            const contract =this.Contract()
            const tokenid =ethers.utils.parseUnits(claim.tokenid)
            let vs =null
            try{
                vs =await contract.claimNFT(tokenid)
                await vs.wait()
                alert("支付成功")
            }catch(error){
                alert("支付失败","原因:"+error.message)
            }
        },
        async recharge(){
            const charge ={
                account:this.account6
            }
            const contract= this.Contract()
           // const account =ethers.utils.getAddress(charge.account)
            let vs =null
            try{
                vs =await contract.recharge(charge.account)
                await vs.wait()
                alert("充值成功")
            }catch(error){
                alert("充值失败"+"原因:"+error.message)
            }        
        },
        async ETHbalanceOf(){
            const eth ={
                account: this.account1
            }
            const contract =this.Contract()
            const account =ethers.utils.getAddress(eth.account)
            this.balance_account=await contract.ETHbalanceOf(account)
         
        },


    }
}
</script>

<style>

</style>