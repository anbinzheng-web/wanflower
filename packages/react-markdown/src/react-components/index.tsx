
// html 标签映射 React 组件
export const components = () => {
  return {
    p: (props: any) => {
      return <p>{props.children}</p>
    }
  }
}