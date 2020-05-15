import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoList from './components/photos/photoList.vue'
import photoInfo from './components/photos/photoInfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'
import goodsDesc from './components/goods/goodsDesc.vue'
import goodsComment from './components/goods/goodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
    routes: [ //配置路由规则
      { path : '/', redirect:'/home'},
      { path :'/home',component:HomeContainer},
      { path :'/member',component:MemberContainer},
      { path :'/shopcar',component:SearchContainer},
      { path :'/search',component:ShopcarContainer},
      { path : '/home/newslist',component:newsList},
      { path : '/home/newsinfo/:id',component:newsInfo},
      { path : '/home/photolist',component:photoList},
      { path : '/home/photoinfo/:id',component:photoInfo},
      { path : '/home/goodslist',component:goodsList},
      { path :'/home/goodsinfo/:id',component:goodsInfo,name:'goodsinfo'},
      { path :'/home/goodsdesc/:id',component:goodsDesc,name:'goodsdesc'},
      { path :'/home/goodscomment/:id',component:goodsComment,name:'goodscomment'}

    ],
    linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类,默认的类叫做router-link-active
  })

  //把路由对象暴露出去
  export default router