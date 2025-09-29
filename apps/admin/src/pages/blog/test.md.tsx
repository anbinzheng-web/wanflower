import React from "react";
import { renderReactMarkdown } from 'react-markdown';

// 全局缓存（可以按 props key 做更精细的缓存）
const cache = new WeakMap<any, Promise<React.ComponentType<any>>>();

export function lazyWithParams<P>(
  loader: (props: P) => Promise<React.ComponentType<P>>
) {
  return function AsyncWrapper(props: P) {
    let promise = cache.get(loader);

    if (!promise) {
      promise = loader(props);
      cache.set(loader, promise);
    }

    const Comp = (promise as any).__result as React.ComponentType<P>;
    if (!Comp) {
      // 把 promise 挂载 __result
      (promise as any).__result = undefined;
      promise.then((mod) => {
        (promise as any).__result = mod;
      });
      throw promise; // 抛给 Suspense
    }

    return <Comp {...props} />;
  };
}


// 假设 renderReactMarkdown 返回 ReactNode
async function renderMarkdownComp(md: string) {
//   const result = await new Promise((resovle) => {
//     setTimeout(() => {
// resovle({ result: 112333 })
//     }, 2000)
//   })
  try {
    const result = await renderReactMarkdown(md)
    console.log('result', result)
    return () => <>{result.result}</>;
  } catch (error) {
    return () => <div>组件出错了</div>
  }
  
}

export const MarkdownTest = lazyWithParams(async ({ md }: { md: string }) => {
  return await renderMarkdownComp(md);
});
