<template>
    <div class="icon_cart">
        <van-icon name="cart-o" color="#ffffff" size="18"/>
    </div>
</template>

<script>
export default {
    name:'IconCart',
    data() {
        return{}
    }
}
</script>
<style lang="less" scoped>
    .icon_cart{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.6rem;
        height: 0.6rem;
        font-weight: bold;
        border-radius: 100%;
        background-color: #3BB86A;
    }
</style>