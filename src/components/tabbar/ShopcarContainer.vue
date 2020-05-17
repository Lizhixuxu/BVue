<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!--商品列表项区域-->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getCoodsSelected[item.id]"
                                    @change="seletedChanged(item.id,$store.getters.getCoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">${{item.sell_price}}</span>
                                <numbox :initcount=" $store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 问题：如何在购物车中获取商品的数量-->
                                <!-- 先创建一个空对象，遍历storegy中的数组后，得到如下所示的一个对象{ 88(id):2,89:2,90:4}-->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>
        <!--结算区域-->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件,
                            总价<span class="red">${{$store.getters.getGoodsCountAndAmount.amount}}</span> </p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
        <p>{{$store.getters.getCoodsSelected}}</p>
    </div>
</template>

<script>
import numbox from '../subcompoents/shopcar_numbox.vue'
export default{
    data(){
        return {
            goodslist:[] //购物车中所有商品的数据
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            //1.获取到 store 中所有商品的ID，然后拼接出一个用逗号分隔的字符串
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id));
            //如果购物车中没有商品则直接返回，不需要请求商品接口，否则会报错
            if(idArr.length<=0){
                return;
            }
            //获取购物车商品列表
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message;
                }
            });
        },
        remove(id,index){
            //点击删除,商品从store中根据传递的id删除，同时把当前组件中的goodslist中对应要删除的那个商品，使用index删除
            this.goodslist.splice(index,1);
            this.$store.commit("removeFormCar",id)
        },
        seletedChanged(id,val){
            //每当点击开关,把最新的开关状态同步到 store 中
            this.$store.commit("updateGoodsSelected",{id,selected:val})
        }
    },
    components:{
        numbox
    }
};
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-items: space-between;
            .price{color: brown;font-weight: bold;}
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
    
</style>