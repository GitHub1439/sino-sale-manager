/* eslint-disable no-shadow */
import Vue from 'vue'
import {deepClone, createUUID} from '@/views/survey/utils/index'
let v = new Vue()


const state = {
    attrRightEditor: false,         // 右侧编辑面板
    attrRightOpEditor: false,       // 右侧编辑面板選項
    activeElementUUID: '',          // 选中的elementID
    activeElementOptionId: '',      // 选中的optionID
    questionnaireTitle: '',         // 问卷标题
    questionnaireDesc: '',          // 问卷描述
    questionList: []                // 问题数据
}

const mutations = {
    ATTRRIGHTEDITOR: (state, e) => {
        state.attrRightEditor = e
    },
    ATTRRIGHTOPEDITOR: (state, e) => {
        state.attrRightOpEditor = e
    },
    ACTIVEELEMENTUUID: (state, e) => {
        state.activeElementUUID = e
    },
    ACTIVEELEMENTOPTIONID: (state, e) => {
        state.activeElementOptionId = e
    },
    UPDATEQUESTIONNAIRETITLE: (state, e) => {
        state.questionnaireTitle = e
    },
    UPDATEQUESTIONNAIREDESC: (state, e) => {
        state.questionnaireDesc = e
    },
    /* 问题 */
    QUESTIONLIST: (state, e) => {
        state.questionList = e
    },
    UPDATEQUESTIONTITLE: (state, e) => {  // 修改问题标题
        state.questionList[e.qindex].questiontitle = e.title
    },
    UPDATEOPTIONTITLE: (state, e) => {  // 修改选项标题
        state.questionList[e.qindex].options[e.oindex].title = e.title
    },
    ADDQUESTION: (state, e) => {  // 添加问题
        state.questionList.push(e)
    },
    MOVEQUESTION: (state, e) => { // 移动问题
        let direct = e.direct
        let index = e.qindex
        let list = state.questionList
        if (direct === 'up') {
            if (index < 1) {
                v.$message({type: 'warning', message: '抱歉，已经是第一个问题了.'})
                return
            }
            list.splice(index - 1, 2, list[index], list[index - 1])
        } else {
            if (index >= list.length - 1) {
                v.$message({type: 'warning', message: '抱歉，已经是最后一个问题了.'})
                return
            }
            list.splice(index, 2, list[index + 1], list[index])
        }
    },
    COPYQUESTION: (state, e) => {  // 赋值问题
        let index = e.qindex
        let list = state.questionList
        let data = deepClone(list[index])
        delete data.nextQuestion // 删除逻辑跳转
        data.uuid = createUUID()
        if (data.options && data.options.length > 0) {
            let tempData = data.options.map(e => {
                e.uuid = createUUID()
                e.customattr = {}
                return e
            })
            data.options = tempData
            list.splice(index, 1, list[index], data)
        } else {
            list.splice(index, 1, list[index], data)
        }
        // 复制时，同样需要对引用对象进行深拷贝
        // list.splice(index, 1, list[index], deepClone(list[index]));
    },
    DELETEQUESTION: (state, e) => {
        state.questionList.splice(e.qindex, 1)
    },
    /* ************** 选项 ***************** */
    ADDOPTION: (state, e) => { // 添加选项
        let data = {title: e.title, uuid: e.uuid, customattr: {}, content: ''}  // customattr 配置相关  content 提交的问题数据相关
        state.questionList[e.qindex].options.push(data)
    },
    MOVEOPTION: (state, e) => { // 移动选项
        let direct = e.direct
        let index = e.qindex
        let oindex = e.oindex
        let list = state.questionList[index].options
        if (direct === 'up') {
            if (oindex < 1) {
                v.$message({type: 'warning', message: '抱歉，已经是第一选项了.'})
                return
            }
            list.splice(oindex - 1, 2, list[oindex], list[oindex - 1])
        } else {
            if (oindex >= list.length - 1) {
                v.$message({type: 'warning', message: '抱歉，已经是最后一选项了.'})
                return
            }
            list.splice(oindex, 2, list[oindex + 1], list[oindex])
        }
    },
    DELETEOPTION: (state, e) => { // 删除选项
        let index = e.qindex
        let oindex = e.oindex
        state.questionList[index].options.splice(oindex, 1)
    }
}

const actions = {
    SETATTRRIGHTEDITOR({commit}, data) {
        commit('ATTRRIGHTEDITOR', data)
    },
    SETATTRRIGHTOPEDITOR({commit}, data) {
        commit('ATTRRIGHTOPEDITOR', data)
    },
    SETACTIVEELEMENTUUID({commit}, data) {
        commit('ACTIVEELEMENTUUID', data)
    },
    SETACTIVEELEMENTOPTIONID({commit}, data) {
        commit('ACTIVEELEMENTOPTIONID', data)
    },
    UPDATEQUESTIONNAIRETITLE({commit}, data) {
        commit('UPDATEQUESTIONNAIRETITLE', data)
    },
    UPDATEQUESTIONNAIREDESC({commit}, data) {
        commit('UPDATEQUESTIONNAIREDESC', data)
    },
    /* 问题 */
    QUESTIONLIST({commit}, data) {
        commit('QUESTIONLIST', data)
    },
    UPDATEQUESTIONTITLE({commit}, data) {
        commit('UPDATEQUESTIONTITLE', data)
    },
    UPDATEOPTIONTITLE({commit}, data) {
        commit('UPDATEOPTIONTITLE', data)
    },
    ADDQUESTION({commit}, data) {
        commit('ADDQUESTION', data)
    },
    MOVEQUESTION({commit}, data) {
        commit('MOVEQUESTION', data)
    },
    COPYQUESTION({commit}, data) {
        commit('COPYQUESTION', data)
    },
    DELETEQUESTION({commit}, data) {
        commit('DELETEQUESTION', data)
    },
    /* 选项 */
    ADDOPTION({commit}, data) {
        commit('ADDOPTION', data)
    },
    MOVEOPTION({commit}, data) {
        commit('MOVEOPTION', data)
    },
    DELETEOPTION({commit}, data) {
        commit('DELETEOPTION', data)
    }

}

const getters = {
    getQuestionTitle(state) {
        return state.questionTitle
    },
    getQuestionDesc(state) {
        return state.questionDesc
    },
    getQuestionList(state) {
        return state.questionList
    },
    getActiveQuestionIndex(state) {
        return state.questionList.findIndex(v => state.activeElementUUID === v.uuid)
    },
    getActiveQuestion(state) {
        return state.questionList.find(v => state.activeElementUUID === v.uuid)
    },
    getActiveOptionIndex(state) {
        return state.activeElementOptionId
    }
}

export default {
    namespaced: true, // 为true时，这个配置用来区分模块
    state,
    mutations,
    actions,
    getters
}
