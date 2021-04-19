# cli-template-pc （pc管理端模板）

## 项目说明

该项目是基于vue-cli3.x构建的前端项目模版，相比vue-cli2.x提升项目打包的速度，配置更加的简洁， 整理并规范了目录结构并添加了eslint，保证项目的代码风格和结构的统一

## 具有如下特点

- 实现前后端分离，通过token进行数据交互
- 集成了svg图标，保证图标的不失真
- 集成了国际化相关内容
- 集成了mock数据的模拟，方便前端同学的调试
- 添加了更加规范的ESlint效验检查，保证代码的风格统一
- 集成一些公用的组件
- ...

## 技术选型

- es6
- babel
- Vue2.x
- Vue-router
- Vuex
- Vue-cli3.x
- eslint
- SCSS
- html
- gulp
- ...

### 目录结构

[结构树Tree](./tree.md)

> 注意开发时，每一个页面的功能必须都放到同一个文件夹内， 如下目录结构

```js
├─page1     // 页面1
|  ├─components // 页面组件
|  |  ├─com1.vue
|  |  ├─com2.vue
|  ├─index.vue
├─page2     // 页面2
|  ├─components // 页面组件
|  |  ├─com1.vue
|  |  ├─com2.vue
|  ├─index.vue
```

> 当有大的模块时必须按照模块来设计目录结构

```js
├─modules1     // 模块一
|  ├─page1     // 页面1
|  |  ├─components // 页面组件
|  |  |  ├─com1.vue
|  |  |  ├─com2.vue
|  |  ├─index.vue
|  ├─page2     // 页面1
|  |  ├─components // 页面组件
|  |  |  ├─com1.vue
|  |  |  ├─com2.vue
|  |  ├─index.vue
├─modules2     // 模块一
|  ├─page1     // 页面1
|  |  ├─components // 页面组件
|  |  |  ├─com1.vue
|  |  ├─index.vue
|  ├─page2     // 页面2
|  |  ├─components // 页面组件
|  |  |  ├─com1.vue
|  |  |  ├─com2.vue
|  |  ├─index.vue
```

## 开始项目


### 请确认编辑器已安装Eslint及Prettier - Code formatter插件

解释：请先安装插件再继续开发

### 项目配置文件

1. .prettierrc.js 格式化插件prettierrc配置文件 可增不可改不可减
2. .eslintrc.js ESLint校验配置文件 可增不可改不可减
3. 项目合并及提交仓库前请执行 `npm run lint` 检查代码格式

#### [强制] 项目中涉及到的组件命名、变量命名、组件属性排序等项请严格按照规范执行

[更多详细规范请查看前端规范文档](http://front.movecss.com/)

### 开始安装

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

### 生产环境

```bash
npm run build          #生产环境

npm run build:preview  #预演版

npm run build:test     #测试环境
```

打包指令              接口地址                   配置文件
build                 mp.sinocare.com           public\setting\index-production.js
build:test            mpdev.sinocare.com        public\setting\index-test.js
build:preview         mptest.sinocare.com       public\setting\index-preview.js
