import { Layout, Menu, Icon, Tabs } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import {StoreContext} from 'redux-react-hook';
import { useAsync } from 'react-async';
import {GetMenu} from '../Api/Test';

const { Header, Sider, Content } = Layout;

function CustomMenu(props: any): React.ReactElement {

  const store = useContext(StoreContext);
  store.dispatch({
    type: 'T',
    text: 'Use Redux'
  })
  
  const [openKeys, setOpenkeys] = useState<string[]>(["0"]);
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
  });
  const { data, isLoading } = useAsync(GetMenu);
  return (
    <Menu theme="dark" mode="inline"
      defaultSelectedKeys={["/tags/list"]}
      openKeys={openKeys}
      onOpenChange={(keys: string[]) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        setOpenkeys(latestOpenKey? [latestOpenKey]: [])
      }}
      >
      { 
        isLoading === false ? data.map((v: any, k: number) => {
          const title = <span><Icon type={v.icon} /><span>{v.name}</span></span>;
          const children = v.children.map((child: any) => <Menu.Item key={child.path}>{child.name}</Menu.Item>)
          return <Menu.SubMenu key={k} title={title}>{children}</Menu.SubMenu>
        }): ''
      }
    </Menu>
  );
};

class App extends React.Component {

  public state = {
    collapsed: false,
  };

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  public onEdit = (targetKey: any, action: any) => {
    this[action](targetKey);
  };

  public async GetMenu() {
    await GetMenu();
  }

  public render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
          <div className="logo" />
          <CustomMenu />
        </Sider>
        <Layout>
          <Header className='header'>
            <Icon
              className="menu-trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Tabs className="navTop" defaultActiveKey="1" tabPosition="top" onEdit={this.onEdit}>
            {[1, 2, 3, 4, 5].map(i => (
              <Tabs.TabPane tab={
              <span>
                <Icon type="apple" />
                Tab {i}ssd
              </span>} key={i + ''}/>
            ))}
          </Tabs>
          <Content className="content">{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
