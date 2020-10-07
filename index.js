const fs = require("fs")
const path = require("path")

/**
 * 1 找当前文件下的所有 音乐文件 暂时只支持网页可以直接播放的格式 mp3 wav
 * 2 一直递归 递归到找完所有的音乐 push 到数组 存储到 data/allData.json 中
 */

// 主函数
function main() {


    const  splitStr = "musicFiles",
    allArr = [],
        constNowPath = __dirname,
        fileFormatArr = ['mp3', 'wav'],
        dataJsonPath = path.resolve(__dirname, "./data/allData.json")
    recursiveDir({
        path: constNowPath,
        fileFormat: fileFormatArr
    })

    makeData(dataJsonPath, JSON.stringify({
        dataList: allArr
    }))
    // 递归函数找指定路径下所有的指定格式的文件
    /**
     * 参数1 obj.path 指定路径 __dirname
     * 参数2 obj.fileFormat 指定格式 ['mp3', 'wav']
     */
    function recursiveDir(obj) {
        if (!isNotDir(obj.path)) return

        // 1 找当前路径下 的 指定格式数据
        let allDirOrFile = fs.readdirSync(obj.path)
        let re = /\.[^\.]+$/ // 找文件的后缀
        let re2 = /\\/g
        if (Array.isArray(allDirOrFile)) {
            allDirOrFile.map(itemIn => {
                // let nowPath = path.resolve(obj.path, itemIn)
                let nowPath = path.resolve(obj.path, itemIn)
                // let aaa = re.test(itemIn)
                // console.log("aaa", aaa)
                // // let bbb = obj.fileFormat.includes(itemIn.match(re)[0])
                // let bbb = itemIn.match(re)
                // console.log("bbb", bbb)
                if (!isNotDir(nowPath) && re.test(itemIn) && obj.fileFormat.includes(itemIn.match(re)[0].split('.')[1])) {
                    allArr.push(nowPath.split("musicFiles")[1].replace(re2, "/"))
                } else { 
                    recursiveDir({
                        path: nowPath,
                        fileFormat: fileFormatArr
                    })
                }
            })
        } else {
            return
        }
    }
}

main()


// 判断当前文件是不是文件夹
function isNotDir(params) {
    if (!params) {
        return false
    }
    let temp = fs.lstatSync(params)
    return temp.isDirectory()
}

// 生成文件
function makeData(filePath, data) {
    if (!fs.existsSync(filePath)) {
        let dir1 = path.parse(filePath).dir
        fs.mkdirSync(dir1)
    }
    fs.writeFileSync(filePath, data, 'utf-8')
}
module.exports = {
    main
}