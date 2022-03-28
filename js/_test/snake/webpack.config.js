const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode:"development",
    entry: './src/index.ts',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname, 'dist')
    },
    resolve:{
        extensions:['.ts', '.js']
    },
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'ts-loader',
                exclude: /node_modules/
            },
            {
                test:/\.less/,
                use:['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}