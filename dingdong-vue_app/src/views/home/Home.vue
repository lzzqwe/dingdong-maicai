<template>
    <div class="home">
        <!-- 搜索 -->
        <van-sticky :offset-top="0">
            <van-search v-model="search" shape="round" placeholder="请输入搜索关键词" />
        </van-sticky>
        <!-- 轮播图组件 -->
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in imgUrls" :key="index">
                <img :src="item" />
            </van-swipe-item>
        </van-swipe>
        <!-- 分类导航 -->
        <div class="nav">
            <div class="nav_item" v-for="item in homeNavList" :key="item.id">
                <img :src="JSON.parse(item.image)[0].url"/>
                <p>{{ item.name }}</p>
            </div>
        </div>
        <!-- 加入会员 -->
        <add-vip></add-vip>
        <!-- 疯狂抢购 -->
        <div class="rob_purchase">
            <div class="count_down">
                <div class="icon_border"></div>
                <h4>今日疯抢</h4>
                <span>倒计时</span>
            </div>
            <div class="goods">
                <div class="goods_item" v-for="item in insaneList" :key="item.id">
                    <img :src="JSON.parse(item.propaganda)[0].url"/>
                    <p>{{ item.name }}</p>
                    <div class="price">
                        <span>￥:{{ item.price }}</span>
                        <div @click.stop>   <!--取消冒泡事件-->
                            <icon-cart @click.native="addCart"></icon-cart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <div class="guess_like">
            <div class="title">
                <div class="icon_border"></div>
                <h4>猜你喜欢</h4>
            </div>
            <div class="goods">
                <div class="goods_item" v-for="item in guessLiveList" :key="item.id" @click="goDetail(item.id)">
                    <img :src="JSON.parse(item.propaganda)[0].url"/>
                    <p>{{ item.name }}</p>
                    <div class="tools">
                        <div class="price">￥：{{ item.price }}</div>
                        <div @click.stop>
                            <icon-cart @click.native="addCart"></icon-cart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getHomeSwiper, getHomeNav,getHomeInsane,getHomeLive } from "../../network/home.js";
import IconCart from '../../components/content/IconCart.vue'  // 添加到购物车小图标
import AddVip from '../../components/content/AddVip.vue'  // 加入会员
export default {
    name: "Home",
    data() {
        return {
            imgUrls: [], // 轮播图数据
            homeNavList: [], // 导航栏数据
            search:'',  // 搜索关键字
            insaneList:[],  // 疯狂抢购 
            queryLive:{    // 猜你喜欢请求参数
                current:1,  // 页码
                pageSize:10    // 每页条数
            },   
            totalNum:21,     // 总共的商品数据
            guessLiveList:[],  // 猜你喜欢数据列表
        };
    },
    created() {
        // 获取轮播图数据
        getHomeSwiper().then(res => {
            // console.log(res);
            // 遍历取出图片数组
            this.imgUrls = res.data.swipers.map(item => {
                return JSON.parse(item.carousel)[0].url;
            });
            // console.log(this.imgUrls);
        });

        // 获取分类导航数据
        getHomeNav().then(res=>{
            // console.log(res)
            this.homeNavList = res.data;
        });

        // 获取疯狂抢购数据
        getHomeInsane().then(res=>{
            // console.log(res);
            this.insaneList = res.data;
        });

        // 猜你喜欢
        getHomeLive(this.queryLive).then(res=>{
            console.log(res);
            this.guessLiveList = res.data;
        });
    },
    methods: {
        // 跳转到详情页
        goDetail(id) {
            this.$router.push({
                path:'/detail',
                query:{
                    id
                }
            });
        },
        addCart() {
            alert("a")
            return false
        }
    },
    components:{
        IconCart,
        AddVip
    }
};
</script>
<style lang="less">
.van-swipe-item {
    width: 100%;
    height: 4.72rem;
    img {
        width: 100%;
        height: 100%;
    }
}
.van-swipe__indicator{
    width: 8px;
    height: 8px;
    background-color: gray;
}
.van-swipe__indicator--active{
    width: 12px;
    height: 6px;
    border-radius: 3px;
}
.nav{
    display: flex;
    flex-wrap: wrap;  // 换行
    justify-content: space-around;
    .nav_item{
        display: flex;
        flex-direction: column;   //  改变主轴方向，使它为上下排列
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem 0;
        width: 1.28rem;
        height: 1.82rem;
        font-size: 0.24rem;
        img{
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
        }
    }
}
.rob_purchase{
    .count_down{
        display: flex;
        padding: 0.2rem 0;
        h4{
            font-size: 0.36rem;
        }
        span{
            font-size: 0.3rem;
        }
    }
    .goods::-webkit-scrollbar {display:none} // 隐藏横向滚动条
    .goods{
        display: flex;
        overflow-x: scroll; /*添加横向滚动条*/
        // white-space: nowrap;/*不换行*/
        height: 4rem;
        border-bottom: 6px solid #F8F4F5;
        .goods_item{
            display: flex;
            flex-direction: column;
            align-items: center;
            // justify-content: center;
            width: 2.1rem;
            height: 100%;
            padding: 0.1rem;
            font-size: 0.24rem;
            // border: 1px solid red;
            img{
                width: 1.8rem;
                height: 2rem;
            }
            p{
                text-align: center;
                margin: 0.2rem 0;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .price{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 1.8rem;
                span{
                    font-size: 0.26rem;
                    color: #FD6069;
                }
            }
        }
    }
}
.guess_like{
    .title{
        display: flex;
        align-items: center;
        height: 1rem;
        width: 100%;
        // border: 1px solid #000000;
        h4{
            font-size: 0.36rem;
        }
    }
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
       .goods_item{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 3.45rem;
        height: 6rem;
        border: 1px solid #F1F1F1;
        border-radius: 3px;
        margin-bottom: 10px;
        font-size: 0.28rem;
        img{
            margin-top: 0.4rem;
            width: 80%;
            height: 2.6rem;
        }
        p{
            display: flex;
            align-items: center;
            height: 2rem;
            padding-left: 0.3rem;
            align-self: flex-start;
        }
        .tools{
            display: flex;
            justify-content: space-between;
            width: 2.8rem;
            margin-left: 0.3rem;
            align-self: flex-start;
            color: red;
        }
    }
    }
}
.icon_border{
    width: 6px;
    height: 20px;
    background-color: #3ECD60;
    border-radius: 5px;
    margin: 0 0.16rem;
}
   body::-webkit-scrollbar {display:none}
</style>