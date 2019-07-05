import { Layout, Menu, Icon, Tabs } from 'antd';
import * as React from 'react';
import '../Assets/App.scss';
const { Header, Sider, Content } = Layout;
const CustomMenu: React.FC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Icon type="user" />
        <span>nav 1</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="video-camera" />
        <span>nav 2</span>
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="upload" />
        <span>nav 3</span>
      </Menu.Item>
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
    console.log(1111)
    this[action](targetKey);
  };


  public render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
          <div className="logo" />
          <CustomMenu />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Tabs defaultActiveKey="1" tabPosition="top" onEdit={this.onEdit}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Tabs.TabPane tab={
              <span>
                <Icon type="apple" />
                Tab {i}
              </span>} key={i + ''}/>
            ))}
          </Tabs>
          <Content
            style={{
              margin: '5px',
              background: '#fff',
              minHeight: 'calc(100vh - 74px)',
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
