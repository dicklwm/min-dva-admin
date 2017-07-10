/** Created by Min on 2017/5/31.  */
import React from 'react';
import PropsType from 'prop-types';
import { Tree, Input } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const getParentKey = (title, tree) => {
  let parentKey = '';
  if (tree) {
    tree.forEach((node) => {
      if (node.children) {
        if (node.children.some(item => item.title === title)) {
          parentKey = node.id;
        } else if (getParentKey(title, node.children)) {
          parentKey = getParentKey(title, node.children);
        }
      }
    });
  }
  return parentKey;
};

export default class SearchTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
    };
    this.titles = [];
  }

  // 默认全部展开
  componentDidMount() {
    this.setState({
      expandedKeys: this.titles.map(item => `${item.id}`),
    });
  }

  // 默认全部展开
  componentDidUpdate(prevProps) {
    if (prevProps.treeData.length !== this.props.treeData.length) {
      this.setState({
        expandedKeys: this.titles.map(item => `${item.id}`),
      });
    }
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = this.titles.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return `${item.pid}`;
      }
      return null;
    });
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };


  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const { treeData, SearchPlaceholder,
      showLine, defaultExpandAll, onSelect,
      selectedKeys, tools,
    } = this.props;
    this.titles = [];
    const loop = data => data && data.map((item) => {
      // 防止数据不更新，先清空数据，再重新push进去
      this.titles.push(item);
      // if (!this.titles.some(t => t.id === item.id)) {
      //   console.log(item.contents);
      // }
      const index = item.title.search(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
          <span className="tools">
            {
              tools ?
              tools.map((tool, i) => {
                return React.cloneElement(tool, {
                  key: i,
                  item,
                  title: tool.props.title ? tool.props.title(item) : undefined,
                  content: tool.props.content ? tool.props.content(item) : undefined,
                  onClick: tool.props.onClick ? () => tool.props.onClick(item) : undefined,
                  onConfirm: tool.props.onConfirm ? () => tool.props.onConfirm(item) : undefined,
                });
              }) : null
            }
          </span>
        </span>
      ) : (<span>
        {item.title}
        <span className="tools">
          {
            tools ?
            tools.map((tool, i) => {
              return React.cloneElement(tool, {
                key: i,
                item,
                title: tool.props.title ? tool.props.title(item) : undefined,
                content: tool.props.content ? tool.props.content(item) : undefined,
                onClick: tool.props.onClick ? () => tool.props.onClick(item) : undefined,
                onConfirm: tool.props.onConfirm ? () => tool.props.onConfirm(item) : undefined,
              });
            }) : null
          }
        </span>
      </span>);

      if (item.children) {
        return (
          <TreeNode key={item.id} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={title} />;
    });
    return (
      <div>
        <Search
          placeholder={SearchPlaceholder || '请输入搜索内容'}
          onChange={this.onChange}
        />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          showLine={showLine}
          defaultExpandAll={defaultExpandAll}
          selectedKeys={selectedKeys || []}
          onSelect={(keys, e) => {
            // 如果是取消的就不执行onSelect
            if (e.selected) {
              // 找到title传给下层组件
              const title = this.titles.find(item => `${item.id}` === keys[0]);
              onSelect(keys, e, title);
            }
          }}
        >
          {loop(treeData)}
        </Tree>
      </div>
    );
  }
}
SearchTree.PropsType = {
  treeData: PropsType.array,  // 带children的树结构的数据
  SearchPlaceholder: PropsType.string, // 查询框的placeholder
  showLine: PropsType.bool, // 是否带连接线
  defaultExpandAll: PropsType.bool,  // 是否默认全部展开全部，didMount的时候改写了
  selectedKeys: PropsType.array, // 被选中的keys（id）
  onSelect: PropsType.func, // 被选中后触发的事件
  tools: PropsType.array, // 是否需要增加工具栏，array
};
