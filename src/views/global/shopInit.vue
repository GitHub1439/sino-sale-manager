<template>
    <div class='shop-init' v-loading='loading'>
        <shop-header></shop-header>
        <div class='content'>
            <div class='title'>
                <div class='title-image'></div>
                <div>店铺初始化</div>
            </div>
            <div class='step'>
                <div class='step-active-one'>
                    <div class='step-0'></div>
                    基本信息
                </div>
                <div
                    :class="[active === 1 || active === 2 || active === 3 || active === 4 ? 'step-active' : 'step-bg']"
                >
                    <div
                        :class="[active === 1 || active === 2 || active === 3 || active === 4 ? 'step-i-a-1' : 'step-i-1', 'step-i']"
                    ></div>
                    <el-popover
                        placement="top"
                        title=""
                        width="200"
                        trigger="hover"
                        content="指店铺内可销售的三诺产品范围；"
                    >
                        <div slot="reference">商品导入</div>
                    </el-popover>
                </div>
                <div :class="[active === 2 || active === 3 || active === 4 ? 'step-active' : 'step-bg']">
                    <div
                        :class="[active === 2 || active === 3 || active === 4 ? 'step-i-a-2' : 'step-i-2', 'step-i']"
                    ></div>
                    <el-popover
                        placement="top"
                        title=""
                        width="200"
                        trigger="hover"
                        content="指产品的销售分类；"
                    >
                        <div slot="reference">品类维护</div>
                    </el-popover>
                </div>
                <div :class="[active === 3 || active === 4 ? 'step-active' : 'step-bg']">
                    <div :class="[active === 3 || active === 4 ? 'step-i-a-3' : 'step-i-3', 'step-i']"></div>
                    <el-popover
                        placement="top"
                        title=""
                        width="200"
                        trigger="hover"
                        content="指店铺各类业务参数设置；"
                    >
                        <div slot="reference">参数设置</div>
                    </el-popover>
                </div>
                <div :class="[active === 4 ? 'step-active' : 'step-bg']">
                    <div :class="[active === 4 ? 'step-i-a-4' : 'step-i-4', 'step-i']"></div>
                    完成确认
                </div>
            </div>

            <div class='middle' v-if='active === 0'>
                <div class='cen'>
                    <i class='cen-i'>基本信息：</i>
                    <div class='cen-line'>
                        <label class='cen-shop-l'><i class='red'>*</i>商家名称</label>
                        <el-input v-model='basicInfo.storeName'></el-input>
                    </div>
                    <div class='cen-line'>
                        <label class='cen-shop-l'><i class='red'>*</i>店长姓名</label>
                        <el-input v-model='basicInfo.masterName'></el-input>
                    </div>
                    <div class='cen-line'>
                        <label class='cen-shop-l'><i class='red'>*</i>店长电话</label>
                        <el-input v-model='basicInfo.masterPhone'></el-input>
                    </div>
                    <div class='cen-line'>
                        <label class='cen-shop-l'><i class='red'>*</i>商家地址</label>
                        <el-input v-model='basicInfo.storeAddress'></el-input>
                    </div>
                    <i class='cen-i' style='margin-top: 0.2rem; display: inline-block;'>资质信息：</i>
                    <div class='cen-line'>
                        <label class='cen-shop-l' style='margin-right: 0.2rem'><i class='red'>*</i>营业执照号</label>
                        <el-input v-model='basicInfo.storeCertificateNum'></el-input>
                    </div>

                    <div class='zi-zhi'><i class='red'>*</i>经营资质扫描件</div>
                    <div class='up-file'>
                        <div>
                            <el-upload
                                :limit='1'
                                class='avatar-uploader'
                                :headers='headers'
                                :action='action'
                                :show-file-list='false'
                                :on-success='handleAvatarSuccess'
                                :before-upload='beforeAvatarUpload'
                            >
                                <img v-if='basicInfo.storeCertificate' :src='basicInfo.storeCertificate' class='avatar'>
                                <div v-else class='up'>
                                    <div class='avatar-img'></div>
                                </div>
                            </el-upload>
                            <div class='te'>营业执照副本</div>
                        </div>

                        <!-- <div>
                            <el-upload
                                :limit='1'
                                class='avatar-uploader'
                                :headers='headers'
                                :action='action'
                                :show-file-list='false'
                                :on-success='handleAvatarSuccessStore'
                                :before-upload='beforeAvatarUpload'
                            >
                                <img v-if='basicInfo.storePermit' :src='basicInfo.storePermit' class='avatar'>
                                <div v-else class='up'>
                                    <div class='avatar-img'></div>
                                </div>
                            </el-upload>
                            <div class='te'>医疗器械资质</div>
                        </div> -->
                    </div>

                    <div class='zi-zhi'><i class='red'>*</i>医疗器械资质</div>
                    <div class='up-file'>

                           <el-upload
                                :limit='6'
                                list-type="picture-card"
                                class='avatar-uploader'
                                :headers='headers'
                                :action='action'
                                show-file-list="false"
                                :file-list="fileList"
                                :on-remove="handleRemove"
                                :on-success='handleAvatarSuccessStore'
                                :before-upload='beforeAvatarUpload'
                            >
                               <i class="el-icon-plus"></i>
                            </el-upload>

                    </div>
                </div>
            </div>

            <div class='step-m-2' v-show='active === 1'>
                <div class='step-m-l'>
                    <img src='../../assets/images/shopInit/764@2x.png' class='step-m-l-i'>
                </div>
                <div class='step-m-r'>
                    <!-- <div class="step-2-t">
                      <el-input v-model="productName" @change="productNameSearch"></el-input>
                      <div class="step-2-t-b">导入到店铺</div>
                    </div> -->
                    <div>
                        <el-table
                            ref='multipleTable'
                            :row-key='getRowKeys'
                            @selection-change='handleSelectionChange'
                            @select-all='onTableSelectAll'
                            :data='getAllProductListData'
                            height='5.23rem'
                            border
                            style='width: 100%;'
                        >
                            <el-table-column
                                :reserve-selection=true
                                type='selection'
                                width='40'
                            >
                            </el-table-column>
                            <el-table-column
                                prop='productName'
                                label='产品名称'
                            >
                            </el-table-column>
                            <el-table-column
                                prop='productSn'
                                label='产品编码'
                            >
                            </el-table-column>
                            <el-table-column
                                prop='productCategoryName'
                                label='所属分类'
                            >
                            </el-table-column>
                            <el-table-column
                                prop='productModel'
                                label='型号规格'
                            >
                            </el-table-column>
                            <!-- <el-table-column
                              prop="msrp"
                              label="建议零售价">
                            </el-table-column> -->
                            <el-table-column
                                prop='productPic'
                                label='配图'
                            >
                                <template slot-scope='scope'>
                                    <img :src='scope.row.productPic' style='width: 1rem; height: 1rem; display: block;'>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop='productDesc'
                                label='产品说明'
                            >
                            </el-table-column>
                        </el-table>
                        <div class='sn-row flex-end' style='margin-top: 10px;'>
                            <el-pagination
                                class='width-auto'
                                background
                                layout='total, prev, pager, next, sizes, jumper'
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size='pageObj.size'
                                :total='pageObj.total'
                                :current-page='pageObj.currentPage'
                                @current-change='pageObj.func'
                                @size-change='pageObj.handleSizeChange'
                            ></el-pagination>
                        </div>
                    </div>
                </div>
            </div>

            <div class='step-m-3' v-if='active === 2'>
                <div class='step-m-3-l'>
                    <!-- <div class="add">
                      <img class="add-i" src="../../assets/images/shopInit/xinzeng@2x.png">
                      <span>新增</span>
                    </div> -->
                    <div class='add-list'>
                        <img class='add-top' src='../../assets/images/shopInit/773@2x.png' @click='down'>
                        <div :style="{height:height*lineNum + 'rem'}" class='rollScreen_container'>
                            <div :style='transform' class='rollScreen_list'>
                                <!-- <div class="add-list-item" v-for="(item, index) in product" :key="index" @click="productClick(item, index)"> -->
                                <div
                                    class='add-list-item'
                                    v-for='(item, index) in productLeft'
                                    :key='index'
                                    @click='productClick(item, index)'
                                >
                                    <img
                                        class='item-stop'
                                        src='../../assets/images/shopInit/jinzhi@2x.png'
                                        v-if='index < 2'
                                    >
                                    <img class='item-logo' :src='item.icon'>
                                    <div class='item-t'>{{item.name}}</div>
                                </div>
                            </div>
                        </div>
                        <img class='add-bottom' src='../../assets/images/shopInit/774@2x.png' @click='up'>
                    </div>
                </div>
                <div class='step-m-3-r'>
                    <div class='shop-logo'>
                        <span class='shop-logo-t' style='vertical-align: top;'>品类图标</span>
                        <!-- <img class="shop-logo-i" :src="../../assets/images/shopInit/pingtaihuodongku@2x.png"> -->
                        <div class='shop-logo-i-l'>
                            <div
                                :class="[ activeIcon == item.dictKey ? 'shop-product-w-a' : '', 'shop-product-w']"
                                v-for='(item, index) in productChoice'
                                :key='index'
                                @click='actvieProduct(item)'
                            >
                                <img class='shop-logo-i' :src='item.dictKey'>
                            </div>
                        </div>
                    </div>
                    <div class='line'>
                        <label class='shop-logo-t'>品类名称</label>
                        <el-input v-model='productForm.name'></el-input>
                    </div>
                    <div class='line' style='margin-top: 0.36rem;'>
                        <label class='shop-logo-t'>排序显示</label>
                        <!-- <el-input></el-input> -->
                        <el-input-number v-model='productForm.sort' :min='3' :max='10'></el-input-number>
                        <!-- <el-input-number size="mini" v-model="num4" style="margin-top: 0.36rem;"></el-input-number> -->
                    </div>
                    <div class='line'>
                        <label class='shop-logo-t' style='margin-bottom: 1.03rem; display: inline-block;'>备注说明</label>
                        <el-input type='textarea' v-model='productForm.description'></el-input>
                    </div>
                    <div class='opea'>
                        <div class='delete' style='margin-right: 1.08rem;' @click='productDelete'>
                            <img src='../../assets/images/shopInit/shanchu1@2x.png'>
                            删除
                        </div>
                        <div class='save' @click='productSave'>
                            <img src='../../assets/images/shopInit/baocun@2x.png'>
                            保存
                        </div>
                    </div>
                </div>
            </div>

            <div class='step-m-param' v-if='active === 3'>
                <div class='m-param'>
                    <i class='cen-i'>基本参数:</i>
                    <div class='cen-line'>
                        <label class='cen-shop-l' style='display:inline-block; margin-bottom: 0.68rem;'><i
                            class='red'
                        >*</i>店铺公告</label>
                        <el-input type='textarea' v-model='basicParam.storeNotice'></el-input>
                    </div>
                    <div class='cen-line'>
                        <label class='cen-shop-l'><i class='red'>*</i>店铺标签</label>
                        <!-- <el-input v-model="basicParam.storeLabels"></el-input> -->
                        <div class='switch-list'>
                            <el-tag
                                :key='tag'
                                v-for='tag in dynamicTags'
                                closable
                                :disable-transitions='false'
                                @close='handleClose(tag)'
                            >
                                {{tag}}
                            </el-tag>
                            <el-input
                                class='input-new-tag'
                                v-if='inputVisible'
                                v-model='inputValue'
                                ref='saveTagInput'
                                size='small'
                                @keyup.enter.native='handleInputConfirm'
                                @blur='handleInputConfirm'
                            >
                            </el-input>
                            <el-button v-else class='button-new-tag' size='small' @click='showInput'>+ 新增</el-button>
                        </div>

                        <!-- <el-input
                          class="input-new-tag"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button class="button-new-tag" size="small" @click="showInput">+ 新增</el-button> -->
                    </div>
                    <div class='cen-line' style='display: flex;'>
                        <label class='cen-shop-l'><i class='red'>*</i>支付方式</label>
                        <div class='switch-list' @click='payClick'>
                            <switch-tag title='微信支付' v-model='wechat'></switch-tag>
                            <switch-tag title='银行转账' v-model='bank'></switch-tag>
                            <switch-tag title='授信月结' v-model='month'></switch-tag>
                            <switch-tag title='物流代收' v-model='wuliu'></switch-tag>
                            <switch-tag title='微信在线支付' v-model='wechatLine'></switch-tag>
                        </div>
                    </div>
                    <div class='cen-line' style='display: flex; margin-bottom: 1.6rem'>
                        <label class='cen-shop-l'><i class='red'>*</i>发货方式</label>
                        <div class='switch-list' @click='wuliuClick'>
                            <switch-tag title='物流发货' v-model='wilo'></switch-tag>
                            <switch-tag title='快递发货' v-model='kuaidi'></switch-tag>
                            <switch-tag title='商家配送' v-model='shop'></switch-tag>
                            <switch-tag title='客户自提' v-model='kehu'></switch-tag>
                        </div>
                    </div>
                    <!-- <i class='cen-i' style='display: inline-block;'>资质信息：</i> -->
                    <!-- <div class='cen-line'>
                        <label class='cen-shop-l'><i class='red'>*</i>编码规则</label>
                        <el-input v-model='basicParam.merchantStoreExtCodeRule'></el-input>
                    </div> -->
                    <!-- <div class='cen-line' style='display: flex;'>
                        <label class='cen-shop-l'><i class='red'>*</i>仓库设置</label>
                        <div class='switch-list'>
                            <switch-tag title='启用库存控制' v-model='cangkuSet' @click='cangkuSetClick'></switch-tag>
                        </div>
                    </div> -->
                    <!-- <div class="line">
                      <label class="shop-logo-t" style="margin-bottom: 1.03rem; display: inline-block;">备注说明</label>
                      <el-input type="textarea"></el-input>
                    </div> -->
                </div>
            </div>

            <div class='step-m-4' v-if='active === 4'>
                <div class='step-m-4-l'>
                    <p class='step-m-4-l-t'>绑定账号</p>
                    <div class='qrcode-bg'>
                        <!-- <img src="../../assets/images/shopInit/timg[6]@2x.png" class="qrcode"> -->
                        <div class='qrcode-bg-t'>{{basicInfo.storeName}}</div>
                        <img :src='proCode' class='qrcode'>
                    </div>
                </div>
                <div class='step-m-4-r'>
                    <div class='step-m-4-r-t'>
                        <img src='../../assets/images/shopInit/chenggong@2x.png'>
                        <p>绑定账号</p>
                    </div>
                    <div class='step-m-4-r-tt'>
                        请用微信扫一扫左边二维码，用于绑定自己的线上店铺， 便于模拟门店身份进入自家店铺，查看店铺设置是否正常， 或特定价格设置等测试操作。
                    </div>
                    <div class='step-m-4-r-tb' style='margin-top: 0.4rem;'>1、可以多人一起绑定，都将归属同一个测试客户；</div>
                    <div class='step-m-4-r-tb'>2、产生的测试订单会在7天后自动清除；</div>
                    <div class='step-m-4-r-tb'>3、测试门店下单数据将不计算到正常销量范围；</div>
                </div>
            </div>

            <div class='footer'>
                <div class='pre' @click='pre' v-if='active === 0'>
                    <img class='pre-i' src='../../assets/images/shopInit/shangxiazuoyouTriangle14@2x.png'>
                    <span>上一步</span>
                </div>
                <div class='pre-a' @click='pre' v-if='active === 1 || active === 2 || active === 3'>
                    <img class='pre-i' src='../../assets/images/shopInit/shangxiazuoyouTriangle1@2x.png'>
                    <span>上一步</span>
                </div>
                <div class='next' @click='save' v-if='active === 3'>
                    <span>提交设置</span>
                    <img class='next-i' src='../../assets/images/shopInit/shangxiazuoyouTriangle14@2x(1).png'>
                </div>
                <div class='next' @click='next' v-if='active === 0 || active === 1 || active === 2'>
                    <span>下一步</span>
                    <img class='next-i' src='../../assets/images/shopInit/shangxiazuoyouTriangle14@2x(1).png'>
                </div>
                <div class='next' @click='join' v-if='active === 4'>
                    <span>进入系统</span>
                    <img
                        class='next-i'
                        style='width: 0.31rem; height: 0.31rem;'
                        src='../../assets/images/shopInit/denglu@2x.png'
                    >
                </div>
            </div>
        </div>
        <el-dialog title="告知函" :visible.sync="maskHidd" :close-on-click-modal="false" :append-to-body="true" :show-close="false" width="600px">
            <span class="notification-title">器械邦告知函</span>
            <div class="notification-content">
                <p>尊敬的合作伙伴，您好！欢迎注册器械邦，器械邦的宗旨是让全球最优秀的品牌商资源为终端服务，为了让您更加了解并运用好这个平台，在此特别提醒您认真阅读此函件：</p>
                <p>1、平台店铺所有者为已注册的经销商，三诺生物传感股份有限公司作为平台提供者，目的是让客户在广度和深度上更好的开发和贴近用户，更好的推广产品；</p>
                <p>2、在整个平台使用过程中，三诺生物传感股份有限公司不会获取您的终端用户信息，并会对您的终端客户信息就行保密；</p>
                <p>3、平台的用户支付方式由您自主确定，平台不做任何限制和要求；</p>
                <span class="disFlex-mid">
                    <el-checkbox v-model="checkedValue" style="margin-right: 10px;"></el-checkbox>
                    我已认真阅读并知晓用户协议
                </span>
            </div>
            <div class="disFlex-rig" style="display: flex;justify-content: flex-end;">
                <el-button type="primary" @click="buttonSubmit()" :disabled="!checkedValue">我已知晓</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import shopHeader from '../../components/header'
import switchTag from '../../components/switchTag'
// import Template from '../pages/mouduleconsulting/components/schemeinfo/template.vue'
export default {
    name: '',
    components: {
        shopHeader,
        switchTag
        // Template
    },
    watch: {
        pay(newQuestion, oldQuestion) {
            console.log(newQuestion)
        }
    },
    computed: {
        transform() {
            return 'transform:translateY(-' + this.num * this.height + 'rem);'
        }
    },
    data() {
        return {
            loading: false,
            // 上传文件
            action: window.SITE_CONFIG.baseUrl + '/sino-resource/oss/endpoint/put-file',
            headers: {
                'Sino-Auth': localStorage.getItem('Sino-Auth')
            },
            fileList: [],
            active: 0,
            height: '0.84',
            num: 0,
            lineNum: 6,
            dynamicTags: ['配送及时', '方便快捷', '促销力度大', '包邮', '优质'], // 标签
            inputVisible: false,
            inputValue: '',
            productLeft: [{
                icon: 'https://sino-cloud-base.oss-cn-hangzhou.aliyuncs.com/fileupload-product/qixiebang/rexiao2x.png',
                sort: 1,
                name: '热销产品', // 品牌名称
                // sortNum: 1,
                type: '1',
                description: ''
            }, {
                icon: 'https://sino-cloud-base.oss-cn-hangzhou.aliyuncs.com/fileupload-product/qixiebang/pingtaihuodongku2x.png',
                sort: 2,
                name: '活动商品', // 品牌名称
                // sortNum: 1,
                type: '2',
                description: ''
            }],
            productChoice: [],
            pay: true,
            pageObj: {
                size: 100,
                total: 0,
                currentPage: 1,
                func: (currentPage) => {
                    this.pageTurning(currentPage)
                },
                handleSizeChange: (size) => {
                    this.sizeChange(size)
                }
            },
            basicInfo: { // 基本信息
                storeName: '',
                masterName: '',
                masterPhone: '',
                storeAddress: '',
                storeCertificateNum: '',
                storeCertificate: '',
                //storePermit: ''
            },
            getAllProductListData: [],
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            // productName: '', // 搜索
            multipleSelection: [],
            factoryProductIds: [], // 品牌导入id
            // 品类
            activeIcon: '',
            productForm: {
                icon: '',
                sort: 3,
                name: '', // 品牌名称
                // sortNum: 1,
                type: 0,
                description: ''
            },
            wechat: true,
            wechatLine: true,
            bank: true,
            month: true,
            wuliu: true,
            wilo: true,
            kuaidi: true,
            shop: true,
            kehu: true,
            cangkuSet: true,
            // 基本参数
            basicParam: {
                storeNotice: '',
                storeLabels: '',
                merchantStoreExtPaytype: '1,1,1,1,1', // 支付方式
                merchantStoreExtSendtype: '1,1,1,1', // 发送方式
                merchantStoreExtCodeRule: '',
                merchantStoreExtSkuSetting: '1'
            },
            proCode: '',
            maskHidd: true,
            hiddButton: true,
            checkedValue: false
        }
    },
    created() {
        this.getAllProductList()
        this.dictionary()
    },
    methods: {
        // 上传文件
        handleAvatarSuccess(res) {
            this.basicInfo.storeCertificate = res.data.link // URL.createObjectURL(file.raw)
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList;
      },
        handleAvatarSuccessStore(res) {
            this.fileList.push({url:res.data.link});
            console.log('this.fileList',this.fileList);
           // this.basicInfo.storePermit = res.data.link // URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 9
            if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 9MB!')
            }
            return isIMAGE && isLt2M
        },

        // 页码改变
        pageTurning(page) {
            this.pageObj.currentPage = page
            this.getAllProductList()
        },
        // 页面数量改变
        sizeChange(size) {
            this.pageObj.size = size
            this.getAllProductList()
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row)
                })
            } else {
                this.$refs.multipleTable.clearSelection()
            }
        },
        getRowKeys(row) {
            return row.id
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.factoryProductIds = []
            this.multipleSelection.map((item, index) => {
                this.factoryProductIds.push(item.id)
            })
            console.log('factoryProductIds', this.factoryProductIds)
        },
        onTableSelectAll(val) {
            this.multipleSelection = val
            this.factoryProductIds = []
            this.multipleSelection.map((item, index) => {
                this.factoryProductIds.push(item.id)
            })
            console.log('factoryProductIds', this.factoryProductIds)
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },

        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        join() {
            this.$router.push({path: '/shop-shop-index'})
        },
        next() {
            // 基本信息
            if (this.active === 0) {
                if (this.basicInfo.storeName === '') {
                    this.$message('请填写商家名称')
                    return
                }
                if (this.basicInfo.masterName === '') {
                    this.$message('请填写店长姓名')
                    return
                }
                if (this.basicInfo.masterPhone === '') {
                    this.$message('请填写店长电话')
                    return
                }
                if (this.basicInfo.storeAddress === '') {
                    this.$message('请填写商家地址')
                    return
                }
                if (this.basicInfo.storeCertificateNum === '') {
                    this.$message('请填写营业执照号')
                    return
                }
                if (this.basicInfo.storeCertificate === '') {
                    this.$message('请上传营业执照副本')
                    return
                }
                // if (this.basicInfo.storePermit === '') {
                //     this.$message('请上传医疗器械资质')
                //     return
                // }
            }
            if (this.active === 1) {
                if (this.factoryProductIds.length === 0) {
                    this.$message('请选择品牌')
                    return
                }
            }

            if (this.active < 4) {
                this.active++
            }
            console.log('basicInfo', this.basicInfo)
        },
        pre() {
            if (this.active > 0) {
                this.active--
            }
        },
        up() {
            if (this.num !== this.productLeft.length - 1) {
                this.num++
            }
        },
        down() {
            if (this.num != 0) {
                this.num--
            }
        },
        // 业务代码
        // productNameSearch () {
        //   this.getAllProductList()
        // },
        actvieProduct(item) {
            this.activeIcon = item.dictKey
            // this.productForm.sortNum = item.sort
            this.productForm.icon = item.dictKey
        },
        productDelete() {
            if (this.productForm.sort !== '') {
                this.productLeft.map((item, index) => {
                    if (this.productForm.sort == item.sort) {
                        this.productLeft.splice(index, 1)
                    }
                })
            } else {
                this.$message('请选择要删除的品类')
            }

        },
        compare(property) {
            return function(a, b) {
                let value1 = a[property]
                let value2 = b[property]
                return value1 - value2
            }
        },
        productSave() {
            if (this.productForm.name === '') {
                this.$message('请填写品类名称')
                return
            }
            console.log(this.productForm)
            for (let i = 0; i < this.productLeft.length; i++) {
                if (this.productLeft[i].name === this.productForm.name) {
                    this.$message('不能添加重复品类名称')
                    return
                }
            }

            this.productLeft.push({...this.productForm})
            this.productLeft.sort(this.compare('sort'))
            // this.productLeft.sort((a, b) => {
            //   return String(a.sort).localeCompare(String(b.sort));
            // })

            console.log('merchantStoreProductCategoryList', this.productLeft)
            // this.save()
        },
        productClick(item, index) {
            if (index >= 2) {
                this.activeIcon = item.icon
                console.log('activeIcon', this.activeIcon)
                this.productForm = {...item}
            }
        },
        getAllProductList() {
            let param = {
                // productName: this.productName
                productName: '',
                productType: 0,
                current: this.pageObj.currentPage,
                size: this.pageObj.size
            }
            this.$get(this.$api.shopInit.getAllProductList, param).then(data => {
                if (data && data.code === 200) {
                    this.getAllProductListData = data.data.records
                    this.pageObj.total = data.data.total
                }
            })

        },
        payClick() {
            this.basicParam.merchantStoreExtPaytype = (this.month ? '1' : '0') + ',' + (this.wechat ? '1' : '0') + ',' + (this.wuliu ? '1' : '0') + ',' + (this.bank ? '1' : '0') + ',' + (this.wechatLine ? '1' : '0')
            // console.log(this.basicParam.merchantStoreExtPaytype)
        },
        wuliuClick() {
            this.basicParam.merchantStoreExtSendtype = (this.wilo ? '1' : '0') + ',' + (this.kuaidi ? '1' : '0') + ',' + (this.shop ? '1' : '0') + ',' + (this.kehu ? '1' : '0')
            // console.log(this.basicParam.merchantStoreExtPaytype)
        },
        cangkuSetClick() {
            this.basicParam.merchantStoreExtSkuSetting = this.cangkuSet ? '1' : '0'
        },
        save() {
            let param = {}
            Object.assign(param, this.basicInfo, this.basicParam)
            param.storeLabels = this.dynamicTags.join(',')
            if (this.basicParam.storeNotice === '') {
                this.$message('请填写店铺公告')
                return
            }
            if (param.storeLabels === '') {
                this.$message('请填写店铺标签')
                return
            }
            // if (this.basicParam.merchantStoreExtCodeRule === '') {
            //     this.$message('请填写编码规则')
            //     return
            // }
            param.factoryProductIds = this.factoryProductIds
            param.merchantStoreProductCategoryList = this.productLeft
            this.loading = true
            this.$post(this.$api.shopInit.merchantStoreInit, param).then(data => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.proCode = data.data.proCode
                    this.active++
                    // this.productChoice = data.data
                    // this.productForm.icon = this.productChoice[0].dictKey
                } else {
                    this.loading = false
                    this.$message.error(data.msg)
                }
            })
            console.log('param', param)
        },
        // 字典
        dictionary() {
            let param = {
                code: 'category_cons'
            }
            this.$get(this.$api.shopInit.dictionary, param).then(data => {
                if (data && data.code === 200) {
                    this.productChoice = data.data
                    this.activeIcon = this.productChoice[0].dictKey
                    this.productForm.icon = this.productChoice[0].dictKey
                }
            })
        },
        buttonSubmit() {
            this.maskHidd = !this.maskHidd
        }
    }
}
</script>

<style lang='scss' scoped>
.shop-init {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
}

.content {
    margin-top: 0.2rem;
    margin: 0.2rem 0.1rem 0.1rem 0.1rem;
    background: #ffffff;
    border-radius: 0.1rem;
    // height: 9.63rem;
    padding-bottom: 0.38rem;
}

.title {
    text-align: center;
    font-weight: 400;
    padding-top: 0.37rem;
    margin-bottom: 0.4rem;
    font-size: 0.34rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    display: flex;
    justify-content: center;
}

.title-image {
    background-image: url("../../assets/images/shopInit/circle.png");
    background-size: 100%;
    background-repeat: no-repeat;
    width: 0.41rem;
    height: 0.45rem;
    display: inline-block;
    margin-right: 0.3rem;
}

.step {
    width: 17.98rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.24rem;
}

.step-active-one {
    width: 3.50rem;
    height: 0.8rem;
    background-image: url("../../assets/images/shopInit/557.png");
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
}

.step-active {
    width: 3.50rem;
    height: 0.8rem;
    background-image: url("../../assets/images/shopInit/558.png");
    background-size: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
}

.step-bg {
    width: 3.5rem;
    height: 0.8rem;
    background-image: url("../../assets/images/shopInit/556.png");
    background-size: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.step-i {
    width: 0.44rem;
    height: 0.44rem;
    background-size: 100%;
    margin-right: 0.37rem;
}

.step-i-a-1 {
    background-image: url("../../assets/images/shopInit/tongyi-31.png");
    background-size: 100%;
    background-repeat: no-repeat;
}

.step-i-1 {
    background-image: url("../../assets/images/shopInit/tongyi-32.png");
    background-size: 100%;
    background-repeat: no-repeat;
}

.step-i-a-2 {
    background-image: url("../../assets/images/shopInit/goodsppecate.png");
}

.step-i-2 {
    background-image: url("../../assets/images/shopInit/goodsppecategory.png");
}

.step-i-a-3 {
    background-image: url("../../assets/images/shopInit/canshushe.png");
}

.step-i-3 {
    background-image: url("../../assets/images/shopInit/canshushezhi.png");
}

.step-i-a-4 {
    background-image: url("../../assets/images/shopInit/querena.png");
}

.step-i-4 {
    background-image: url("../../assets/images/shopInit/queren.png");
}

.step-0 {
    width: 0.44rem;
    height: 0.44rem;
    background-image: url("../../assets/images/shopInit/jibenxinxi.png");
    background-size: 100%;
    margin-right: 0.5rem;
}

// 步骤一
.middle {
    width: 10rem;
    height: 6.3rem;
    background: #f2f3f3;
    margin: 0 auto;
    margin-top: 0.17rem;
    margin-bottom: 0.1rem;
    border-radius: 0.05rem;
    overflow: auto;
}

.red {
    margin-left: 0.12rem;
    margin-right: 0.14rem;
    color: #E40137;
    line-height: 0.3rem;
    vertical-align: top;
}

.cen {
    width: 6.52rem;
    margin: 0 auto;
    padding-top: 0.18rem;
}

.cen-i {
    font-size: 0.18rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    margin-bottom: 0.16rem;
    display: block;
}

.cen-line {
    margin-bottom: 0.2rem;
}

.cen-line .el-input {
    height: 0.30rem;
    width: 4.87rem;
    // margin-top: 0.42rem;
}

.cen-line .el-textarea {
    width: 4.86rem;
    height: 0.93rem !important;
    // margin-top: 0.16rem;
}

.cen-line /deep/ .el-textarea__inner {
    height: 100% !important;
}

.cen-shop-l {
    font-size: 0.14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 19px;
    color: #333333;
    margin-right: 0.38rem;
    vertical-align: top;
}

.switch-list {
    // width: 4.86rem;
    width: 5.66rem;
    display: inline-block;
}

// 第二步
.step-m-2 {
    margin: 0 auto;
    margin-top: 0.17rem;
    margin-bottom: 0.1rem;
    width: 12.92rem;
    height: 5.92rem;
    display: flex;
}

.step-m-l {
    width: 2.16rem;
    height: 100%;
    background: #F2F3F3;
    opacity: 1;
    border-radius: 7px;
    margin-right: 0.07rem;
}

.step-m-l-i {
    width: 1.91rem;
    height: 0.97rem;
    margin: 0 auto;
    display: block;
    margin-top: 0.15rem;
}

.step-m-r {
    // width: 100%;
    width: 10.69rem;
    height: 100%;
}

.step-2-t /deep/ .el-input {
    width: 2.76rem;
    background: #F2F3F3;
    opacity: 1;
    border-radius: 0.15rem;
}

.step-2-t-b {
    // width: 0.98rem;
    width: 1.2rem;
    height: 0.30rem;
    background: #FF4D04;
    opacity: 1;
    border-radius: 0.05rem;
    font-size: 0.11rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 0.3rem;
    text-align: center;
    color: #FFFFFF;
    display: inline-block;
    float: right;
    margin-bottom: 0.1rem;
}

// 第三步
.step-m-3 {
    margin: 0 auto;
    margin-top: 0.43rem;
    margin-bottom: 0.1rem;
    // width: 8.09rem;
    width: 12.09rem;
    height: 5.97rem;
    display: flex;
}

.step-m-3-l {
    width: 1.84rem;
    height: 100%;
    // background: #F2F3F3;
    opacity: 1;
    border-radius: 7px;
    margin-right: 0.07rem;
}

.add {
    height: 0.35rem;
    background: #FF4D04;
    opacity: 1;
    border-radius: 0.03rem;
    font-size: 0.21rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 27px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-i {
    width: 0.26rem;
    height: 0.26rem;
    margin-right: 0.15rem;
}

.add-list {
    background: #F2F3F3;
    border-radius: 0.15rem;
    width: 100%;
    height: 5.52rem;
    // margin-top: 0.1rem;
    margin-top: 0.45rem;
    position: relative;
}

.add-top {
    width: 1.84rem;
    height: 0.33rem;
    margin-bottom: 0.02rem;
}

.rollScreen_container {
    position: relative;
    overflow: hidden;
}

.rollScreen_list {
    transition: 0.5s linear;
}

.add-list-item {
    width: 1.58rem;
    height: 0.78rem;
    background: #FFFFFF;
    border-radius: 0.06rem;
    margin: 0 auto;
    margin-top: 0.06rem;
    position: relative;
    // display: flex;
    // justify-content: center;
    // align-items: center;
}

.item-stop {
    width: 0.18rem;
    height: 0.18rem;
    position: absolute;
    top: 0.08rem;
    left: 0.09rem;
}

.item-logo {
    width: 0.4rem;
    height: 0.4rem;
    display: block;
    margin: 0 auto;
    margin-top: 0.06rem;
    margin-bottom: 0.06rem;
}

.item-t {
    height: 0.20rem;
    font-size: 0.15rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    // line-height: 20px;
    color: #FF4D04;
    text-align: center;
}

.add-bottom {
    width: 1.84rem;
    height: 0.33rem;
    position: absolute;
    bottom: 0;
    left: 0;
}

.step-m-3-r {
    width: 100%;
    height: 100%;
    padding-left: 0.94rem;
    margin-top: 0.45rem;
    // background: #F2F3F3;
}

.shop-logo {
    display: flex;
}

.shop-logo-t {
    font-size: 0.14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 19px;
    color: #333333;
    margin-right: 0.4rem;
}

.shop-logo-i-l {
    display: flex;
    width: 7rem;
    overflow: auto;
    white-space: nowrap;
}

.shop-product-w {
    padding: 0.1rem;
}

.shop-product-w-a {
    border: 1px solid #E40137;
}

.shop-logo-i {
    // width: 1.84rem;
    // height: 1.64rem;
    width: 0.8rem;
    height: 0.8rem;
    // margin-right: 0.1rem;
}

// .line {

// }
.line .el-input {
    width: 3.35rem;
    height: 0.30rem;
    margin-top: 0.42rem;
    // margin-left: 0.4rem;
}

.line .el-textarea {
    width: 3.35rem;
    height: 1.27rem !important;
    margin-top: 0.47rem;
}

.line /deep/ .el-textarea__inner {
    height: 100% !important;
}

.opea {
    display: flex;
    margin-top: 0.27rem;
}

.delete, .save {
    width: 1.15rem;
    height: 0.35rem;
    background: #F2F3F3;
    opacity: 1;
    border-radius: 0.03rem;
    display: flex;
    font-size: 0.15rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 20px;
    color: #FF4D04;
    justify-content: center;
    align-items: center;
}

.delete img {
    width: 0.18rem;
    height: 0.18rem;
    margin-right: 0.17rem;
}

.save img {
    width: 0.18rem;
    height: 0.18rem;
    margin-right: 0.17rem;
}

// 第三步
.step-m-param {
    width: 10rem;
    // height: 6.30rem;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 0.07rem;
    margin: 0 auto;
}

.m-param {
    margin-top: 0.35rem;
    margin-left: 1.76rem;
}


// 第四步
.step-m-4-l {
    margin-top: 0.39rem;
    margin-left: 4.29rem;
    display: inline-block;
}

.step-m-4-l .qrcode-bg {
    width: 2.94rem;
    height: 5.29rem;
    opacity: 1;
    border-radius: 0.15rem;
    margin-top: 0.17rem;
    background-image: url('../../assets/images/shopInit/1242.png');
    background-size: 100%;
    position: relative;
}

.qrcode-bg-t {
    padding-top: 1.67rem;
    font-size: 0.13rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
}

.qrcode {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    // top: 3.81rem;
    left: 0.67rem;
    bottom: 0.66rem;
}

.step-m-4-l-t {
    font-size: 0.20rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    // line-height: 26px;
    color: #333333;
    text-align: center;
}

.step-m-4 {
    display: flex;
}

.step-m-4-r {
    margin-top: 1.09rem;
    margin-left: 0.67rem;
    display: inline-block;
}

.step-m-4-r-t {
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 0.20rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    // line-height: 26px;
    color: #FF4D04;
}

.step-m-4-r-tt {
    width: 6.46rem;
    text-indent: 2em;
    // height: 182px;
    font-size: 0.20rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 0.26rem;
    color: #333333;
    margin-top: 0.76rem;
}

.step-m-4-r-tb {
    text-indent: 2em;
    // height: 182px;
    font-size: 0.20rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 0.26rem;
    color: #333333;
}

.step-m-4-r img {
    width: 0.51rem;
    height: 0.51rem;
    margin-right: 0.2rem;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pre {
    width: 1.97rem;
    height: 0.6rem;
    background: #F2F3F3;
    opacity: 1;
    border-radius: 0.1rem;
    font-size: 0.24rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    // line-height: 27px;
    color: #909BAA;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.29rem;
}

.pre-i {
    width: 0.2rem;
    height: 0.35rem;
    margin-right: 0.2rem;
}

.pre-a {
    width: 1.97rem;
    height: 0.6rem;
    background: #FF4D04;
    opacity: 1;
    border-radius: 0.1rem;
    font-size: 0.24rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    // line-height: 27px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.29rem;
}

.next {
    width: 1.97rem;
    height: 0.6rem;
    background: #FF4D04;
    opacity: 1;
    border-radius: 0.1rem;
    font-size: 0.24rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}

.next-i {
    width: 0.2rem;
    height: 0.35rem;
    margin-left: 0.2rem;
}

.te {
    font-size: 0.14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 19px;
    color: #A1A0A1;
    text-align: center;
    margin-left: 0.8rem;
    margin-top: 0.1rem;
}

.zi-zhi {
    font-size: 0.14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #A1A0A1;
    // margin-top: 0.24rem;
}


.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

/deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0.21rem;
    // margin-bottom: 0;
}

/deep/ .el-input--small .el-input__inner {
    height: 0.3rem;
    line-height: 0.42rem;
}

/deep/ .el-form-item__label {
    font-size: 0.14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 0.19rem;
    color: #333333;
}

.el-form /deep/ .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 0.3rem !important;
}

/deep/ .el-form-item__label {
    line-height: 0.3rem !important;
}

// 标签
// .el-tag + .el-tag {
//   margin-left: 10px;
// }
.el-tag {
    margin-right: 10px;
    background-color: #FF4D04;
    border-color: #FF4D04;
    color: #ffffff;
}

/deep/ .el-tag .el-tag__close {
    color: #ffffff;
}

.button-new-tag {
    // margin-left: 10px;
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
    vertical-align: bottom;
    font-size: 0.14rem;
}

.input-new-tag {
    width: 0.9rem;
    // margin-left: 10px;
    // vertical-align: bottom;
    // margin-left: 1.57rem;
    display: block;
}

// 上传文件
.up-file {
    display: flex;
    justify-content: center;
    padding-top: 0.24rem;
}

.avatar-uploader /deep/ .el-upload {
    // border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar {
    width: 1.84rem;
    height: 1.64rem;
    margin-left: 0.8rem;
    border-radius: 6px;
}

.up {
    width: 1.84rem;
    height: 1.64rem;
    background-image: url("../../assets/images/shopInit/271.png");
    background-size: 100%;
    margin-left: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-img {
    width: 1.16rem;
    height: 0.93rem;
    background-image: url('../../assets/images/shopInit/tupian@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.avatar-uploader .el-upload:hover {
    border-color: #FF3F6B;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}

// /deep/ .el-input-number--small .el-input-number__decrease, .el-input-number--small .el-input-number__increase {
//   width: 0.32rem;
//   font-size: 0.13rem;
// }
/deep/ .el-input-number--small {
    line-height: 0.3rem;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FF4E07; // 进行修改选中项背景和字体
}

/deep/.el-checkbox .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#FF4E07!important;
  border-color: #FF4E07!important;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #FF4E07!important;
}
/deep/.el-checkbox.is-bordered.is-checked{
  border-color: #FF4E07!important;
}
/deep/.el-checkbox__input.is-focus .el-checkbox__inner{
  border: 1px solid #FF4E07!important;
}

.notification-title{
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
}

.notification-content{
    margin: 20px 0 ;

    p{
        margin-top: 10px;
    }
}

.disFlex-mid{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.disFlex-rig{
    display: flex;
    justify-content: flex-end;
}
</style>
