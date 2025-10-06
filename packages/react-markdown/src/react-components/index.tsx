
import React from 'react';

// HTML标签映射React组件
export const components = () => {
  return {
    // 标题组件
    h1: (props: any) => <h1 className="text-3xl font-bold mb-4 mt-6" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mb-3 mt-5" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mb-2 mt-4" {...props} />,
    h4: (props: any) => <h4 className="text-lg font-bold mb-2 mt-3" {...props} />,
    h5: (props: any) => <h5 className="text-base font-bold mb-2 mt-3" {...props} />,
    h6: (props: any) => <h6 className="text-sm font-bold mb-2 mt-3" {...props} />,

    // 段落
    p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,

    // 列表
    ul: (props: any) => <ul className="mb-4 ml-6 list-disc" {...props} />,
    ol: (props: any) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
    li: (props: any) => <li className="mb-1" {...props} />,

    // 链接
    a: (props: any) => (
      <a 
        className="text-blue-600 hover:text-blue-800 underline" 
        target="_blank" 
        rel="noopener noreferrer"
        {...props} 
      />
    ),

    // 强调
    strong: (props: any) => <strong className="font-bold" {...props} />,
    em: (props: any) => <em className="italic" {...props} />,

    // 代码
    code: (props: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    pre: (props: any) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
    ),

    // 引用
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4" {...props} />
    ),

    // 分割线
    hr: (props: any) => <hr className="border-gray-300 my-6" {...props} />,

    // 表格
    table: (props: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300" {...props} />
      </div>
    ),
    thead: (props: any) => <thead className="bg-gray-50" {...props} />,
    tbody: (props: any) => <tbody {...props} />,
    tr: (props: any) => <tr className="border-b border-gray-200" {...props} />,
    th: (props: any) => (
      <th className="px-4 py-2 text-left font-semibold text-gray-900" {...props} />
    ),
    td: (props: any) => <td className="px-4 py-2 text-gray-700" {...props} />,

    // 图片
    img: (props: any) => (
      <img 
        className="max-w-full h-auto rounded-lg mb-4" 
        loading="lazy"
        {...props} 
      />
    ),

    // 删除线
    del: (props: any) => <del className="line-through text-gray-500" {...props} />,

    // 内联代码块
    inlineCode: (props: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />
    ),

    // 任务列表
    input: (props: any) => {
      if (props.type === 'checkbox') {
        return (
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={props.checked}
            readOnly
            {...props} 
          />
        );
      }
      return <input {...props} />;
    },

    // 脚注
    sup: (props: any) => <sup className="text-xs" {...props} />,
    sub: (props: any) => <sub className="text-xs" {...props} />,

    // 键盘按键
    kbd: (props: any) => (
      <kbd className="bg-gray-200 px-2 py-1 rounded text-sm font-mono" {...props} />
    ),

    // 标记/高亮
    mark: (props: any) => <mark className="bg-yellow-200 px-1" {...props} />,

    // 小字体
    small: (props: any) => <small className="text-sm text-gray-600" {...props} />,

    // 定义列表
    dl: (props: any) => <dl className="mb-4" {...props} />,
    dt: (props: any) => <dt className="font-semibold mb-1" {...props} />,
    dd: (props: any) => <dd className="mb-2 ml-4" {...props} />,

    // 引用
    cite: (props: any) => <cite className="italic" {...props} />,

    // 缩写
    abbr: (props: any) => <abbr className="underline decoration-dotted" {...props} />,

    // 变量
    var: (props: any) => <var className="italic font-mono" {...props} />,

    // 示例输出
    samp: (props: any) => <samp className="font-mono bg-gray-100 px-1 rounded" {...props} />,

    // 时间
    time: (props: any) => <time className="text-gray-600" {...props} />,

    // 数据
    data: (props: any) => <data {...props} />,

    // 进度
    progress: (props: any) => <progress className="w-full" {...props} />,

    // 计量
    meter: (props: any) => <meter className="w-full" {...props} />,

    // 详情
    details: (props: any) => <details className="mb-4" {...props} />,
    summary: (props: any) => <summary className="cursor-pointer font-semibold" {...props} />,

    // 图例
    figure: (props: any) => <figure className="mb-4" {...props} />,
    figcaption: (props: any) => <figcaption className="text-sm text-gray-600 text-center mt-2" {...props} />,

    // 文章
    article: (props: any) => <article className="mb-4" {...props} />,
    section: (props: any) => <section className="mb-4" {...props} />,
    aside: (props: any) => <aside className="mb-4" {...props} />,
    nav: (props: any) => <nav className="mb-4" {...props} />,

    // 标题组
    hgroup: (props: any) => <hgroup className="mb-4" {...props} />,

    // 地址
    address: (props: any) => <address className="italic not-italic" {...props} />,

    // 主内容
    main: (props: any) => <main className="mb-4" {...props} />,

    // 页眉页脚
    header: (props: any) => <header className="mb-4" {...props} />,
    footer: (props: any) => <footer className="mb-4" {...props} />,

    // 容器
    div: (props: any) => <div className="mb-2" {...props} />,
    span: (props: any) => <span {...props} />,

    // 换行
    br: (props: any) => <br {...props} />,

    // 表单元素（虽然Markdown不常用，但可能出现在HTML中）
    form: (props: any) => <form className="mb-4" {...props} />,
    fieldset: (props: any) => <fieldset className="mb-4 border border-gray-300 p-4" {...props} />,
    legend: (props: any) => <legend className="px-2 font-semibold" {...props} />,
    label: (props: any) => <label className="block text-sm font-medium mb-1" {...props} />,
    button: (props: any) => (
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" {...props} />
    ),
    select: (props: any) => (
      <select className="w-full px-3 py-2 border border-gray-300 rounded" {...props} />
    ),
    textarea: (props: any) => (
      <textarea className="w-full px-3 py-2 border border-gray-300 rounded" {...props} />
    ),

    // 媒体元素
    video: (props: any) => (
      <video className="max-w-full h-auto rounded-lg mb-4" controls {...props} />
    ),
    audio: (props: any) => (
      <audio className="w-full mb-4" controls {...props} />
    ),
    source: (props: any) => <source {...props} />,
    track: (props: any) => <track {...props} />,

    // 嵌入内容
    iframe: (props: any) => (
      <iframe className="w-full h-96 rounded-lg mb-4" {...props} />
    ),
    embed: (props: any) => <embed className="mb-4" {...props} />,
    object: (props: any) => <object className="mb-4" {...props} />,
    param: (props: any) => <param {...props} />,

    // 画布
    canvas: (props: any) => <canvas className="mb-4" {...props} />,

    // SVG
    svg: (props: any) => <svg className="mb-4" {...props} />,

    // 语义化标签
    ruby: (props: any) => <ruby {...props} />,
    rt: (props: any) => <rt className="text-xs" {...props} />,
    rp: (props: any) => <rp className="text-xs" {...props} />,
    bdi: (props: any) => <bdi {...props} />,
    bdo: (props: any) => <bdo {...props} />,

    // 编辑相关
    ins: (props: any) => <ins className="bg-green-100 px-1" {...props} />,

    // 其他可能出现的标签
    wbr: (props: any) => <wbr {...props} />,
    area: (props: any) => <area {...props} />,
    map: (props: any) => <map {...props} />,
    base: (props: any) => <base {...props} />,
    link: (props: any) => <link {...props} />,
    meta: (props: any) => <meta {...props} />,
    style: (props: any) => <style {...props} />,
    title: (props: any) => <title {...props} />,
    script: (props: any) => <script {...props} />,
    noscript: (props: any) => <noscript {...props} />,
    template: (props: any) => <template {...props} />,
    slot: (props: any) => <slot {...props} />,
  };
};