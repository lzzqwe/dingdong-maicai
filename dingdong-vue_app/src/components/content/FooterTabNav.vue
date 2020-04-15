<template>
        <van-tabbar v-model="active" :border="true" route active-color="#48C568">
            <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
            <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item to="/profile" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
</template>
<script>
export default {
    name:'FooterTabNav',
    data() {
        return{
            active:'/home'
        }
    }
}
</script>
<style lang="less" scoped>
.van-tabbar{
    height: 60px;
}
</style>