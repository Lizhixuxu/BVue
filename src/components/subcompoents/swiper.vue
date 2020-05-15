<template>
    <div>
           <mt-swipe :auto="4000">
            <!-- 在组件中 使用v-for循环的话，一定要使用 key -->
            <!--将来,谁使用此轮播图组件谁为我们传递swipeList-->
            <!--此时，swipe应该是父组件向子组件传值来设置-->
            <mt-swipe-item v-for="item in swipeList" :key="item.img" >
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>

    </div>
    <!--分歧点：首页中的轮播图宽高都是100%,而商品详情页中的轮播图高是100%,宽是自适应
                定义一个属性,让使用轮播图的调用者,手动指定是否为100%的宽度-->
</template>

<script>
export default {
    props:["swipeList","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height:200px;
    .mint-swipe-item { 
        text-align: center;
        &:nth-child(2){
           background-color:darkseagreen;
       }
       img{
        // width: 100%;
           height: 100%;
       }
    }
}
.full{
    width: 100%;
}
</style>