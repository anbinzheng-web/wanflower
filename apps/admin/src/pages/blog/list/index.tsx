import { ProTable, defineColumns } from '@/components/ProTable'
import { Button, Space, Tag, Modal } from 'antd'
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useFormModal } from '@/hooks/useFormModal';
import { useFullModal } from '@/hooks/useFullModal';
import { API } from '@/api';
import { useState, useEffect } from 'react';
import { renderReactMarkdown } from 'react-markdown';

// Markdown渲染组件
const MarkdownRenderer = ({ content }: { content: string }) => {
  const [renderedContent, setRenderedContent] = useState<React.ReactNode>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        const result = await renderReactMarkdown(content);
        setRenderedContent(result.result);
      } catch (error) {
        console.error('Markdown渲染失败:', error);
        setRenderedContent(<p className="text-red-500">Markdown渲染失败</p>);
      } finally {
        setLoading(false);
      }
    };

    if (content) {
      renderMarkdown();
    } else {
      setRenderedContent(<p className="text-gray-500">暂无内容</p>);
      setLoading(false);
    }
  }, [content]);

  if (loading) {
    return <div className="text-gray-500">渲染中...</div>;
  }

  return <div className="prose max-w-none">{renderedContent}</div>;
};

// Ghost风格的Markdown编辑器组件
const GhostStyleMarkdownEditor = ({ 
  value, 
  onChange, 
  placeholder = "开始写作..." 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string;
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [renderedContent, setRenderedContent] = useState<React.ReactNode>(null);
  const [loading, setLoading] = useState(false);

  // 实时渲染Markdown
  useEffect(() => {
    const renderMarkdown = async () => {
      if (!value.trim()) {
        setRenderedContent(null);
        return;
      }

      setLoading(true);
      try {
        const result = await renderReactMarkdown(value);
        setRenderedContent(result.result);
      } catch (error) {
        console.error('Markdown渲染失败:', error);
        setRenderedContent(<p className="text-red-500">Markdown渲染失败</p>);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(renderMarkdown, 300); // 防抖
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 工具栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              !isPreview 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            编辑
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              isPreview 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            预览
          </button>
        </div>
        <div className="text-xs text-gray-500">
          {value.length} 字符
        </div>
      </div>

      {/* 编辑器内容区域 */}
      <div className="flex-1 flex">
        {!isPreview && (
          <div className="flex-1 flex flex-col">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 w-full p-4 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed"
              style={{ 
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                lineHeight: '1.6'
              }}
            />
          </div>
        )}

        {/* 预览区域 */}
        {(isPreview || !isPreview) && (
          <div className={`${isPreview ? 'w-full' : 'w-1/2'} border-l border-gray-200 bg-white`}>
            <div className="h-full overflow-y-auto">
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2">渲染中...</span>
                  </div>
                ) : renderedContent ? (
                  <div className="prose prose-sm max-w-none">
                    {renderedContent}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p>开始写作，预览将在这里显示</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Ghost风格的博客编辑器组件
const BlogEditor = ({ 
  initialData, 
  tags, 
  categories, 
  onSave 
}: { 
  initialData: any; 
  tags: any[]; 
  categories: any[]; 
  onSave: (values: any) => Promise<boolean>;
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    summary: initialData.summary || '',
    project_type: initialData.project_type || 'wanflower',
    language: initialData.language || 'zh',
    status: initialData.status || 'DRAFT',
    is_featured: initialData.is_featured || false,
    tag_ids: initialData.tag_ids || [],
    category_ids: initialData.category_ids || [],
    md: initialData.md || ''
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const success = await onSave(formData);
      if (success) {
        // 可以在这里添加关闭弹窗的逻辑
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {formData.title || '无标题'}
          </h2>
          <div className="flex items-center space-x-2">
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DRAFT">草稿</option>
              <option value="PUBLISHED">发布</option>
              <option value="ARCHIVED">已下线</option>
            </select>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>精选</span>
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* 左侧：表单设置 */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* 基本信息 */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">基本信息</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    标题 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="请输入博客标题"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    摘要
                  </label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="请输入博客摘要"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    项目类型 *
                  </label>
                  <input
                    type="text"
                    value={formData.project_type}
                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                    placeholder="请输入项目类型"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    语言
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="zh">中文</option>
                    <option value="en">英文</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 标签和分类 */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">分类和标签</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    标签
                  </label>
                  <select
                    multiple
                    value={formData.tag_ids}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => Number(option.value));
                      setFormData({ ...formData, tag_ids: values });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    size={4}
                  >
                    {tags.map(tag => (
                      <option key={tag.value} value={tag.value}>
                        {tag.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    分类
                  </label>
                  <select
                    multiple
                    value={formData.category_ids}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => Number(option.value));
                      setFormData({ ...formData, category_ids: values });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    size={4}
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：Markdown编辑器 */}
        <div className="flex-1">
          <GhostStyleMarkdownEditor
            value={formData.md}
            onChange={(value) => setFormData({ ...formData, md: value })}
            placeholder="开始写作..."
          />
        </div>
      </div>
    </div>
  );
};

export default function() {
  const showFormModal = useFormModal();
  const showFullModal = useFullModal();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  // 获取标签和分类数据
  useEffect(() => {
    const fetchTagsAndCategories = async () => {
      try {
        const [tagsRes, categoriesRes] = await Promise.all([
          API.blog.blogControllerListTags({ 
            page: 1, 
            page_size: 1000,
            project_type: 'wanflower',
            is_active: true,
            search: ''
          }),
          API.blog.blogControllerListCategories({ 
            page: 1, 
            page_size: 1000,
            project_type: 'wanflower',
            is_active: true,
            parent_id: 0,
            search: ''
          })
        ]);
        
        if (tagsRes.code === 0 && tagsRes.data?.records) {
          setTags(tagsRes.data.records.map((tag: any) => ({ label: tag.name, value: tag.id })));
        }
        
        if (categoriesRes.code === 0 && categoriesRes.data?.records) {
          setCategories(categoriesRes.data.records.map((cat: any) => ({ label: cat.name, value: cat.id })));
        }
      } catch (error) {
        console.error('获取标签和分类失败:', error);
      }
    };

    fetchTagsAndCategories();
  }, []);

  const columns = defineColumns([
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80
    },
    {
      title: '标题',
      dataIndex: 'title',
      searchType: 'Input',
      searchProps: {
        placeholder: '请输入标题'
      },
      render: (title, record) => (
        <div>
          <div className="font-medium">{title}</div>
          {record.summary && (
            <div className="text-gray-500 text-sm mt-1 line-clamp-2">{record.summary}</div>
          )}
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      searchType: 'Select',
      searchProps: {
        options: [
          { label: '草稿', value: 'DRAFT' },
          { label: '发布', value: 'PUBLISHED' },
          { label: '已下线', value: 'ARCHIVED' }
        ]
      },
      render: (status) => {
        const statusMap = {
          'DRAFT': { color: 'orange', text: '草稿' },
          'PUBLISHED': { color: 'green', text: '发布' },
          'ARCHIVED': { color: 'red', text: '已下线' }
        };
        const statusInfo = statusMap[status] || { color: 'default', text: status };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      }
    },
    {
      title: '项目类型',
      dataIndex: 'project_type',
      searchType: 'Input',
      searchProps: {
        placeholder: '请输入项目类型'
      }
    },
    {
      title: '语言',
      dataIndex: 'language',
      searchType: 'Select',
      searchProps: {
        options: [
          { label: '中文', value: 'zh' },
          { label: '英文', value: 'en' }
        ]
      }
    },
    {
      title: '是否精选',
      dataIndex: 'is_featured',
      searchType: 'Select',
      searchProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false }
        ]
      },
      render: (isFeatured) => isFeatured ? <Tag color="gold">精选</Tag> : '-'
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (tags) => (
        <div className="flex flex-wrap gap-1">
          {tags?.map(tag => (
            <Tag key={tag.id} color={tag.color || 'blue'}>
              {tag.name}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: '分类',
      dataIndex: 'categories',
      render: (categories) => (
        <div className="flex flex-wrap gap-1">
          {categories?.map(category => (
            <Tag key={category.id} color="purple">
              {category.name}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: '阅读量',
      dataIndex: 'view_count',
      sorter: true,
      render: (count) => count || 0
    },
    {
      title: '阅读时间',
      dataIndex: 'reading_time',
      render: (time) => time ? `${time}分钟` : '-'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      render: (date) => globalThis.$formatDate(date)
    }
  ]);

  const actions = [
    {
      name: 'view',
      icon: <EyeOutlined />,
      text: '预览'
    },
    {
      name: 'edit',
      icon: <EditOutlined />,
      text: '编辑'
    },
    {
      name: 'delete',
      icon: <DeleteOutlined />,
      text: '删除',
      danger: true,
      collapsed: true
    }
  ];

  const handleAction = async (name: string, record: any) => {
    switch (name) {
      case 'view':
        // 预览博客内容
        Modal.info({
          title: `预览 - ${record.title}`,
          content: (
            <div className="p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold mb-2">{record.title}</h1>
                {record.summary && (
                  <p className="text-gray-600 mb-4">{record.summary}</p>
                )}
                <div className="flex gap-2 mb-4">
                  <Tag color="blue">{record.project_type}</Tag>
                  <Tag color="green">{record.language}</Tag>
                  {record.is_featured && <Tag color="gold">精选</Tag>}
                </div>
              </div>
              <MarkdownRenderer content={record.md || ''} />
            </div>
          ),
          width: '90%'
        });
        break;
      case 'edit':
        // 编辑博客 - 使用Ghost风格编辑器
        showFullModal({
          title: '编辑博客',
          content: () => <BlogEditor 
            initialData={{
              ...record,
              tag_ids: record.tags?.map(tag => tag.id) || [],
              category_ids: record.categories?.map(cat => cat.id) || []
            }}
            tags={tags}
            categories={categories}
            onSave={async (values) => {
              try {
                const result = await API.blog.blogControllerUpdate({ id: record.id, ...values });
                if (result.code === 0) {
                  globalThis.$message.success('更新成功');
                  return true;
                } else {
                  globalThis.$message.error(result.message || '更新失败');
                  return false;
                }
              } catch (error) {
                globalThis.$message.error('更新失败');
                return false;
              }
            }}
          />
        });
        break;
      case 'delete':
        // 删除博客
        const confirmed = await new Promise((resolve) => {
          Modal.confirm({
            title: '确认删除',
            content: `确定要删除博客"${record.title}"吗？`,
            onOk: () => resolve(true),
            onCancel: () => resolve(false)
          });
        });
        
        if (confirmed) {
          try {
            const result = await API.blog.blogControllerDelete(record.id);
            if (result.code === 0) {
              globalThis.$message.success('删除成功');
              // 刷新表格
              window.location.reload();
            } else {
              globalThis.$message.error(result.message || '删除失败');
            }
          } catch (error) {
            globalThis.$message.error('删除失败');
          }
        }
        break;
    }
  };

  const handleCreate = () => {
    showFullModal({
      title: '创建博客',
      content: () => <BlogEditor 
        initialData={{
          title: '',
          summary: '',
          project_type: 'wanflower',
          language: 'zh',
          status: 'DRAFT',
          is_featured: false,
          tag_ids: [],
          category_ids: [],
          md: ''
        }}
        tags={tags}
        categories={categories}
        onSave={async (values) => {
          try {
            const result = await API.blog.blogControllerCreate(values);
            if (result.code === 0) {
              globalThis.$message.success('创建成功');
              return true;
            } else {
              globalThis.$message.error(result.message || '创建失败');
              return false;
            }
          } catch (error) {
            globalThis.$message.error('创建失败');
            return false;
          }
        }}
      />
    });
  };

  return (
    <div>
      <ProTable
        columns={columns}
        request={API.blog.blogControllerList}
        actions={actions}
        handleAction={handleAction}
        toolBar={
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
              创建博客
            </Button>
          </Space>
        }
      />
    </div>
  );
}