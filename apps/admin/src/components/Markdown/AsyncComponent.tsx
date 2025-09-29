import { useEffect, useState } from "react";

type AsyncCompLoader<P> = (props: P) => Promise<{
  default: React.ComponentType<any>;
}>;

export function createAsyncComponent<P>(loader: AsyncCompLoader<P>) {
  return function AsyncWrapper(props: any) {
    const [Comp, setComp] = useState<React.ComponentType<any> | null>(null);

    useEffect(() => {
      let mounted = true;
      loader(props).then((mod) => {
        if (mounted) setComp(() => mod.default);
      });
      return () => {
        mounted = false;
      };
    }, [loader]);

    if (!Comp) return <div>Loading...</div>;
    return <Comp {...props} />;
  };
}
