# Markdown 语法测试

这是一个完整的 Markdown 语法测试文档，用于验证所有组件是否正确渲染。

## 基础文本格式

这是普通段落文本。

**粗体文本** 和 *斜体文本* 以及 ***粗斜体文本***。

~~删除线文本~~ 和 `内联代码`。

## 标题层级

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 列表

### 无序列表
- 第一项
- 第二项
  - 嵌套项 1
  - 嵌套项 2
- 第三项

### 有序列表
1. 第一项
2. 第二项
   1. 嵌套项 1
   2. 嵌套项 2
3. 第三项

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 另一个未完成任务

## 链接和图片

[链接到百度](https://www.baidu.com)

![图片描述](https://via.placeholder.com/300x200?text=示例图片)

## 代码

### 内联代码
使用 `console.log()` 来输出信息。

### 代码块
```javascript
function hello() {
  console.log("Hello, World!");
  return "success";
}
```

```python
def hello():
    print("Hello, World!")
    return "success"
```

## 引用

> 这是一个引用块。
> 
> 可以包含多行内容。
> 
> > 这是嵌套引用。

## 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

## 分割线

---

## HTML 标签测试

### 语义化标签
<mark>高亮文本</mark>
<kbd>Ctrl</kbd> + <kbd>C</kbd>
<small>小字体文本</small>
<sup>上标</sup> 和 <sub>下标</sub>

### 定义列表
<dl>
  <dt>术语1</dt>
  <dd>定义1</dd>
  <dt>术语2</dt>
  <dd>定义2</dd>
</dl>

### 详情折叠
<details>
  <summary>点击展开</summary>
  <p>这是折叠的内容。</p>
</details>

### 图例
<figure>
  <img src="https://via.placeholder.com/400x300?text=图例图片" alt="图例">
  <figcaption>这是一个图例说明</figcaption>
</figure>

### 媒体元素
<video controls width="400">
  <source src="sample.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>

<audio controls>
  <source src="sample.mp3" type="audio/mpeg">
  您的浏览器不支持音频标签。
</audio>

### 表单元素
<form>
  <fieldset>
    <legend>表单标题</legend>
    <label for="name">姓名:</label>
    <input type="text" id="name" name="name">
    <br><br>
    <label for="email">邮箱:</label>
    <input type="email" id="email" name="email">
    <br><br>
    <label for="message">消息:</label>
    <textarea id="message" name="message"></textarea>
    <br><br>
    <button type="submit">提交</button>
  </fieldset>
</form>

### 其他标签
<address>
  联系地址：北京市朝阳区<br>
  电话：123-456-7890
</address>

<time datetime="2024-01-01">2024年1月1日</time>

<abbr title="HyperText Markup Language">HTML</abbr>

<var>变量名</var>

<samp>示例输出</samp>

<data value="123">数据值</data>

<progress value="70" max="100">70%</progress>

<meter value="6" min="0" max="10">6/10</meter>

## 特殊字符和符号

&copy; &reg; &trade; &nbsp;

## 脚注

这是一个脚注引用[^1]。

[^1]: 这是脚注内容。

## 数学公式（如果支持）

虽然移除了MathML支持，但可以显示简单的数学表达式：

E = mc²

a² + b² = c²

## 结束

以上就是完整的 Markdown 语法测试。所有标签都应该正确渲染。
