import { renderReactMarkdown } from 'react-markdown';
import { createAsyncComponent } from './AsyncComponent';

export const Markdown = createAsyncComponent(async (props: { md: string }) => {
  const result = await renderReactMarkdown(props.md)
  return {
    default: () => result.result
  }
});