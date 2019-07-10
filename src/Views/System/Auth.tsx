import React from 'react';
import { Table, Form, Row, Col, Button, Icon, Input } from 'antd';

class Logs extends React.Component {

  public columns: any = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a href="javascript:;">action</a>,
    },
  ];

  public state: any = {
    expand: false,
  };

  // To generate mock Form.Item
  public getFields() {
    const count = this.state.expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  public render() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    return (
      <div>
        <Form className="ant-advanced-search-form">
          <Row gutter={24}>
            <Col span={8} key={0}>
              <Form.Item label='条件'><Input placeholder="placeholder" /></Form.Item>
            </Col>
            <Col span={8} key={0}>
              <Form.Item label='条件'><Input placeholder="placeholder" /></Form.Item>
            </Col>
            <Col span={8} key={0}>
              <Form.Item label='条件'><Input placeholder="placeholder" /></Form.Item>
            </Col>
            <Col span={8} key={0}>
              <Form.Item label='条件'><Input placeholder="placeholder" /></Form.Item>
            </Col>
            <Col span={8} key={0}>
              <Form.Item label='条件'><Input placeholder="placeholder" /></Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right', marginBottom: '10px' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button style={{ marginLeft: 8 }}>新增</Button>
              <Button style={{ marginLeft: 8 }}>导出</Button>
              <a style={{ marginLeft: 8, fontSize: 12 }}>
                更多筛选 <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            </Col>
          </Row>
        </Form>
        <Table columns={this.columns} dataSource={data} scroll={{ x: 1500}} />
      </div>
    );
  }
}

export default Logs;
