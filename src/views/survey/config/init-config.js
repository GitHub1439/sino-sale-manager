export default {
    ruleOption: [{
        title: '不限',
        reg: '',
        method: ''
    }, {
        title: '数字',
        reg: '^[0-9]*$',
        method: 'number'
    }, {
        title: '字母',
        reg: '^[A-Za-z]+$',
        method: 'alphabet'
    }, {
        title: '中文',
        reg: '^[\u4e00-\u9fa5]{0,}$',
        method: 'chinese'
    }, {
        title: 'Email',
        reg: '^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$',
        method: 'email'
    }, {
        title: '手机号码',
        reg: '^1[3456789]\\d{9}$',
        method: 'mobile'
    }]
}
