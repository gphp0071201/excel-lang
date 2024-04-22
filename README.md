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

excel 配置如下

```markdown
|      | zh_CN    | en         | ... |
| ---- | -------- | ---------- | --- |
| name | 姓名     | Name       | ... |
| succ | 操作成功 | Successful | ... |
| ...  | ...      | ...        | ... |
```

生成json文件如下

```json
{
  "zh_CN": {
    "name": "姓名",
    "succ": "操作成功"
    // ...
  },
  "en": {
    "name": "Name",
    "succ": "Successful"
    // ...
  }
  // ...
}
```
