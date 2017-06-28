# react-app
### 1. Change package.json
###### You need to change this line with your path to webpack "webpack:w"
```
"scripts": {
    ...
    "webpack" : "node C:\\Users\\ipetrovbg\\AppData\\Roaming\\npm\\node_modules\\webpack\\bin\\webpack.js --progress --colors --watch"
    ...
  },
```
###### You don't have need from this scripts if you have already installed webpack globaly. If this is the case you just run webpack --progress --colors --watch
```
"scripts": {
    ...
    "webpack" : "webpack --progress --colors --watch"
    ...
  },
```
### 2. run npm install
### 3. npm run webpack
### 4. open index.html in browser
