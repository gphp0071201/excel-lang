import * as fs from 'fs'
import * as path from 'path'
import * as XLSX from 'node-xlsx'

export interface OutPut {
  filename: string
  filepath: string
}

export type DataInfo = Record<string, string>

export interface ExcelData {
  header: string[]
  data: string[][]
}

export class ExcelLang {
  private sourceFilepath: string
  private sheetName: string
  private outputFile: string

  constructor(
    sourceFilepath: string,
    output: OutPut,
    sheetName: string = 'Sheet1'
  ) {
    this.sourceFilepath = sourceFilepath
    this.outputFile = path.join(output.filepath, output.filename)
    this.sheetName = sheetName
  }
  /**
   * 解析 excel 数据
   * @returns
   */
  protected parseExcelFile(): ExcelData {
    if (!fs.existsSync(this.sourceFilepath)) {
      throw new Error(`Not found file: ${this.sourceFilepath}`)
    }
    const excelData = XLSX.parse(this.sourceFilepath)
    return this.checkData(excelData)
  }

  /**
   * 筛选数据
   * @param info 等筛选的数据
   * @returns
   */
  private checkData(info: { name: string; data: string[][] }[]): ExcelData {
    const data = info.find((item) => item.name === this.sheetName)
    if (!data) {
      throw new Error(`Not fount Sheet: ${this.sheetName}`)
    }
    return {
      header: data.data[0],
      data: data.data.slice(1),
    }
  }

  /**
   * 处理数据
   * @param rawData 待处理的数据
   */
  private handleData(rawData: ExcelData): Record<string, DataInfo> {
    const { header, data } = rawData
    const result: Record<string, DataInfo> = {}
    for (let i = 1; i < header.length; i++) {
      if (!header[i]) continue
      result[header[i]] = this.dataFormat(i, data)
    }
    return result
  }
  /**
   * 原始数据转成
   * @param index
   * @param data
   * @returns
   */
  private dataFormat(index: number, data: string[][]): DataInfo {
    const result: DataInfo = {}
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === undefined) continue
      result[data[i][0]] = data[i][index] || data[i][0]
    }
    return result
  }
  /**
   * 初始化
   */
  public init() {
    console.log(this.parseExcelFile, 'this', this)
    const data = this.parseExcelFile()
    const directroyPath = path.dirname(this.outputFile)
    if (!fs.existsSync(directroyPath)) {
      fs.mkdirSync(directroyPath, { recursive: true })
    }
    fs.writeFileSync(this.outputFile, JSON.stringify(this.handleData(data)))
    console.log(`File generated successfully, filepath: ${this.outputFile}`)
  }
}
