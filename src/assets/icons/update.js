/**
 * 用来批量处理svg 文件颜色问题
 * 不建议直接操作svg文件夹中的svg文件，
 * 下载svg文件后翻到一个新的目录来处理新下载的svg文件，处理完成后把生产新的svg文件复制到svg目录下
 */

let fs = require('fs')
let files = fs.readdirSync('./svg')
files.forEach((item, index) => {
    console.log(item, index)
    fs.readFileSync('./svg/' + item, 'utf8', (err, f) => {
        let result = f.replace(/fill="#333333"/g, '')

        fs.writeFileSync('./svg_update/' + item, result, 'utf8', (e) => {
            if (e) return console.log(e)
        })

    })
})
