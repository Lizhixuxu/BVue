<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            info:{} //图文数据
        }
    },  
    created() {
        this.getGoodDesc();
    },
    methods: {
        getGoodDesc(){
            this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
                if(result.body.status === 0){
                    this.info = result.body.message[0];
                }
            })
        }
    },  
}
</script>

<style lang="scss" >
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        font-weight: bold;
        color:teal;
        text-align: center;
        margin: 25px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}

</style>