<template>
    <div class="category">
        <!-- <icon-cart></icon-cart> -->
        <!-- 搜索 -->
        <van-sticky :offset-top="0">
            <van-search v-model="search" shape="round" placeholder="请输入搜索关键词" />
        </van-sticky>
        <div class="goods">
        <!-- 左侧商品 类别 列表 -->
            <div class="title">
                <div :class="['title_item',{'active':item.id==id}]" v-for="item in classList" :key="item.id" @click="titleChange(item.id,item.name)">{{item.name}}</div>
            </div>
            <div class="content">
                <!-- 商品标题栏 -->
                <h4>{{ title }}</h4>
                <div class="goods_item" v-for="item in goodsList" :key="item.id">
                    <div class="img">
                        <img :src="JSON.parse(item.propaganda)[0].url"/>
                    </div>
                    <div class="goods_info">
                        <div class="title">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getAllClass,getOneAllGoods} from '../../network/category.js'
import IconCart from '../../components/content/IconCart.vue'
export default {
    name:'Category',
    data() {
        return{
            search:'',
            classList:[],
            id:13,  // 默认请求id
            indexCount:0, // 商品标题的默认选中
            title:'',   // 商品标题栏
            goodsList:[]  // 商品数据
        }
    },
    created() {
        // 获取左侧商品标题列表
        getAllClass().then(res =>{
            console.log(res);
            this.classList = res.data.class;
            this.title = res.data.class[0].name;
        });
       this.getOneAllGoods();
    },
    methods:{
        // 根据标题id获取右侧商品内容
        getOneAllGoods() {
             getOneAllGoods(this.id).then(res =>{
             console.log(res);
             this.goodsList = res.data;
        });
        },
        // 点击左侧商品标题，切换右侧商品内容
        titleChange(title_id,item_title){
            // console.log(title_id)
            this.id = title_id
            console.log(this.id)
            this.title = item_title
            // 然后重新获取右侧内容
            this.getOneAllGoods();
        }
    },
    components:{
        IconCart
    }
}
</script>
<style lang="less" scoped>
    .goods{
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        padding-top: 54px;
        .title{
            float: left;
            overflow: auto;
            width: 30%;
            height:100%;
            font-size: 0.32rem;
            background-color: #F7F7F7;
            .title_item{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 1.2rem;
                border-bottom: 1px solid #f3f3f3;
            }
            .active{
                background-color: #ffffff;
                font-weight: bold;
            }
        }
        .content{
            float: left;
            overflow: auto;
            width: 70%;
            height: 100%;
            padding-left: 0.25rem;
            // 标题
            h4{
                display: flex;
                align-items: center;
                height: 0.8rem;
                font-size: 0.3rem;
                border-bottom: 1.5px solid #F7F7F7;
            }
        }
    }
</style>