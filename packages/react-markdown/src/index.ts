import { remark } from 'remark';
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { components } from './react-components';
import { Fragment, createElement } from 'react';

import remarkTocJson from './plugins/remarkTocJson';
import rehypeLinkAttr from './plugins/rehypeLinkAttr';
import { jsx, jsxs } from 'react/jsx-runtime';

export const renderReactMarkdown = (md: string) => {
  return remark()
    .use(remarkTocJson)
    .use(remarkRehype) // 先转 HAST
    .use(rehypeLinkAttr) // 在 HAST 层改属性
    .use(rehypeReact, {
      createElement,
      Fragment,
      jsx,
      jsxs,
      components: components()
    })
    .process(md);
}