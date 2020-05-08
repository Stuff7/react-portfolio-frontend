const path = require("path")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "bin")
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
    {
      test: /\.(js|ts|tsx)$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: [
            "@babel/plugin-transform-runtime"
          ]
        }
      }
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.(png|jpe?g|gif|ttf|svg)$/i,
      use: [
        {
          loader: "file-loader",
        },
      ],
    },
  ]
  },
}
