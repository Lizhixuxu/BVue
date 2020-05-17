const path = require('path');
//启动热更新的第二步
// const webpack = require('webpack')
//导入在内存中生成html页面的插件
//只要是插件，就一定要放到plugins节点中去
var htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//这个配置文件，起始就是一个 JS 文件，通过Node中的模块操作，向外暴露了一个配置对象
module.exports = {
    //在配置文件中需要手动指定入口和出口
    entry: path.join(__dirname,'./src/main.js'),        //入口，表示要使用 webpack 打包哪个文件
    output:{    //输出文件相关的配置
        path:path.join(__dirname,'./dist'),         //指定打包好的文件，输出到哪个目录中去
        filename:'bundle.js'    //这是指定输出的文件的名称
    },
    mode:'development',
    // devServer:{         //这是配置dev-server命令参数的第二种形式，相对来说这种方式麻烦一下
    //     //--open --port 3000 --contentBase src --hot
    //     open:true,  //自动打开浏览器
    //     port:3000,  //设置启动时候的运行端口
    //     contentBase:'src',    //指定托管的根目录
    //     hot：true   //启用热更新的第一'步
    // },
    plugins:[   //配置插件的节点
        // new webpack.HotModleReplacementPlugin()，//new 一个热更新的模块对象，启用热更新的第三步
        new htmlWebpackPlugin({ //创建一个在内存生成html页面的插件
            template:path.join(__dirname,'./src/index.html'),  //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename:'index.html'   //指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{    //这个节点，用于配置所有第三方模块加载器
        rules:[     //所有第三方模块的匹配规则
            { test:/\.css$/,use:['style-loader','css-loader']},  //配置处理.css文件的第三方loader规则
            { test:/\.less$/,use:['style-loader','css-loader','less-loader']},   //配置处理.less文件的第三方loader规则
            { test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},   //配置处理.sass文件的第三方loader规则
            { test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=900&name=[hash:8]-[name].[ext]'},    //处理图片路径的loader
            { test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},    //处理字体文件的loader
            { test:/\.js$/,exclude:/node_modules/,use:'babel-loader'},  //配置Babel来转化高级的ES语法
            { test:/\.vue$/,use:'vue-loader'}   //处理.vue文件的loader
        ]
    },
    resolve:{
        alias:{     //修改Vue被导入时候的包的路径
            // "vue$":"vue/dist/vue.js"
        }
    }
}
// 当我们在 控制台，直接输入 webpack 命令执行的时候，webpack 做了以下几步：
//  1. 首先，webpack 发现，我们并没有通过命令的形式，给它指定入口和出口
//  2. webpack 就会去 项目的 根目录中，查找一个叫做 `webpack.config.js` 的配置文件
//  3. 当找到配置文件后，webpack 会去解析执行这个 配置文件，当解析执行完配置文件后，就得到了 配置文件中，导出的配置对象
//  4. 当 webpack 拿到 配置对象后，就拿到了 配置对象中，指定的 入口  和 出口，然后进行打包构建；