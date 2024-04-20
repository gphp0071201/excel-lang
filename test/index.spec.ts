import * as path from 'path'
import { ExcelLang } from '../src'

describe('测试文件生成', () => {
  it('xlsx文件不存在时是否报错', () => {
    let sourceFilepath = path.resolve(__dirname, './data.xlsx')
    let excelLang = new ExcelLang(sourceFilepath, {
      filename: 'l.json',
      filepath: path.resolve(__dirname, './'),
    })
    expect(excelLang.init.bind(excelLang)).toThrow(
      new Error(`Not found file: ${sourceFilepath}`)
    )
    // sourceFilepath = path.resolve(__dirname, './lang.xlsx')
    // excelLang = new ExcelLang(sourceFilepath, {filename: 'lang.json', filepath: path.resolve(__dirname, './')})
  })
})
