const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");

module.exports = (env, opts) => {
  const config = {
    // 중복되는 옵션들
    resolve: {
      extensions: [".js", ".vue"],
    },

    entry: {
      app: path.join(__dirname, "./main.js"),
    },
    // 결과물에 대한 설정
    output: {
      filename: "[name].js", // app.js
      path: path.join(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            "vue-style-loader", // 1st
            "css-loader", // 2nd
            "postcss-loader", // 3rd
            "sass-loader", // 4th
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.html"),
      }),

      new CopyPlugin({
        patterns: [
          {
            from: "assets/",
            to: "",
          },
        ],
      }),
    ],
  };

  if (opts.mode === "development") {
    return merge(config, {
      // 빌드 시간이 적고, 디버깅이 가능한 방식
      devtool: "eval",
      devServer: {
        // 자동으로 기본 브라우저를 오픈합니다
        open: false,
        // HMR, https://webpack.js.org/concepts/hot-module-replacement/
        hot: true,
      },
    });

    // opts.mode === 'production'
  }

  if (opts.mode === "production") {
    return merge(config, {
      // 용량이 적은 방식
      devtool: "cheap-module-source-map",
      plugins: [
        // 빌드(build) 직전 `output.path`(`dist` 디렉터리) 내 기존 모든 파일 삭제
        new CleanWebpackPlugin(),
      ],
    });
  }
};
