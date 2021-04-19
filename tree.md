# 结构树

## [名词说明]

1. 页面-有路由对应
2. 组件-无路由对应

├── views                                                   // file-业务
|   ├── global                                              // vue-全局-页面
│   │   └── 404.vue                                         // vue-404-页面
│   │   └── home.vue                                        // vue-主页-页面
│   │   └── login.vue                                       // vue-登录-页面
|   ├── pages
        ├─moduledoctor                                      // file-互联网诊室
        │  │  image-inquiry.vue                             // vue-图文问诊-页面
        │  │  mine-pharmacy.vue                             // vue-我的药房-页面
        │  │  mine-prescription.vue                         // vue-我的处方-页面
        │  │  record-inquiry.vue                            // vue-问诊记录-页面
        │  │  record-prescription.vue                       // vue-处方记录-页面
        │  │  video-interrogation.vue                       // vue-视频问诊-页面
        │  │  video-lists.vue                               // vue-问诊列表-页面
        │  │
        │  ├─magecomponents
        │  │  └─outpatientinfo
        │  │          index.vue
        │  │
        │  ├─minecomponents                                 // file-我的模块
        │  │      pharmacy-add-dialog.vue                   // vue-药房新增药品弹窗-组件
        │  │      prescription-add-dialog.vue               // vue-处方修改及新增弹窗-组件
        │  │
        │  ├─recordcomponents                               // file-记录模块
        │  │  │  inquiry.vue                                // vue-问诊记录详情-组件
        │  │  │  prescription.vue                           // vue-处方记录详情-组件
        │  │  │
        │  │  └─inquirycomponents                           // file-问诊详情弹窗分拆
        │  │          record-communicate-img.vue            // vue-图文问诊历史记录-组件
        │  │          record-communicate-video.vue          // vue-视频问诊历史记录-组件
        │  │          record-inquiry.vue                    // vue-问诊报告-组件
        │  │          record-patient-info.vue               // vue-病情描述-组件
        │  │
        │  └─videocomponents                                // file-视频问诊
        │      ├─drugmodules                                // file-常用药、处方模块-组件
        │      │      common-drug.vue                       // vue-常用药-组件
        │      │      common-prescription.vue               // vue-常用处方-组件
        │      │      history-prescription.vue              // vue-历史患者处方-组件
        │      │      index.vue                             // vue-模块输出口-组件
        │      │
        │      ├─healthrecords                              // file-健康档案
        │      │      health-home.vue                       // vue-居家数据-组件
        │      │      health-hospital.vue                   // vue-医院病例-组件
        │      │      health-info.vue                       // vue-基本信息-组件
        │      │      health-internet.vue                   // vue-互联网病例-组件
        │      │      index.vue                             // vue-模块输出口-组件
        │      │
        │      ├─patientdialog                              // file-病例悬浮框
        │      │      patient-hospital-dialog.vue           // vue-医院病例悬浮框-组件
        │      │      patient-internet-dialog.vue           // vue-互联网病例悬浮窗-组件
        │      │
        │      ├─patienthandle                              // file-患者信息组件
        │      │      handle-des.vue                        // vue-病情描述-组件
        │      │      handle-prescription.vue               // vue-门诊处方-组件
        │      │      handle-records.vue                    // vue-门诊病例-组件
        │      │      handle-tab.vue                        // vue-tab栏-组件
        │      │      index.vue                             // vue-模块输出口-组件
        │      │
        │      └─videoroom                                  // file-视频窗口
        │              video-ing.vue                        // vue-医生、患者视频-组件
        │
        ├─modulemanager
        │      menu-editauth.vue                            // vue-权限组件
        │      menu-editmenu.vue                            // vue-菜单组件
        │      menu-edittop.vue                             // vue-顶级菜单组件
        │      menu.vue                                     // file-菜单管理-页面
        │      schedule.vue                                 // file-医生排班-页面
        │
        └─modulepharmacist                                  // file-药师模块
                pharmacist-workbench.vue                    // vue-药师工作台-页面
├── package.json
├── vue.config.js              // webpack扩展
├── gulpfile.js                // gulp功能
├── commitlint.config.js       // git校验
├── babel.config.js            // babel配置
├── .prettierrc.yaml           // 格式化配置 - Prettier -Code formatter 插件
├── .eslintrc.js               // ESLint校验
├── .editorconfig.js           // 编辑器规则覆盖
├── .gitignore.js              // git忽略
├── public                     // 资源 - 此处资源不会被webpack打包
|   ├── setting                // 不同环境域名
|   ├── static                 // 静态资源
|   ├── index.html             // 首页模板
|   ├── favicon.ico            // 网址logo
├── src
│   ├── App.vue
│   ├── main.js                // 项目入口
│   ├── assets
│   │   └── icon
│   │   └── images
│   │   └── scss               // 基础样式
│   ├── components             // 公共组件
│   │   ├── sn-scroll          // 滚动翻页组件
│   │   │   └── sn-scroll.vue
│   ├── premission             // 自定义指令
│   │   └── index.js
│   ├── locales                // 国际化
│   │   └── vant.js            // vant ui
│   ├── mixins                 // 混入
│   │   └── router.js
│   ├── mock                   // 数据模拟
│   │   └── api
│   │       ├── ajax.js
│   │       └── index.js
│   ├── plugins                // 插件
│   │   └── vant.js            // vantUi组件的按需引入
│   │   └── wxsdk.js           // 微信js-sdk
│   ├── filters                // 全局过滤器
│   │   └── index.js           // 过滤器函数集合
│   ├── router                 // 路由
│   ├── store                  // vuex
│   │   └── index.js           // store入口，全局的state、mutations、actions...
│   │   └── modules            // store模块
│   │   │   └── common.js      // 通用
│   ├── utils                  // 工具类
│   │   └── bus.js             // 公共巴士
│   │   └── dom.js             // 操作dom
│   │   └── encrypt.js         // 加解密
│   │   └── index.js           // 常用方法
│   │   └── validation.js      // 校验
