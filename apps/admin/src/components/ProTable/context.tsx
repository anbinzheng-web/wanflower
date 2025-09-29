import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';
import { ProTableProps } from './interface';

export interface ProTableContextValue {
  params: any
  setParams: Dispatch<SetStateAction<any>>
  request: ProTableProps['request']
}

const ProTableContext = createContext<Partial<ProTableContextValue>>({})

export const Provider = (props: ProTableContextValue & { children: ReactNode }) => {
  const { children, ...value } = props;
  return <ProTableContext.Provider value={value}>
    {children}
  </ProTableContext.Provider>
}

export const useProTableContext = () => {
  return useContext(ProTableContext) as ProTableContextValue;
}
