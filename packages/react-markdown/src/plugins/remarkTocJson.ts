// remark-toc-json.ts
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import type { Plugin } from 'unified'
import type { Root, Heading, Text } from 'mdast'

/**
 * TOC 节点类型
 */
export interface TocNode {
  depth: number
  value: string
  id: string
  children: TocNode[]
}

/**
 * 插件选项
 */
export interface RemarkTocJsonOptions {}

/**
 * remark 插件：生成 toc + 给标题加 id
 */
const remarkTocJson: Plugin<[RemarkTocJsonOptions?], Root> = (options = {}) => {
  const slugger = new GithubSlugger()

  return (tree: Root, file: any) => {
    slugger.reset()
    const flatToc: Omit<TocNode, 'children'>[] = []

    visit(tree, 'heading', (node: Heading) => {
      const text = node.children
        .filter((c): c is Text => c.type === 'text')
        .map((c) => c.value)
        .join('')

      const slug = slugger.slug(text)

      // 给 heading 节点加上 id
      node.data = node.data || {}
      node.data.hProperties = { ...(node.data.hProperties || {}), id: slug }

      flatToc.push({ depth: node.depth, value: text, id: slug })
    })

    file.data.toc = buildTocTree(flatToc)
  }
}

export default remarkTocJson

/**
 * 把平铺 toc 转成树结构
 */
function buildTocTree(flatToc: Omit<TocNode, 'children'>[]): TocNode[] {
  const root: TocNode[] = []
  const stack: TocNode[] = []

  flatToc.forEach((item) => {
    const node: TocNode = { ...item, children: [] }

    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop()
    }

    if (stack.length === 0) {
      root.push(node)
      stack.push(node)
    } else {
      stack[stack.length - 1].children.push(node)
      stack.push(node)
    }
  })

  return root
}
