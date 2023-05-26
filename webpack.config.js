import path from 'path';

export default {
  mode: 'development',
  entry: './src/entry-client.jsx',
  output: {
    path: path.resolve(process.cwd(), 'webpack'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@store': path.resolve(process.cwd(), 'src/store'),
    },
  },
};

