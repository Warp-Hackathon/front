<template>
    <div class="body">
        <span>欢迎</span>
        <div class="night">
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
        </div>
        <!-- <el-button @click="getLogin" class="my-button transparent-button" style="text-align: center;">登录</el-button> -->
        <a class="a" @click="getLogin">登录</a>
    </div>

</template>

<script>
export default {
    name: 'SignIn',
    methods: {
        async getLogin () {
            await this.$root.Login()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('../css/signin.css');
@import url('../css/button.css');

</style>
