#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const colors = require('colors')
const ejs = require('ejs')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp')
const shelljs = require('shelljs')

console.log("n" + "Hello World, I'm flash cli".magenta + "\n")
console.log("It's just a test".red + "\n")

const ENCODE = 'utf-8'
const BUILD_PATH = './build'
const BUILD_FILE_TYPE = '.html'

const question = [
    {
        type: 'input',
        name: 'name',
        message: '请输入姓名'
    },
    {
        type: 'list',
        name: 'sex',
        message: '性别',
        choices: [{
            name: '男',
            value: 'male'
        }, {
            name: '女',
            value: 'female'
        }, {
            name: '其他',
            value: 'other'
        }]
    },
    {
        type: 'checkbox',
        name: 'labels',
        message: '标签',
        choices: [{
            name: 'html5',
            value: 'html5'
        }, {
            name: 'css3',
            value: 'css3'
        }, {
            name: 'node',
            value: 'node'
        }]
    },
    {
        type: 'input',
        name: 'fileName',
        default: 'index',
        message: '文件名称'
    }
];

// 交互
inquirer.prompt(question).then(answer => {
    const fileName = `${answer.fileName}${BUILD_FILE_TYPE}`
    createFile(answer, fileName);
    openFile(`${BUILD_PATH}/${fileName}`)
})

// 创建文件
let createFile = (data, fileName) => {
    let tpl = fs.readFileSync(__dirname + '/tpl.html', ENCODE)
    mkdirp.sync(BUILD_PATH)
    fs.writeFileSync(`${BUILD_PATH}/${fileName}`, ejs.render(tpl, data), ENCODE)
}

// 打开文件
let openFile = buildFilePath => {
    if(process.platform === 'darwin') {
        shelljs.exec(`open ${buildFilePath}`)
    } else if (process.platform === 'win32') {
        shelljs.exec(`start ${buildFilePath}`)
    } else {
        console.log('This platform is ' + process.platform)
    }
    endTip(buildFilePath)
}

// 结束语
const endTip = buildFilePath => {
    console.log("\n" + "build file:" + (path.resolve(buildFilePath)).magenta  + "\n" )
}


