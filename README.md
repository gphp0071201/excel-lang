# excel-lang

使用 excel 配置多语言，转化为 json 文件

# Usage

```ts
const excelLang = new ExcelLang(path.resolve(__dirname, './lang.xlsx'), {
  filename: 'lang.json',
  filepath: path.resolve(__dirname, './'),
})
excelLang.init()

```
