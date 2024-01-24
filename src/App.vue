<template>
    <div v-if="!useraddress" class="login-page">
        <SignIn/>
    </div>
    <div v-else>
        <div>
          <nav>
            <div class="navtabs">
                <NavTabs></NavTabs>
            </div>
          </nav>

          
        <div class="routerview_set">
            <router-view></router-view>
        </div>
        </div>
    </div> 
</template>

<script>
import { ethers } from 'ethers';
import SignIn from "./components/SignIn.vue";
import NavTabs from './components/NavTabs.vue';


export default {
    name: 'App',
    components: {
        SignIn,NavTabs
    },
    data() {
        return {
            useraddress: '',
        }
    },

    methods: {
         async Login ()  {
            const { ethereum } = window
            if (!ethereum) {
                alert("please install metamask!")
                    return false
                } 
            console.log("installed metamask")
            const [account] = await this.Provider().send("eth_requestAccounts", [])
            localStorage.setItem('useraddress', account)
            this.useraddress = account
            return true
        },
        Provider () {
            return new ethers.providers.Web3Provider(window.ethereum)
        },
    }
}
</script>

<style>
.login-page {
 position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 9999;
}

.page-container {
  margin: 0 auto;
  height: 50px;
  background-color: red;
  /* 将页面居中展示 */
}


.routerview_set {
  display: flex;
  justify-content: center;
  align-items: center;
  /* 可以加上一些其他样式设置 */
}


</style>
