import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Element } from "hast";

const rehypeLinkAttr: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "a") {
        const href = node.properties?.href as string | undefined;
        if (href?.startsWith("http")) {
          node.properties = {
            ...node.properties,
            target: "_blank",
            rel: "nofollow noopener noreferrer",
          };
        }
      }
    });
  };
};

export default rehypeLinkAttr