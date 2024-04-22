import * as fs from 'fs'
import * as path from 'path'
import { ExcelLang } from '../src'

describe('从excel 表格 生成 json文件', () => {
  const nonExistFile = path.resolve(__dirname, './data.xlsx')
  const existFile = path.resolve(__dirname, './lang.xlsx')
  const outputFile = path.resolve(__dirname, './lang.json')
  const sheetName = 'lang'

  const excelLang = new ExcelLang(nonExistFile, {
    filename: 'lang.json',
    filepath: path.resolve(__dirname, './')
  })

  it('xlsx文件不存在时是否抛出错误', () => {
    expect(excelLang.init.bind(excelLang)).toThrow(
      new Error(`Not found file: ${nonExistFile}`)
    )
  })

  it('xlsx文件存在, Sheet 不存在时 是否抛出错误', () => {
    excelLang.setSourceFile(existFile)
    excelLang.setSheetName('noSheet')
    expect(excelLang.init.bind(excelLang)).toThrow(
      new Error(`Not fount Sheet: noSheet`)
    )
  })

  it('xlsx测试文件和 Sheet 存在时, 是否生成json文件', () => {
    excelLang.setSheetName('')
    excelLang.init()
    const fileExists = fs.existsSync(outputFile)
    expect(fileExists).toBe(true)
  })

  it('测试文件生成的内容是否与预期一致', () => {
    const jsonFile = fs.readFileSync(outputFile, 'utf-8')
    expect(jsonFile).toEqual(
      JSON.stringify({
        zh_CN: {
          name: '姓名',
          succ: '操作成功'
        },
        en: {
          name: 'Name',
          succ: 'Successful'
        }
      })
    )
  })
})
