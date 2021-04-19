export default [
    {
        title: '基础组件',
        components: [
            {
                elName: 'sn-radio',
                pluginTitle: '单选题',
                pluginIcon: 'bianji',
                default: {
                    allownull: false,
                    charcount: '',
                    charcountlimit: false,
                    checkmethod: '',
                    notfilled: false
                }
            },
            {
                elName: 'sn-checkbox',
                pluginTitle: '多选题',
                pluginIcon: 'config',
                default: {
                    allownull: false,
                    charcount: '',
                    charcountlimit: false,
                    checkmethod: '',
                    notfilled: false
                }
            },
            {
                elName: 'sn-text',
                pluginTitle: '填空题',
                pluginIcon: 'dakai'

            },
            {
                elName: 'sn-textarea',
                pluginTitle: '多行填空题',
                pluginIcon: 'bingtu'
            }
        ]
    }/* ,
    {
        title: '其他组件',
        components: []
    } */
]
