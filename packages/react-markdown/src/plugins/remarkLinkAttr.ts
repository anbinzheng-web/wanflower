// remark-link-attr.ts
import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root, Link } from 'mdast'

export interface RemarkLinkAttrOptions {
  rel?: string
  target?: string
}

const remarkLinkAttr: Plugin<[RemarkLinkAttrOptions?], Root> = (options = {}) => {
  const { rel = 'nofollow noopener noreferrer', target = '_blank' } = options

  return (tree: Root) => {
    visit(tree, 'link', (node: Link) => {
      // 只对外链添加
      if (!node.url.startsWith('/')) {
        node.data = node.data || {}
        node.data.hProperties = {
          ...(node.data.hProperties || {}),
          rel,
          target
        }
      }
    })
  }
}

export default remarkLinkAttr
