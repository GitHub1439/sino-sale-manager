<template>
    <div v-loading="loading">
        <div v-if="detail">
            <div class="top-nav">
                <div class="tabs-card">
                    <el-tabs
                        v-model="activeNavName"
                        type="card"
                        @tab-click="handleClick"
                    >
                        <el-tab-pane label="客户档案" name="0"></el-tab-pane>
                        <el-tab-pane label="客户审批" name="1"></el-tab-pane>
                        <el-tab-pane label="客户标签" name="2"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="form-wrap bgff mgt10" v-if="activeNavName == 0">
                <el-row :gutter="20" style="margin-bottom: 20px">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">客户名称</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="customerName"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">客户代码</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="customerCode"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">客户类型</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="customerType"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20" style="margin-bottom: 20px">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">所属区域</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="region"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">客户地址</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="address"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">联系电话</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="contactPhone"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">客户标签</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="customerLabel"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="mini-switch-navorbtn">
                    <div class="tabs-card" style="flex: 0.5">
                        <el-tabs
                            v-model="myScope"
                            type="card"
                            @tab-click="noCustTypeClick"
                        >
                            <el-tab-pane
                                label="所有客户"
                                name="all"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="冻结客户"
                                name="froze"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="未分类客户"
                                name="notype"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="授信客户"
                                name="credit"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="超3个月未下单"
                                name="noorder"
                            ></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="btnlist">
                         <button @click="getExport"><icon-svg name="tianjia"></icon-svg><span>导出明细</span></button>
                    <!--<button><icon-svg name="bianji"></icon-svg><span>批量出库</span></button>
                    <button><icon-svg name="success"></icon-svg><span>批量确认</span></button> -->
                        <button @click="search">
                            <icon-svg name="sousuo"></icon-svg><span>搜索</span>
                        </button>
                    </div>
                </div>
                <sn-table
                    :table-data="customerData"
                    :columns="columns"
                    :page-obj="pageObj"
                    :is-fit="true"
                >
                    <template slot="status" slot-scope="{scope}">
                        <div>
                            <div v-if="scope.status == 0">否</div>
                            <div v-if="scope.status == 1">是</div>
                        </div>
                    </template>
                    <template slot="customerType" slot-scope="{scope}">
                        <div>
                            <div>
                                {{customerTypeArr[scope.customerType - 1]}}
                            </div>
                        </div>
                    </template>
                    <template slot="operate" slot-scope="scope">
                        <div class="evtbtn">
                            <el-button
                                size="small"
                                type="text"
                                @click="editCustomer(scope.scope)"
                            >
                                编辑
                            </el-button>
                        </div>
                    </template>
                </sn-table>
            </div>
            <div
                class="bgff mgt10"
                style="padding: 10px"
                v-if="activeNavName == 1"
            >
                <div class="mini-switch-navorbtn">
                    <div class="tabs-card" style="flex: 0.5">
                        <el-tabs
                            v-model="activeChecktype"
                            type="card"
                            @tab-click="checkClick"
                        >
                            <el-tab-pane label="待审核" name="0"></el-tab-pane>
                            <el-tab-pane label="已通过" name="1"></el-tab-pane>
                            <el-tab-pane label="已拒绝" name="2"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="btnlist">
                        <!-- <button><icon-svg name="tianjia"></icon-svg><span>导出明细</span></button>
                    <button><icon-svg name="bianji"></icon-svg><span>批量出库</span></button>
                    <button><icon-svg name="success"></icon-svg><span>批量确认</span></button> -->
                        <!--<button @click="shouxin">-->
                        <!--<icon-svg name="sousuo"></icon-svg><span>搜索</span>-->
                        <!--</button>-->
                    </div>
                </div>

            </div>
            <div class="form-wrap bgff mgt10" v-if="activeNavName == 2">


                <el-row :gutter="20" >



                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">客户标签</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="customerLabel"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="mini-switch-navorbtn">

                    <div class="btnlist tabs-card" style="padding: 0 20px 20px;">
                    <button @click="addLabel"><icon-svg name="tianjia"></icon-svg><span>添加标签</span></button>
                        <button @click="labelSearch">
                            <icon-svg name="sousuo"></icon-svg><span>搜索</span>
                        </button>
                    </div>
                </div>
                <sn-table
                    :table-data="labelCustomerData"
                    :columns="labelColumns"
                    :page-obj="labelPageObj"
                    :is-fit="true"
                >


                    <template slot="operate" slot-scope="scope">
                        <div class="evtbtn">
                            <el-button
                                size="small"
                                type="text"
                                @click="editLabel(scope.scope)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                size="small"
                                type="text"
                                @click="delectLabel(scope.scope)"
                            >
                                删除
                            </el-button>
                        </div>
                    </template>
                </sn-table>
            </div>
        </div>

        <div v-if="detail === false">
            <div class="top-nav back" v-if="!showCheck">
                <div class="back-but" @click="back">返回</div>
                <div class="tabs-card">
                    <el-tabs
                        v-model="activeName"
                        type="card"
                        @tab-click="handletwoClick"
                    >
                        <el-tab-pane label="客户详情" name="0"></el-tab-pane>
                        <el-tab-pane label="特殊价格" name="1"></el-tab-pane>
                        <el-tab-pane label="客户授信" name="2"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>

            <div class="middle">
                <div class="basic-info" v-if="activeName === '0'">
                    <el-form
                        :model="editForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <div class="title-w">
                            <icon-svg
                                name="bianji"
                                style="font-size: 22px; margin-left: 16px"
                            ></icon-svg>
                            <i class="title">基本信息：</i>
                        </div>
                        <el-form-item label="客户名称" prop="customerName">
                            <el-input
                                v-model="editForm.customerName"
                            ></el-input>
                        </el-form-item>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="客户代码"
                                        prop="customerCode"
                                    >
                                        <el-input
                                            v-model="editForm.customerCode"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="客户ID" prop="id">
                                        <el-input
                                            v-model="editForm.id"
                                            disabled
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!-- <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="厂商编码"
                                        prop="factoryCode"
                                    >
                                        <el-input
                                            v-model="editForm.factoryCode"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col> -->
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="所属分类"
                                        prop="customerType"
                                    >
                                        <el-select
                                            v-model="editForm.customerType"
                                            placeholder="请选择"
                                            style="width: 100%"
                                        >
                                            <el-option
                                                label="器械批发"
                                                :value="1"
                                            >
                                            </el-option>
                                            <el-option
                                                label="器械店"
                                                :value="2"
                                            >
                                            </el-option>
                                            <el-option
                                                label="连锁药房"
                                                :value="3"
                                            >
                                            </el-option>
                                            <el-option
                                                label="单体药房"
                                                :value="4"
                                            >
                                            </el-option>
                                            <el-option
                                                label="医药公司"
                                                :value="5"
                                            >
                                            </el-option>
                                            <el-option
                                                label="医疗机构"
                                                :value="6"
                                            >
                                            </el-option>
                                            <el-option
                                                label="连锁器械"
                                                :value="7"
                                            >
                                            </el-option>
                                            <el-option
                                                label="连锁无糖"
                                                :value="8"
                                            >
                                            </el-option>
                                            <el-option label="其它" :value="9">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="营业执照"
                                        prop="customerCertificateNum"
                                    >
                                        <el-input
                                            v-model="
                                                editForm.customerCertificateNum
                                            "
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="注册手机"
                                        prop="customerPhone"
                                    >
                                        <el-input
                                            v-model="editForm.customerPhone"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="是否冻结">
                                        <el-switch
                                            v-model="editForm.status"
                                            active-value="1"
                                            inactive-value="0"
                                        ></el-switch>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="客户标签">
                                    <div class="grid-content bg-purple">
                                        <el-tag
                                            :key="tag"
                                            v-for="tag in dynamicTags"
                                            closable
                                            :disable-transitions="false"
                                            @close="handleClose(tag)"
                                        >
                                            {{tag}}
                                        </el-tag>
                                        <el-input
                                            class="input-new-tag"
                                            v-if="inputVisible"
                                            v-model="inputValue"
                                            ref="saveTagInput"
                                            size="small"
                                            @keyup.enter.native="
                                                handleInputConfirm
                                            "
                                            @blur="handleInputConfirm"
                                        >
                                        </el-input>
                                        <el-button
                                            v-else
                                            class="button-new-tag"
                                            size="small"
                                            @click="showInput"
                                        >
                                            +添加标签
                                        </el-button>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="联系人"
                                        prop="contactName"
                                    >
                                        <el-input
                                            v-model="editForm.contactName"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="联系电话"
                                        prop="contactPhone"
                                    >
                                        <el-input
                                            v-model="editForm.contactPhone"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="授信额度"
                                        prop="creditValue"
                                        :rules="this.sxzfTag ? creditValue : [] "
                                    >
                                        <el-input
                                            v-model="editForm.creditValue"
                                        >
                                            <template
                                                slot="append"
                                            >
                                                元
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="授信账期"
                                        prop="creditDay"
                                    >
                                        <el-input-number v-model="editForm.creditDay" :min="0">
                                            <template
                                                slot="append"
                                            >
                                                天
                                            </template>
                                        </el-input-number>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="所在地区"
                                        prop="province"
                                    >
                                        <el-input
                                            disabled
                                            v-model="editForm.province"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label
                                        label-width="10px"
                                        prop="city"
                                    >
                                        <el-input
                                            disabled
                                            v-model="editForm.city"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label
                                        label-width="10px"
                                        prop="region"
                                    >
                                        <el-input
                                            disabled
                                            v-model="editForm.region"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>

                        <!-- <sn-address-select
                            :is-town-show="false"
                            @addressInfo="addressInfo"
                        ></sn-address-select> -->

                        <el-form-item label="所属区域" prop="address">
                            <el-input v-model="editForm.address"></el-input>
                        </el-form-item>

                        <el-form-item label="客户描述" prop="description">
                            <el-input
                                type="textarea"
                                v-model="editForm.description"
                            ></el-input>
                        </el-form-item>

                        <div class="title-w">
                            <icon-svg
                                name="bianji"
                                style="font-size: 22px; margin-left: 16px"
                            ></icon-svg>
                            <i class="title">开票信息:</i>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="开票单位"
                                        prop="billCompany"
                                    >
                                        <el-input
                                            v-model="editForm.billCompany"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="发票类型"
                                        prop="billType"
                                    >
                                        <el-select
                                            v-model="editForm.billType"
                                            placeholder="请选择"
                                            style="width: 100%"
                                        >
                                            <el-option
                                                label="不开发票"
                                                value="0"
                                            >
                                            </el-option>
                                            <el-option
                                                label="普通发票"
                                                value="1"
                                            >
                                            </el-option>
                                            <el-option
                                                label="普通电子发票"
                                                value="2"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="开票税号"
                                        prop="billNumber"
                                    >
                                        <el-input
                                            v-model="editForm.billNumber"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item
                                        label="开票税率"
                                        prop="billRate"
                                    >
                                        <el-input
                                            v-model="editForm.billRate"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>

                        <div class="title-w">
                            <icon-svg
                                name="bianji"
                                style="font-size: 22px; margin-left: 16px"
                            ></icon-svg>
                            <i class="title">资质信息:</i>
                        </div>
                        <div class="up-file">
                            <div class="imgBox">
                                <el-upload
                                    :limit="1"
                                    class="avatar-uploader"
                                    :headers="headers"
                                    :action="action"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img
                                        v-if="editForm.customerCertificate"
                                        :src="editForm.customerCertificate"
                                        class="avatar"
                                    />
                                    <div v-else class="up">
                                        <div class="avatar-img"></div>
                                    </div>
                                </el-upload>

                                <div class="te">
                                    门店营业执照
                                    <i
                                        class="el-icon-zoom-in"
                                        @click="setMaskShow(1)"
                                    ></i>
                                    <el-dialog
                                        :visible.sync="maskShow.pic1"
                                        width="70%"
                                    >
                                        <div>
                                            <img
                                                width="100%"
                                                height="100%"
                                                :src="
                                                    editForm.customerCertificate
                                                "
                                            />
                                        </div>
                                        <span
                                            slot="footer"
                                            class="dialog-footer"
                                        >
                                            <el-button
                                                type="primary"
                                                @click="setMaskShow(1)"
                                            >确 定</el-button>
                                        </span>
                                    </el-dialog>
                                </div>
                            </div>

                            <div>
                                <el-upload
                                    :limit="1"
                                    class="avatar-uploader"
                                    :headers="headers"
                                    :action="action"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccessStore"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img
                                        v-if="editForm.customerPermit"
                                        :src="editForm.customerPermit"
                                        class="avatar"
                                    />
                                    <div v-else class="up">
                                        <div class="avatar-img"></div>
                                    </div>
                                </el-upload>
                                <div class="te">
                                    器械经营资质
                                    <i
                                        class="el-icon-zoom-in"
                                        @click="setMaskShow(2)"
                                    ></i>
                                    <el-dialog
                                        :visible.sync="maskShow.pic2"
                                        width="70%"
                                    >
                                        <div>
                                            <img
                                                width="100%"
                                                height="100%"
                                                :src="editForm.customerPermit"
                                            />
                                        </div>
                                        <span
                                            slot="footer"
                                            class="dialog-footer"
                                        >
                                            <el-button
                                                type="primary"
                                                @click="setMaskShow(2)"
                                            >确 定</el-button>
                                        </span>
                                    </el-dialog>
                                </div>
                            </div>

                            <div>
                                <el-upload
                                    :limit="1"
                                    class="avatar-uploader"
                                    :headers="headers"
                                    :action="action"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSecondSuccess"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img
                                        v-if="
                                            editForm.customerSecondCertificate
                                        "
                                        :src="
                                            editForm.customerSecondCertificate
                                        "
                                        class="avatar"
                                    />
                                    <div v-else class="up">
                                        <div class="avatar-img"></div>
                                    </div>
                                </el-upload>
                                <div class="te">
                                    二类医疗器械经营备案凭证
                                    <i
                                        class="el-icon-zoom-in"
                                        @click="setMaskShow(3)"
                                    ></i>
                                    <el-dialog
                                        :visible.sync="maskShow.pic3"
                                        width="70%"
                                    >
                                        <div>
                                            <img
                                                width="100%"
                                                height="100%"
                                                :src="
                                                    editForm.customerSecondCertificate
                                                "
                                            />
                                        </div>
                                        <span
                                            slot="footer"
                                            class="dialog-footer"
                                        >
                                            <el-button
                                                type="primary"
                                                @click="setMaskShow(3)"
                                            >确 定</el-button>
                                        </span>
                                    </el-dialog>
                                </div>
                            </div>
                        </div>

                        <div class="title-w">
                            <icon-svg
                                name="bianji"
                                style="font-size: 22px; margin-left: 16px"
                            ></icon-svg>
                            <i class="title paymethod">支付方式: </i>
                        </div>
                        <el-row>
                            <el-col :span="5">
                                <div
                                    :class="[
                                        wxzfTag
                                            ? 'wechat-pay act'
                                            : 'wechat-pay',
                                        'grid-content bg-purple'
                                    ]"
                                    @click="selectPay(0)"
                                >
                                    <div class="pay-title">微信支付</div>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div
                                    :class="[
                                        wxskmTag
                                            ? 'wechatCode-pay act'
                                            : 'wechatCode-pay',
                                        'grid-content bg-purple'
                                    ]"
                                    @click="selectPay(1)"
                                >
                                    <div class="pay-title">微信收款码</div>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div
                                    :class="[
                                        yhzfTag ? 'bank-pay act' : 'bank-pay',
                                        'grid-content bg-purple'
                                    ]"
                                    @click="selectPay(2)"
                                >
                                    <div class="pay-title">银行转账</div>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div
                                    :class="[
                                        sxzfTag
                                            ? 'shouxin-pay act'
                                            : 'shouxin-pay',
                                        'grid-content bg-purple'
                                    ]"
                                    @click="selectPay(3)"
                                >
                                    <div class="pay-title">授信额度</div>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div
                                    :class="[
                                        wuzfTag ? 'wuliu-pay act' : 'wuliu-pay',
                                        'grid-content bg-purple'
                                    ]"
                                    @click="selectPay(4)"
                                >
                                    <div class="pay-title">物流代收</div>
                                </div>
                            </el-col>
                        </el-row>

                        <div class="title-w">
                            <icon-svg
                                name="bianji"
                                style="font-size: 22px; margin-left: 16px"
                            ></icon-svg>
                            <i class="title">客户收货地址: </i>
                        </div>
                        <sn-table
                            :table-data="addressData"
                            :columns="columnss"
                            :is-fit="true"
                            :is-pagination-show="false"
                        >
                            <template slot="province" slot-scope="scope">
                                <div>
                                    <div>
                                        {{scope.scope.province +
                                            scope.scope.city +
                                            scope.scope.area}}
                                    </div>
                                </div>
                            </template>
                            <template slot="operate" slot-scope="scope">
                                <div class="evtbtn">
                                    <el-button
                                        size="small"
                                        type="text"
                                        @click="previewSend(scope.scope)"
                                    >
                                        编辑
                                    </el-button>
                                </div>
                                <div class="evtbtn">
                                    <el-button
                                        size="small"
                                        type="text"
                                        @click="deleteAddress(scope.scope)"
                                    >
                                        删除
                                    </el-button>
                                </div>
                            </template>
                        </sn-table>

                        <div class="title-w" style="margin-top: 20px">
                            <icon-svg
                                name="bianji"
                                style="font-size: 22px; margin-left: 16px"
                            ></icon-svg>
                            <i class="title">绑定微信: </i>
                        </div>
                        <div class="wxinfolist">
                            <div
                                class="wxlist"
                                :key="index"
                                v-for="(item, index) in editForm.wxInfoList"
                            >
                                <div>
                                    <img :src="item.avatarUrl" alt="" />
                                </div>
                                <div>{{item.nickName}}</div>
                            </div>
                        </div>
                        <div v-if="showCheck">
                            <el-form-item>
                                <el-button
                                    @click="audApplyCust(2)"
                                >
                                    拒绝审核
                                </el-button>
                                <el-button
                                    type="primary"
                                    @click="audApplyCust(1)"
                                >
                                    审核通过
                                </el-button>
                            </el-form-item>
                        </div>
                        <div v-else>
                            <el-form-item>
                                <el-button @click="resetForm('ruleForm')">
                                    取消
                                </el-button>
                                <el-button
                                    type="primary"
                                    @click="submitForm('ruleForm')"
                                >
                                    保存
                                </el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div class="special-price" v-if="activeName === '1'">
                    <div class="tip">
                        温馨提示：未维护特殊价格的产品，将会根据产品的默认价格策略显示价格；
                    </div>
                    <div class="mini-switch-navorbtn">
                        <div class="tabs-card" style="flex: 0.5">
                            <el-tabs
                                v-model="activeProtype"
                                type="card"
                                @tab-click="selectPrice"
                            >
                                <!-- <el-tab-pane
                                    label="所有产品"
                                    name="2"
                                ></el-tab-pane> -->
                                <el-tab-pane
                                    label="未定价"
                                    name="0"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已定价"
                                    name="1"
                                ></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="btnlist">
                            <!-- <button>
                                 <icon-svg name="tianjia"></icon-svg><span>新增未定价</span></button> -->
                            <!-- <button><icon-svg name="tianjia"></icon-svg><span>导出明细</span></button>
                    <button><icon-svg name="bianji"></icon-svg><span>批量出库</span></button>
                    <button><icon-svg name="success"></icon-svg><span>批量确认</span></button> -->
                            <!--<button @click="shouxin">-->
                            <!--<icon-svg name="sousuo"></icon-svg-->
                            <!--&gt;<span>搜索</span>-->
                            <!--</button>-->
                        </div>
                    </div>
                    <sn-table
                        :table-data="pricetableData"
                        :columns="pricecolumns"
                        :loading="loading"
                        :page-obj="pricepageObj"
                        :is-fit="true"
                    >
                        <template slot="drugName" slot-scope="scope">
                            <div
                                v-for="item in scope.scope.orderItemList"
                                :key="item.name"
                            >
                                <div>{{item.name + item.specs}}</div>
                            </div>
                        </template>
                        <template slot="amount" slot-scope="{scope}">
                            <div>
                                <div>{{'￥' + scope.amount}}</div>
                            </div>
                        </template>
                        <template slot="operate" slot-scope="scope">
                            <div class="evtbtn">
                                <el-button
                                    size="small"
                                    type="text"
                                    @click="editRows(scope.scope)"
                                >
                                    编辑
                                </el-button>
                            </div>
                        </template>
                    </sn-table>
                    <el-dialog
                        :visible.sync="maskShowEditRows"
                        top="3%"
                        title="定价"
                        class="reply-dia"
                        :show-close="true"
                        width="40%"
                    >
                        <div style="display: flex; align-items: center">
                            <span
                                style="
                                    display: flex;
                                    flex-shrink: 0;
                                    margin-right: 10px;
                                "
                            >价格:</span>
                            <el-input
                                on-keypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                                v-model="inputEditRows"
                                type="number"
                                placeholder="请输入价格"
                            ></el-input>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button
                                type="primary"
                                @click="submitEditRows()"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
                <div class="customer-credit" v-if="activeName === '2'">
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <div class="grid-content bg-purple">
                                <div class="customer-credit-l">
                                    <div class="credit-l-t-t">可用额度(元)</div>
                                    <div
                                        class="credit-l-t"
                                        style="background: #ff4d04"
                                    >
                                        {{creditRemain}}
                                    </div>
                                    <div class="credit-step">
                                        <el-steps
                                            direction="vertical"
                                            :active="1"
                                        >
                                            <el-step
                                                v-for="(
                                                    item, index
                                                ) in topListData"
                                                :key="index"
                                                status="success"
                                            >
                                                <div slot="description">
                                                    <div>
                                                        <div>
                                                            {{item.createTime}}
                                                        </div>
                                                        <div>
                                                            {{item.type === 0
                                                                ? '锁定信用'
                                                                : '释放信用'}}
                                                            {{item.price}}元
                                                        </div>
                                                        <div>
                                                            {{item.type === 0
                                                                ? '支付订单'
                                                                : '收款核销'}}
                                                        </div>
                                                        <div>
                                                            {{item.sourceSn}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-step>
                                            <!-- <el-step title="步骤 2"></el-step>
                                            <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step> -->
                                        </el-steps>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="19">
                            <div class="grid-content bg-purple">
                                <div class="customer-credit-r">
                                    <div class="mini-switch-navorbtn">
                                        <div
                                            class="tabs-card"
                                            style="flex: 0.5"
                                        >
                                            <el-tabs
                                                v-model="activeProtype"
                                                type="card"
                                                @tab-click="custOrder"
                                            >
                                                <el-tab-pane
                                                    label="未核销"
                                                    name="0"
                                                ></el-tab-pane>
                                                <el-tab-pane
                                                    label="已逾期"
                                                    name="1"
                                                ></el-tab-pane>
                                                <el-tab-pane
                                                    label="已核销"
                                                    name="2"
                                                ></el-tab-pane>
                                            </el-tabs>
                                        </div>
                                        <div class="btnlist">
                                            <!-- <button @click="shouxin">
                                                <icon-svg
                                                    name="sousuo"
                                                ></icon-svg
                                                ><span>搜索</span>
                                            </button> -->
                                            <input
                                                class="inputval-noborder"
                                                placeholder="请搜索"
                                                v-model="productName"
                                                @change="productNameSearch"
                                            />
                                            <button @click="creditClick">
                                                <icon-svg
                                                    name="success"
                                                ></icon-svg><span>授信登记</span>
                                            </button>
                                        </div>
                                    </div>
                                    <sn-table
                                        :table-data="creditData"
                                        :columns="columnsss"
                                        :page-obj="pageObj"
                                        :is-fit="true"
                                    >
                                        <template
                                            slot="drugName"
                                            slot-scope="scope"
                                        >
                                            <div
                                                v-for="item in scope.scope
                                                    .orderItemList"
                                                :key="item.name"
                                            >
                                                <div>
                                                    {{item.name + item.specs}}
                                                </div>
                                            </div>
                                        </template>
                                        <template
                                            slot="amount"
                                            slot-scope="{scope}"
                                        >
                                            <div>
                                                <div>
                                                    {{'￥' + scope.amount}}
                                                </div>
                                            </div>
                                        </template>
                                        <template
                                            slot="orderStatus"
                                            slot-scope="{scope}"
                                        >
                                            <div>
                                                <div>
                                                    {{orderStatusArr[
                                                        scope.orderStatus
                                                    ]}}
                                                </div>
                                            </div>
                                        </template>
                                        <template
                                            slot="operate"
                                            slot-scope="scope"
                                        >
                                            <div v-if="scope.scope.status == 1">
                                                <el-button
                                                    size="small"
                                                    type="text"
                                                    @click="
                                                        previewSend(scope.scope)
                                                    "
                                                >
                                                    发送药品
                                                </el-button>
                                            </div>
                                            <div v-else>
                                                <el-button
                                                    size="small"
                                                    type="text"
                                                    @click="
                                                        preview(scope.scope)
                                                    "
                                                >
                                                    查看
                                                </el-button>
                                            </div>
                                        </template>
                                    </sn-table>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-dialog
                        :title="title"
                        :visible.sync="dialogVisible"
                        width="80%"
                        :before-close="handleClose"
                    >
                        <add-dialog
                            @cancelDialog="cancelDialog"
                            v-if="dialogVisible"
                            :is-edit="isEdit"
                        ></add-dialog>
                    </el-dialog>
                </div>
            </div>
        </div>
        <el-dialog
            title="删除地址"
            :visible.sync="dialogVisibleAddress"
            width="30%"
            :before-close="handleCloseAddress"
        >
            <span>确定删除地址?</span>
            <span slot="footer" class="dialog-footer">
                <el-button
                    @click="dialogVisibleAddress = false"
                >取 消</el-button>
                <el-button
                    type="primary"
                    @click="addressConfirm"
                >确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="授信登记"
            :visible.sync="dialogCreditReg"
            width="80%"
            v-drag2anywhere
            :before-close="handleCloseReg"
        >
            <div>
                <el-row :gutter="20" style="margin-bottom: 20px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">
                                    <span style="color: red">*</span>收款日期
                                </span>
                                <!-- <el-input
                                    placeholder="请输入内容"
                                    v-model="settleDate"
                                    clearable
                                >
                                </el-input> -->
                                <el-date-picker
                                    v-model="settleDate"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">
                                    <span style="color: red">*</span>收款金额
                                </span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="receptPrice"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">
                                    <span style="color: red">*</span>收款人
                                </span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="recPerson"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="customer-credit-r">
                    <div class="mini-switch-navorbtn">
                        <div class="tabs-card" style="flex: 0.5">
                            <el-tabs
                                v-model="activeProtype"
                                type="card"
                                @tab-click="custOrder"
                            >
                                <el-tab-pane
                                    label="未核销"
                                    name="0"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已逾期"
                                    name="1"
                                ></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="btnlist">
                            <!-- <button @click="shouxin">
                                <icon-svg
                                    name="sousuo"
                                ></icon-svg
                                ><span>搜索</span>
                            </button> -->
                            <!-- <input class="inputval-noborder" placeholder="请搜索" v-model="productName" @change="productNameSearch"> -->
                            <!-- <button @click="dialogCreditReg = true"><icon-svg name="success"></icon-svg><span>授信登记</span></button> -->
                        </div>
                    </div>
                    <el-table
                        :row-key="getRowKeys"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        :data="creditData"
                        border
                        style="width: 100%"
                    >
                        <el-table-column
                            :reserve-selection="true"
                            type="selection"
                            width="40"
                        >
                        </el-table-column>
                        <el-table-column prop="orderSn" label="订单编号">
                        </el-table-column>
                        <el-table-column prop="createTime" label="订单日期">
                        </el-table-column>
                        <el-table-column prop="totalAmount" label="订单金额">
                        </el-table-column>
                        <el-table-column
                            prop="unsettleAmount"
                            label="未核销金额"
                        >
                        </el-table-column>
                        <el-table-column prop="orderStatus" label="订单状态">
                            <template slot-scope="scope">
                                <div>
                                    <div>
                                        {{orderStatusArr[
                                            scope.row.orderStatus
                                        ]}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderContent" label="订单内容">
                        </el-table-column>
                        <el-table-column prop="isSettle" label="核销">
                        </el-table-column>
                        <el-table-column
                            prop="creditExpireTime"
                            label="核销日期"
                        >
                        </el-table-column>
                        <el-table-column prop="settleSn" label="核销单号">
                        </el-table-column>
                        <el-table-column
                            prop="creditExpireTime"
                            label="超期日期"
                        >
                        </el-table-column>
                    </el-table>
                    <div class="sn-row flex-end">
                        <el-pagination
                            class="width-auto"
                            background
                            layout="total, prev, pager, next, sizes, jumper"
                            :page-size="pageObj.size"
                            :total="pageObj.total"
                            :current-page="pageObj.currentPage"
                            @current-change="pageObj.func"
                            @size-change="pageObj.handleSizeChange"
                        ></el-pagination>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCreditReg = false">取 消</el-button>
                <el-button type="primary" @click="RegConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :visible.sync="showVisible"
            width="50%"
            :title="labelTitle"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            class="reply-dia"
            top="12%"
            :show-close="true"
        >
            <div class="container">

                <el-input
                    placeholder="请输入内容"
                    v-model="labelClient"
                    clearable
                >
                </el-input>


                <div class="btn" style="padding: 20px 0;">
                    <el-button type="info" @click="labelCancelDialog">取消</el-button>

                    <el-button type="primary" @click="addLabelReq">提交</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- <addLabelBox :showVisible="showVisible"></addLabelBox> -->
    </div>
</template>

<script>
// import { delete } from 'vue/types/umd'
import snAddressSelect from '@/components/snaddressselect/sn-address-select'
import addLabelBox from './addLabel'
import addDialog from './add-dialog'
import {Row} from 'element-ui'
import {setPathQuery} from '@/utils/index'
export default {
    components: {
        addDialog,
        snAddressSelect
    },
    data() {
        return {
            // 上传文件
            action:
                window.SITE_CONFIG.baseUrl +
                '/sino-resource/oss/endpoint/put-file',
            headers: {
                'Sino-Auth': localStorage.getItem('Sino-Auth')
            },
            title: '授信收款登记',
            isEdit: false,
            dialogVisible: false,
            dialogVisibleAddress: false,
            dialogCreditReg: false,
            detail: true,
            showCheck: '',
            creditData: [], // 授信表
            topListData: [],
            creditRemain: '', // 授信余额
            customerData: [],
            labelCustomerData:[], //客户标签
            labelId:"",//标签id
            waitcustomerData: [],
            maskShow: {
                pic1: false,
                pic2: false,
                pic3: false
            },
            curPayType: {
                wxzf: '0',
                yhzf: '0',
                sxzf: '0',
                wuzf: '0'
            },
            wxzfTag: false,
            wxskmTag: false,
            yhzfTag: false,
            sxzfTag: false,
            wuzfTag: false,
            showVisible:false,//客户标签label
            labelClient:"",//客户标签输入框
            labelTitle:"客户标签",
            addressData: [],
            customerTypeArr: [
                '器械批发',
                '器械店',
                '连锁药房',
                '单体药房',
                '医药公司',
                '医疗机构',
                '连锁器械',
                '连锁无糖',
                '其它'
            ],
            columns: [
                {label: '客户名称', prop: 'customerName', width: '140'},
                {label: '客户代码', prop: 'customerCode', width: 120},
                {label: '客户类型', slot: 'customerType'},
                {label: '联系人', prop: 'contactName'},
                {label: '联系电话', prop: 'contactPhone', width: 110},
                {label: '客户标签', prop: 'customerLabel'},
                {label: '是否冻结', slot: 'status'},
                {label: '客户地址', prop: 'address', width: 220},
                {label: '注册时间', prop: 'createTime', width: 160},
                {slot: 'operate', label: '操作', fixed: 'right'}
            ], // 操作列
            waitcolumns: [
                {label: '客户名称', prop: 'customerName', width: '140'},
                {label: '微信昵称', prop: 'contactNickname', width: '140'},
                {label: '客户代码', prop: 'customerCode', width: 100},
                {label: '客户类型', slot: 'customerType'},
                {label: '客户联系人', prop: 'contactName'},
                {label: '联系电话', prop: 'contactPhone', width: 120},
                {label: '客户地址', prop: 'address', width: 220},
                {slot: 'operate', label: '操作'}
            ], // 操作列
            pricecolumns: [
                {label: '产品名称', prop: 'productName', width: '140'},
                {label: '产品编码', prop: 'productSn', width: '140'},
                {label: '产品规格', prop: 'productSpec', width: 100},
                {label: '价格区间', slot: 'customerType'},
                {label: '单位', prop: 'unit'},
                {label: '产品说明', prop: 'contactPhone', width: 120},
                {label: '价格', prop: 'price', width: 80},
                {slot: 'operate', label: '操作', width: 150}
            ], // 操作列
            columnss: [
                {label: '收货人', prop: 'consignee', width: '140'},
                {label: '收货电话', prop: 'phone', width: 180},
                {label: '类型', prop: 'status'},
                {label: '收货地址', slot: 'province', width: 180}
                // {slot: 'operate', label: '操作'}
            ], // 操作列
            columnsss: [
                {label: '订单编号', prop: 'orderSn', width: '140'},
                {label: '订单日期', prop: 'createTime', width: 180},
                {label: '订单金额', prop: 'totalAmount'},
                {label: '未核销金额', prop: 'unsettleAmount'},
                {label: '订单状态', slot: 'orderStatus'},
                {label: '订单内容', prop: 'orderContent', width: '140'},
                {label: '核销', prop: 'isSettle', width: 180},
                {label: '核销日期', prop: 'creditExpireTime'},
                {label: '核销单号', prop: 'settleSn'},
                {label: '超期日期', prop: 'creditExpireTime'}
                // {slot: 'operate', label: '操作'}
            ], // 操作列
            orderStatusArr: [
                '待支付',
                '待确认',
                '待发货',
                '已发货',
                '已完成',
                '已取消',
                '已拒绝'
            ],
            labelColumns: [
                {label: '标签名称', prop: 'labelName', width: '140'},
                // {label: '是否冻结', slot: 'status'},
                {label: '注册时间', prop: 'createTime', width: 160},
                {slot: 'operate', label: '操作', fixed: 'right'}
            ], // 操作列
            loading: false,
            pageObj: {
                size: 10,
                total: 0,
                currentPage: 1,
                func: (currentPage) => {
                    this.pageTurning(currentPage)
                },
                handleSizeChange: (size) => {
                    this.sizeChange(size)
                }
            },
            labelPageObj: {
                size: 10,
                total: 0,
                currentPage: 1,
                func: (currentPage) => {
                    this.labelPageTurning(currentPage)
                },
                handleSizeChange: (size) => {
                    this.labelPPizeChange(size)
                }
            },
            pricepageObj: {
                size: 10,
                total: 0,
                currentPage: 1,
                func: (currentPage) => {
                    this.pricepageTurning(currentPage)
                },
                handleSizeChange: (size) => {
                    this.pricesizeChange(size)
                }
            },
            waitpageObj: {
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
            searchLoading: false,
            tableData: [],
            pricetableData: [],
            dataForm: {
                dept: '',
                ward: '',
                searchKey: '',
                advice: '',
                bedType: '0',
                emptyBed: '1'
            },
            // dialogVisible: false,
            recipeDialogVisible: false,
            valueTime: '',
            orderId: '',
            activeName: '0',
            activeNavName: '0',
            activeProtype: '0',
            activeChecktype: '0',
            orderStatus: null,
            ruleForm: {
                name: ''
            },
            rules: {
                customerName: [
                    {
                        required: true,
                        message: '请输入客户名称',
                        trigger: 'blur'
                    }
                ],
                customerCode: [
                    {
                        message: '请输入客户代码',
                        trigger: 'blur'
                    }
                ],
                factoryCode: [
                    {
                        required: true,
                        message: '请输入厂商编码',
                        trigger: 'blur'
                    }
                ],
                customerType: [
                    {
                        required: true,
                        message: '请输入所属分类',
                        trigger: 'blur'
                    }
                ],
                customerCertificateNum: [
                    {
                        required: true,
                        message: '请输入营业执照',
                        trigger: 'blur'
                    }
                ],
                customerPhone: [
                    {
                        required: true,
                        message: '请输入注册手机',
                        trigger: 'blur'
                    }
                ],
                creditValue: [
                    {
                        required: true,
                        message: '请输入授信额度',
                        trigger: 'blur'
                    }
                ],
                creditDay: [
                    {
                        required: true,
                        message: '请输入授信账期',
                        trigger: 'blur'
                    }
                ]
                // billCompany: [
                //     {
                //         required: true,
                //         message: '请输入开票单位',
                //         trigger: 'blur'
                //     }
                // ],
                // billNumber: [
                //     {
                //         required: true,
                //         message: '请输入开票税号',
                //         trigger: 'blur'
                //     }
                // ],
                // billRate: [
                //     {
                //         required: true,
                //         message: '请输入开票税率',
                //         trigger: 'blur'
                //     }
                // ]
            },
            // 客户档案-搜索
            customerName: '',
            customerCode: '',
            customerType: '',
            region: '',
            address: '',
            contactPhone: '',
            customerLabel: '',
            myScope: 'all',
            idCustomer: '',
            // 店铺所有支付方式
            payMethods: '',
            // 客户档案编辑
            editForm: {
                id: '',
                customerName: '',
                customerCode: '',
                factoryCode: '',
                customerType: '',
                customerCertificateNum: '',
                customerPhone: '',
                customerLabel: '', // 客户标签
                status: '',
                contactName: '',
                contactPhone: '',
                creditValue: '', // 授信额度
                creditDay: 0,
                address: '',
                description: '',
                billCompany: '', // 开票单位
                billNumber: '',
                billRate: '',
                billType: '', // 开票类型
                customerCertificate: '',
                customerPermit: '',
                customerSecondCertificate: '',
                payMethod: '' // 支付方式
            },
            deleteAddressId: '',
            orderIds: [],
            recPerson: '',
            receptPrice: '',
            settleDate: '',
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            productName: '',
            maskShowEditRows: false,
            inputEditRows: '',
            relationId: '',
            editProductId: ''
        }
    },
    created() {
        this.listCust()
    },
    methods: {

              // 导出
        async getExport() {

                      let params = {
                customerId: this.idCustomer,
                keyWord: this.productName,
                current: this.pageObj.currentPage,
                size: this.pageObj.size,
                scope: this.activeProtype,
                      'Sino-Auth': localStorage.getItem('Sino-Auth')
            }





            let baseUrl =
                window.SITE_CONFIG.baseUrl + this.$api.customermanage.exportcustome


           let newUrl = setPathQuery(baseUrl,params);
           window.open(newUrl);

        },
        addLabel(){ //客户标签添加
            this.labelId = ""
            this.showVisible = true
        },
        editLabel(e){ //客户标签编辑
            this.showVisible = true
            this.labelClient = e.labelName
        },
        editLabel(e){
            this.showVisible = true
            this.labelClient = e.labelName
            this.labelId = e.id
        },
        delectLabel(e){ //删除标签
            // let param = {
            //     ids:e.id
            // }
            this.$confirm('是否删除标签', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    this.$post(this.$api.customermanage.customerLabelRemove+"?ids="+e.id).then((data) => {
                        if (data && data.code === 200) {
                            this.labelListCust()
                            this.$message(data.msg)
                        } else {
                            this.loading = false
                            this.$message(data.msg)
                        }
                    })
                })
                .catch(() => {})

        },
        labelCancelDialog() {
            this.showVisible = false

        },
        addLabelReq(){
            let param = {
                labelName:this.labelClient
            }
            if(this.labelId != ""){
                param.id = this.labelId
            }
            this.$post(this.$api.customermanage.customerLabelSubmit, param).then((data) => {
                if (data && data.code === 200) {
                    this.showVisible = false
                    this.labelListCust()
                } else {
                    this.loading = false
                    this.$message(data.msg)
                }
                this.labelClient = ""
            })
        },
        shopDetail() {
            let param = {
                isInner: 1
            }
            this.$get(this.$api.shop.detail, param).then((data) => {
                if (data && data.code === 200) {
                    this.storeId = data.data.storeId
                    let da = {
                        storeId: this.storeId
                    }
                    this.$get(this.$api.shop.collectionDetail, da).then(
                        (data) => {
                            if (data && data.code === 200) {
                                this.payMethods = data.data.merchantStoreExtPaytype.split(
                                    ','
                                )
                                if (this.payMethods[4] == '0') {
                                    this.wxzfTag = false
                                }                                if (this.payMethods[1] == '0') {
                                    this.wxskmTag = false
                                }
                                if (this.payMethods[3] == '0') {
                                    this.yhzfTag = false
                                }
                                if (this.payMethods[0] == '0') {
                                    this.sxzfTag = false
                                }
                                if (this.payMethods[2] == '0') {
                                    this.wuzfTag = false
                                }

                            }
                        }
                    )
                }
            })
        },
        // 客户标签
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick((_) => {
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
        // 上传文件
        handleAvatarSuccess(res) {
            this.editForm.customerCertificate = res.data.link // URL.createObjectURL(file.raw)
        },
        handleAvatarSuccessStore(res) {
            this.editForm.customerPermit = res.data.link // URL.createObjectURL(file.raw)
        },
        handleAvatarSecondSuccess(res) {
            this.editForm.customerSecondCertificate = res.data.link // URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isIMAGE =
                file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 9
            if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 9MB!')
            }
            return isIMAGE && isLt2M
        },
        addressInfo(addressInfo) {
            console.log(addressInfo)
            // Object.assign(this.editForm, addressInfo)
        },

        productNameSearch() {
            this.custOrder()
        },
        noCustTypeClick(tab, event) {
            this.myScope = tab.name
            this.listCust()
        },
        cancelDialog() {
            this.dialogVisible = false
        },
        back() {
            this.detail = true
        },
        link() {
            this.detail = false
        },
        creditClick() {
            this.dialogCreditReg = true
            this.activeProtype = '0'
            this.custOrder()
        },
        selectPay(row) {
            if (row === 0) {
                if (this.payMethods[4] == '0' && this.activeNavName == '0') {
                    this.$message.error('店铺暂未开通此支付方式')
                } else {
                    this.wxzfTag = !this.wxzfTag
                }
            }
            if (row === 1) {
                if (this.payMethods[1] == '0') {
                    this.$message.error('店铺暂未开通此支付方式')
                } else {
                    this.wxskmTag = !this.wxskmTag
                }
            }
            if (row === 2) {
                if (this.payMethods[3] == '0') {
                    this.$message.error('店铺暂未开通此支付方式')
                } else {
                    this.yhzfTag = !this.yhzfTag
                }
            }
            if (row === 3) {
                if (this.payMethods[0] == '0') {
                    this.$message.error('店铺暂未开通此支付方式')
                } else {
                    this.sxzfTag = !this.sxzfTag
                }
            }
            if (row === 4) {
                if (this.payMethods[2] == '0') {
                    this.$message.error('店铺暂未开通此支付方式')
                } else {
                    this.wuzfTag = !this.wuzfTag
                }
            }
        },
        search() {},
        shouxin() {
            this.dialogVisible = true
        },
        // 保存
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!')
                    let temp = []
                    if (this.sxzfTag) {
                        temp.push('0')
                    }
                    if (this.wxskmTag) {
                        temp.push('1')
                    }
                    if (this.wuzfTag) {
                        temp.push('2')
                    }
                    if (this.yhzfTag) {
                        temp.push('3')
                    }
                    if (this.wxzfTag) {
                        temp.push('4')
                    }
                    console.log('select temp', temp)
                    if (temp.length == 0) {
                        this.$message.error('请至少选择一种支付方式')
                        this.loading = false
                        return false
                    }
                    if (this.editForm.customerName == '') {
                        this.$message.error('请填写客户名称')
                        return false
                    }
                    if (this.editForm.customerPhone == '') {
                        this.$message.error('请填写注册手机')
                        return false
                    }
                    if (this.editForm.customerType == '') {
                        this.$message.error('请选择所属分类')
                        return false
                    }
                    if (this.editForm.customerCertificateNum == '') {
                        this.$message.error('请填写营业执照')
                        return false
                    }
                    if (this.editForm.creditDay == '') {
                        this.$message.error('请填写授信账期')
                        return false
                    }
                    if (this.editForm.creditValue === '') {
                        this.$message.error('请填写授信额度')
                        return false
                    }

                    this.editForm.payMethod = temp.join(',')
                    this.editForm.customerLabel = this.dynamicTags.join(',')
                    this.loading = true
                    this.$post(
                        this.$api.customermanage.update_cust,
                        this.editForm
                    ).then((data) => {
                        if (data && data.code === 200) {
                            this.loading = false
                            this.$message(data.msg)
                            this.listCust()
                            this.back()
                        } else {
                            this.loading = false
                            this.$message(data.msg)
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.back()
            // this.$refs[formName].resetFields()
        },
        search() {
            this.listCust()
        },
        labelSearch(){
            this.labelListCust()
        },
        reset() {
            this.activeName = '1'
            this.dataForm.searchKey = ''
            this.dataForm.valueTime = ''
        },
        getId(id) {
            this.orderId = id
        },
        deptChange() {
            console.log('search')
        },
        // 页码改变
        pageTurning(page) {
            this.pageObj.currentPage = page
            this.listCust()
        },
        pricepageTurning(page) {
            this.pricepageObj.currentPage = page
            this.selectPrice()
        },
        labelPageTurning(page){
            this.labelPageObj.currentPage = page
            this.labelListCust()
        },
        labelPPizeChange(size){
            this.labelPageObj.size = size
            this.labelListCust()
        },
        // 页面数量改变
        pricesizeChange(size) {
            this.pricepageObj.size = size
            this.selectPrice()
        },
        // 页面数量改变
        sizeChange(size) {
            this.pageObj.size = size
            this.listCust()
        },
        handleClose() {
            this.dialogVisible = false
        },
        handleCloseAddress() {
            this.dialogVisibleAddress = false
        },
        handleCloseReg() {
            this.dialogCreditReg = false
        },
        recipeHandleClose() {
            this.recipeDialogVisible = false
        },
        openRecipeDialog() {
            this.recipeDialogVisible = true
        },
        deleteAddress(row) {
            this.deleteAddressId = row.id
            this.dialogVisibleAddress = true
        },
        addressConfirm() {
            let param = {
                ids: this.deleteAddressId
            }
            this.$post(this.$api.customermanage.remove, param).then((data) => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.dialogVisibleAddress = false
                }
            })
        },
        RegConfirm() {
            if (this.settleDate === '') {
                this.$message('请选择收款日期')
                return
            }
            if (this.receptPrice === '') {
                this.$message('请填写收款金额')
                return
            }
            if (this.recPerson === '') {
                this.$message('请填写收款人')
                return
            }
            if (this.orderIds.length === 0) {
                this.$message('请选择授信人')
                return
            }
            let param = {
                customerId: this.idCustomer,
                orderIds: this.orderIds,
                recPerson: this.recPerson, // 收款人
                receptPrice: this.receptPrice, // 收款金额
                settleDate: this.settleDate // 收款日期
            }
            this.loading = true
            this.$post(this.$api.customermanage.create, param).then((data) => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.dialogCreditReg = false
                    this.$message(data.msg)
                    this.multipleSelection = []
                    this.orderIds = []
                    this.$refs.multipleTable.clearSelection()
                    this.custOrder()
                } else {
                    this.loading = false
                    this.$message(data.msg)
                }
            })
        },
        preview(row) {
            this.dialogVisible = true
            this.id = row.id
            this.orderStatus = row.status
        },

        previewSend(row) {
            this.dialogVisible = true
            this.id = row.id
            this.orderStatus = row.status
        },
        // 审核 详细
        previewSendcheck(row) {
            this.detail = false
            this.showCheck = true
            // this.idCustomer = row.id
            this.queryApplyCustDetail(row.id)
            // this.id = row.id
            // this.orderStatus = row.status
        },
        // 切换状态
        handleClick() {
            this.pageObj.size = 10
            this.pageObj.total = 0
            this.pageObj.currentPage = 1
            let t = this.activeNavName
            // this.getAuditList()
            if (t == 0) this.listCust()
            if (t == 1) this.checkClick()
            if (t == 2) this.labelListCust()
        },
        // 子页面切换
        handletwoClick() {
            this.pageObj.size = 10
            this.pageObj.total = 0
            this.pageObj.currentPage = 1
            let t = this.activeName
            if (t == 1) this.selectPrice()
            if (t == 2) {
                this.custOrder()
                this.topList()
            }
        },
        async selectPrice() {
            let params = {
                isFixed: this.activeProtype, // 0、未定 1、已定价
                customerId: this.editForm.id,
                current: this.pricepageObj.currentPage,
                size: this.pricepageObj.size,
                keywords: ''
            }
            let {code, data} = await this.$get(
                this.$api.price.findSpecialPriceByCustomerId,
                params
            )
            if (code === 200) {
                this.pricepageObj.total = data.total
                this.pricetableData = data.records
            } else {
                this.pricetableData = []
            }
        },
        // 审核列表
        async checkClick() {
            let params = {
                status: this.activeChecktype, // 0、待支付 1、待配送；2、已发货；4、已关闭
                current: this.waitpageObj.currentPage,
                size: this.waitpageObj.size
            }
            let {code, data} = await this.$get(
                this.$api.customermanage.applyList,
                params
            )
            if (code === 200) {
                this.waitpageObj.total = data.total
                this.waitcustomerData = data.records
            }
        },
        ProtypeClick() {},

        // 获取药品订单列表数据
        async getAuditList() {
            let params = {
                status: this.activeName === '5' ? '' : this.activeName, // 0、待支付 1、待配送；2、已发货；4、已关闭
                current: this.pageObj.currentPage,
                size: this.pageObj.size,
                compositeSearch: this.dataForm.searchKey,
                createTimeBegin: this.dataForm.valueTime
                    ? this.dataForm.valueTime[0]
                    : '',
                // createTimeBegin: '2020-08-20',
                createTimeEnd: this.dataForm.valueTime
                    ? this.dataForm.valueTime[1]
                    : ''
                // createTimeEnd: '2020-10-01'
            }
            let {code, data} = await this.$post(
                this.$api.manager.pageListPc,
                params
            )
            if (code === 200) {
                this.pageObj.total = data.total
                this.tableData = data.records
            }
        },
        // 业务代码
        editCustomer(row) {
            this.detail = false
            this.idCustomer = row.id
            this.custOrder()
            this.queryCustDetail()
        },
        listCust() {
            this.loading = true
            let param = {
                current: this.pageObj.currentPage,
                size: this.pageObj.size,
                customerName: this.customerName,
                customerCode: this.customerCode,
                customerType: this.customerType,
                region: this.region,
                address: this.address,
                contactPhone: this.contactPhone,
                customerLabel: this.customerLabel,
                scope: this.myScope
            }
            this.$get(this.$api.customermanage.listCust, param).then((data) => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.pageObj.total = data.data.total
                    this.customerData = data.data.records
                }
            })
        },
        labelListCust() {
            this.loading = true
            let param = {
                labelName:this.customerLabel,
                current: this.labelPageObj.currentPage,
                size: this.labelPageObj.size,
            }
            this.$get(this.$api.customermanage.customerLabelList, param).then((data) => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.labelPageObj.total = data.data.total
                    this.labelCustomerData = data.data.records
                }
            })
        },
        getRowKeys(row) {
            return row.orderId
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.orderIds = []
            console.log('multipleSelection', this.multipleSelection)
            this.multipleSelection.map((item, index) => {
                this.orderIds.push(item.orderId)
            })
            console.log('orderIds', this.orderIds)
        },
        custOrder() {
            this.loading = true
            let param = {
                customerId: this.idCustomer,
                keyWord: this.productName,
                current: this.pageObj.currentPage,
                size: this.pageObj.size,
                scope: this.activeProtype
            }
            this.$get(this.$api.customermanage.custOrder, param).then(
                (data) => {
                    if (data && data.code === 200) {
                        this.loading = false
                        this.pageObj.total = data.data.total
                        this.creditData = data.data.records
                    }
                }
            )
        },
        async queryCustDetail() {
            this.loading = true
            let param = {
                custId: this.idCustomer
            }
            await  this.$get(this.$api.customemanage.queryCustDetail, param).then(
                (data) => {
                    if (data && data.code === 200) {
                        this.loading = false
                        // this.pageObj.total = data.data.total
                        this.editForm = data.data
                        console.lg('queryCustDetail this.editForm', this.editForm)
                        if (this.ditForm.customerLabel != '') {
                            this.dynamicTags = this.editForm.customerLabel.split(
                                ','
                            )
                        }
                        console.lo('this.editForm.payMethod', this.editForm.payMethod)
                        this.addrssData = data.data.addressList
                        this.wxzfTag = this.editForm.payMethod.includes('4')
                        this.wxskmTag = this.editForm.payMethod.includes('1')
                        this.yhzfTag = this.editForm.payMethod.includes('3')
                        this.sxzfTag = this.editForm.payMethod.includes('0')
                        this.wuzfTag = this.editForm.payMethod.includes('2')

                    }
                }
            )
            this.shopDetail() // 获取门店详情

        },
        // 查询申请详细
        async queryApplyCustDetail(temp) {
            this.loading = true
            // 默认展示所有支付方式
            this.wxzfTag = true
            this.wxskmTag = true
            this.yhzfTag = true
            this.sxzfTag = true
            this.wuzfTag = true
            let param = {
                id: temp,
                status: 0
            }
            await  this.$get(this.$api.customermanage.applyDetail, param).then(
                (data) => {
                    if (data && data.code === 200) {
                        // this.pageObj.total = data.data.total
                        this.editForm = data.data
                        if (this.editForm.contactMobile) {
                            this.editForm.customerPhone = this.editForm.contactMobile
                        }

                    }
                    this.loading = false
                }
            )
            this.shopDetail()
        },
        // 客户授信
        topList() {
            this.loading = true
            let param = {
                custId: this.idCustomer
            }
            this.$get(this.$api.customermanage.topList, param).then((data) => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.creditRemain = data.data.creditRemain
                    this.topListData = data.data.creditRecord
                }
            })
        },
        async audApplyCust(tempstatus) {
            let that = this
            if (tempstatus == 1) {
                // 通过审核
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        that.commonAudit(tempstatus)
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            } else {
                // 拒绝审核
                that.commonAudit(tempstatus)
            }
        },
        commonAudit(tempstatus) {
            this.loading = true
            let temp = []
            if (this.sxzfTag) {
                temp.push('0')
            }
            if (this.wxskmTag) {
                temp.push('1')
            }
            if (this.wuzfTag) {
                temp.push('2')
            }
            if (this.yhzfTag) {
                temp.push('3')
            }
            if (this.wxzfTag) {
                temp.push('4')
            }

            if (temp.length == 0 && tempstatus != 2) {
                this.$message.error('请至少选择一种支付方式')
                this.loading = false
                return false
            }

            this.editForm.payMethod = temp.join(',')
            let par = this.editForm
            par.status = tempstatus
            par.customerApplyId = this.editForm.id
            par.creditValue = 0
            this.$post(this.$api.customermanage.applyAudit, par).then(
                (data) => {
                    if (data && data.code === 200) {
                        this.detail = true
                        this.checkClick()
                        // this.pageObj.total = data.data.total
                        // this.editForm = data.data
                    }
                    this.loading = false
                }
            )
        },
        setMaskShow(num) {
            if (num === 1) {
                this.maskShow.pic1 = !this.maskShow.pic1
            }
            if (num === 2) {
                this.maskShow.pic2 = !this.maskShow.pic2
            }
            if (num === 3) {
                this.maskShow.pic3 = !this.maskShow.pic3
            }
        },
        editRows(row) {
            this.maskShowEditRows = true
            this.editProductId = row.productId
            this.relationId = row.id
        },
        submitEditRows() {
            if (this.inputEditRows == '') {
                this.$message.error('请输入价格')
                return false
            }

            let par = {
                productId: this.editProductId,
                customerId: this.idCustomer,
                price: this.inputEditRows,
                priceType: 0,
                type: 1,
                id: this.relationId || ''
            }
            let url =
                this.activeProtype == 0
                    ? this.$api.price.save
                    : this.$api.price.update

            this.$post(url, par)
                .then((data) => {
                    if (data && data.code === 200) {
                        // this.youhuiList=data.data
                        this.maskShowEditRows = !this.maskShowEditRows
                        this.inputEditRows = ''
                        this.selectPrice()
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                })
                .catch(() => {
                    /*  */
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.tabs-main {
    background: $white;
    padding: 15px;
    border-radius: 6px;
    margin-top: 10px;
}
.middle {
    background: #ffffff;
    margin-top: 14px;
    border-radius: 6px;
    padding: 10px;
}
.basic-info {
    width: 60%;
    margin: 0 auto;
}
.special-price {
    padding: 10px;
}
.customer-credit {
    display: flex;
}
.customer-credit-l {
    width: 100%;
    height: 841px;
    background: #f2f3f3;
    opacity: 1;
    border-radius: 12px;
}
.credit-l-t-t {
    height: 84px;
    line-height: 84px;
    text-align: center;
    font-size: 20px;
    color: #333333;
}
.credit-l-t {
    height: 80px;
    line-height: 80px;
    text-align: center;
    vertical-align: middle;
    color: #ffffff;
    font-size: 36px;
    font-family: Microsoft YaHei;
    font-weight: bold;
}
.credit-step {
    height: 670px;
    padding: 10px;
    overflow: auto;
}
.tip {
    height: 47px;
    background: #fcf9da;
    opacity: 1;
    border-radius: 3px;
    line-height: 47px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    padding-left: 67px;
}
.title-w {
    height: 45px;
    background: #f2f3f3;
    opacity: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-bottom: 14px;
}
.title {
    font-size: 0.18rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    margin-left: 17px;
    color: #333333;
}
.paymethod::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}
.form-wrap {
    border-radius: 6px;
}

.back {
    display: flex;
    background: $white;
}
.back-but {
    width: 140px;
    background: #ff4d04;
    opacity: 1;
    border-radius: 10px 0px 0px 10px;
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 29px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.el-row {
    // margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    // min-height: 36px;
    // display: flex;
    // align-items: center;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
.col {
    display: flex;
}
.lab {
    margin-right: 28px;
    min-width: 69px;
    font-size: 14px;
    line-height: 32px;
}
.wechat-pay {
    background: url('../../../assets/images/shopInit/pay_wechat.png') top center
        no-repeat;
    background-size: 50%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.wechatCode-pay {
    background: url('../../../assets/images/shopInit/pay_qrcode.png') top center
        no-repeat;
    background-size: 50%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.bank-pay {
    background: url('../../../assets/images/shopInit/pay_transfer.png') top
        center no-repeat;
    background-size: 50%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.shouxin-pay {
    background: url('../../../assets/images/shopInit/pay_credit.png') top center
        no-repeat;
    background-size: 46%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.wuliu-pay {
    background: url('../../../assets/images/shopInit/pay_logistics.png') top
        center no-repeat;
    background-size: 50%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.wechat-pay.act {
    background: url('../../../assets/images/shopInit/pay_wechat_selected.png')
        top center no-repeat;
    background-size: 50%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.wechatCode-pay.act {
    background: url('../../../assets/images/shopInit/pay_qrcode_selected.png')
        top center no-repeat;
    background-size: 50%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.bank-pay.act {
    background: url('../../../assets/images/shopInit/pay_transfer_selected.png')
        top center no-repeat;
    background-size: 50%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.shouxin-pay.act {
    background: url('../../../assets/images/shopInit/pay_credit_selected.png')
        top center no-repeat;
    background-size: 46%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.wuliu-pay.act {
    background: url('../../../assets/images/shopInit/pay_logistics_selected.png')
        top center no-repeat;
    background-size: 50%;
    height: 140px;
    display: block;
    margin: 0 auto;
    .pay-title {
        padding-top: 100px;
    }
}
.pay-title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 24px;
    color: #909baa;
    text-align: center;
    margin-top: 21px;
    margin-bottom: 34px;
}

.wxinfolist {
    display: flex;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    max-width: 700px;
}
.wxinfolist img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-bottom: 10px;
}

// 上传文件
.up-file {
    display: flex;
    justify-content: center;
    padding-top: 0.24rem;
    text-align: center;
}
.avatar-uploader /deep/ .el-upload {
    // border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
    background-image: url('../../../assets/images/shopInit/271.png');
    background-size: 100%;
    margin-left: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-img {
    width: 1.16rem;
    height: 0.93rem;
    background-image: url('../../../assets/images/shopInit/tupian@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    transform: scale(1);
    transition: all ease 0.5s;
}
.avatar-uploader .el-upload:hover {
    border-color: #ff3f6b;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}
.te {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 19px;
    color: #a1a0a1;
    text-align: center;
    margin-left: 0.8rem;
    margin-top: 0.1rem;
    margin-bottom: 20px;
    width: 107px;
}
.paytype {
    padding-bottom: 20px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ff4e07; // 进行修改选中项背景和字体
}
/deep/ .el-step__description.is-success {
    color: #ff4d07;
}
/deep/ .el-step__head.is-success {
    color: #ff4d07;
    border-color: #ff4d07;
}

// /deep/.el-dialog__header {
//     background: #ffffff !important;
// }
</style>
