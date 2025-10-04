import { Table, Result, Button } from 'antd';
import { ProTableProps } from './interface'
import { useState, useEffect, useMemo, useCallback, useImperativeHandle } from 'react';
import { isFunction, isArray } from '@/utils/is';
import { Provider } from './context';
import { Actions } from './actions';
import { Search } from './search';

export const ProTable = (props: ProTableProps) => {
  const { 
    columns: columnsProps, 
    handleAction, 
    request, 
    dataSource, 
    renderAction, 
    actions,
    searchRight, 
    ref,
    ...rest 
  } = props;
  const defaultParams = {
    page: 1,
    page_size: 10
  };
  columnsProps?.forEach(col => {
    col.searchDefaultValue ?? (defaultParams[col.dataIndex] = col.searchDefaultValue)
  })
  const [params, setParams] = useState(defaultParams)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState()

  const fetchData = useCallback((fetchParams = {}) => {
    setIsError(false)
    setLoading(true)
    return request({
      ...params,
      ...fetchParams
    })
      .then((result) => {
        if (result.code === 0) {
          setTableData(result.data.records);
          // 分页器的数据
        } else {
          setErrorMessage(result.message);
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true)
        setErrorMessage(error.message || '请求出错了');
      })
      .finally(() => setLoading(false))
  }, [params])

  useEffect(() => {
    if (isFunction(request) && !dataSource) {
      fetchData()
    }
  }, [params, dataSource])

  const errorResult = useMemo(() => {
    if (isError) {
      return <Result
        status='error'
        title='错误信息'
        subTitle={errorMessage || '未知错误'}
        extra={[
          <Button key='back' type='primary' onClick={() => fetchData()}>
            重试
          </Button>
        ]}
      ></Result>
    }
  }, [isError, errorMessage])

  const columns = [...columnsProps];

  if (isArray(actions)) {
    const render = isFunction(renderAction) ? renderAction : (_col, item, index) => {
      return <Actions record={item} handleAction={handleAction} actions={actions} />
    }
    columns.push({
      title: '操作',
      fixed: 'right',
      render: render
    })
  }

  useImperativeHandle(ref, () => {
    return {
      refresh: () => {
        fetchData()
      }
    }
  })

  return <Provider setParams={setParams} params={params} request={fetchData}>
    <div className='bg-white p-4'>
      <Search columns={columns} right={searchRight} />
      <Table 
        rowKey={"id"}
        {...rest} 
        columns={columns as any[]} 
        dataSource={dataSource || tableData}
        locale={{ emptyText: errorResult }}
        loading={loading}
      ></Table>
    </div>
  </Provider>
}

export const defineColumns = (columns: ProTableProps['columns']) => {
  return columns as ProTableProps['columns']
}

export const useColumns = (columns: ProTableProps['columns']) => {
  return useState<ProTableProps['columns']>(columns)
}

export { defineActions, useActions } from './actions'

export * from './interface'