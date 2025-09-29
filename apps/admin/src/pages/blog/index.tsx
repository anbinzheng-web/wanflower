import { ProTable, defineColumns } from '@/components/ProTable'
import { Button, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import { Markdown } from '@/components/Markdown';
import { MarkdownTest } from './test.md';
import { Suspense } from 'react';
import { useFormModal } from '@/hooks/useFormModal';

const md = `# Pluto

Pluto is a dwarf planet in the Kuiper belt.

## Contents

## History

### Discovery

In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the
position of…

### Name and symbol

The name Pluto is for the Roman god of the underworld, from a Greek epithet for
Hades…

### Planet X disproved

Once Pluto was found, its faintness and lack of a viewable disc cast doubt…

## Orbit

Pluto’s orbital period is about 248 years…

[百度](https://baidu.com)
[内链](/xxx)

![alt content](https://markdown.com.cn/assets/img/philly-magic-garden.9c0b4415.jpg "Magic Gardens")
`

export default function() {
  const showFormModal = useFormModal();
  const columns = defineColumns([
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '状态',
      dataIndex: 'status',
      searchType: 'Select',
      searchProps: {
        options: [
          {
            label: '草稿',
            value: 'dart'
          },
          {
            label: '发布',
            value: 'publied'
          }
        ]
      }
    },
  ])

  const request = async () => {
    return {
      code: 0,
      data: {
        records: [
          {
            id: 1,
            title: '文章 1',
            status: 'dart'
          },
          {
            id: '2',
            title: '文章 2',
            status: 'publied'
          },
          {
            id: '3',
            title: '文章 3',
            status: 'dart'
          }
        ]
      }
    }
  }

  const actions = [
    {
      name: 'update',
      icon: <EditOutlined />
    }
  ]

  const handleAction = async (name, record) => {
    console.log(name, record)
  }

  const handleCreate = async () => {
    showFormModal({
      title: '创建博客',
      schemas: [
        {
          name: 'title',
          label: '标题',
          component: 'Input',
          componentProps: {
            
          }
        },
        {
          name: 'status',
          label: '状态',
          component: 'Select'
        }
      ],
      onOk: () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(null), 3000)
        })
      }
    })
  }

  const searchRight = <Button type='primary' onClick={handleCreate}>创建</Button>
  return <div>
    <ProTable columns={columns} request={request} searchRight={searchRight} actions={actions} handleAction={handleAction}></ProTable>

    {/* <Markdown md={md}></Markdown> */}

    <Suspense fallback={<div>Loading markdown...</div>}>
      <MarkdownTest md={md} />
    </Suspense>
  </div>
}