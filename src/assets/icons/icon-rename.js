let fs = require('fs')

let PATH = './' // 目录

//  遍历目录得到文件信息
function walk(path, callback) {
    let files = fs.readdirSync(path)

    files.forEach((file) => {
        if (fs.statSync(path + '/' + file).isFile()) {
            callback(path, file)
        }
    })
}

// 修改文件名称
function rename (oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            throw err
        }
    })
}

// 运行
walk(PATH, (path, fileName) => {
    let oldPath = path + '/' + fileName // 源文件路径
    let newPath = path + '/' + 'icon-' + fileName // 新路径

    rename(oldPath, newPath)
})
