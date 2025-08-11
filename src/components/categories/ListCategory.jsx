import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter'
import ContentHeader from '../common/ContentHeader';
import Column from 'antd/es/table/Column';

import { Button, Space, Table, Tag, Modal } from 'antd';

import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

class ListCategory extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [
                { categoryId: 1, name: 'Computer', status: 0 },
                { categoryId: 2, name: 'Laptop', status: 0 },
                { categoryId: 3, name: 'PC', status: 1 },
                { categoryId: 4, name: 'Mouse', status: 1 },
                { categoryId: 5, name: 'Server', status: 0 },
            ],
            category: {

            }
        }
    };

    editCategory = (category) => {
        console.log(category);
    };

    deleteCategory = () => {
        console.log('Delete category:', this.state.category);
    };

    openDeleteConfirmModal = (category) => {
        this.setState({ ...this.state, category: category });
        console.log(category);
        const message = `Are you sure you want to delete the category ${category.name}?`;
        Modal.confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: () => this.deleteCategory(), 
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };
  render() {
    const { navigate } = this.props.router;
    return (
      <>
        <ContentHeader 
            navigate={navigate}
            className="site-page-header"
            title="Danh sách danh mục"
        ></ContentHeader>
        <Table 
            dataSource= {this.state.dataSource}
            size="small"
            rowKey="categoryId"
        >
            <Column 
                title="Category ID" 
                key="categoryId" 
                dataIndex="categoryId" 
                with={40} 
                align='center'
            ></Column>
            <Column 
                title="Name" 
                key="name"
                dataIndex="name"
            ></Column>
            <Column 
                title="Status" 
                key="status" 
                dataIndex="status" 
                with={80} 
                render={(_, { status } ) => {
                    let color = 'volcano';
                    let name = 'In-visible';
                    if(status === 0){
                        color = 'green';
                        name = 'Visible';
                    }
                    return (
                        <Tag color={color}>{name}</Tag>
                    )
                }}
            ></Column>
            <Column 
                title="Action" 
                key="action"
                with={150} 
                align='center'
                render={(_, record) => (
                    <Space size="middle">
                        <Button type='primary' size='small' key={record.key} onClick={() => this.editCategory(record)}>
                            <EditOutlined style={{marginRight: 8 }} /> Edit
                        </Button>
                        <Button type='primary' danger size='small' key={record.key} onClick={() => this.openDeleteConfirmModal(record)}>
                            <DeleteOutlined style={{marginRight: 8 }} /> Delete
                        </Button>
                    </Space>
                )}
            ></Column>
        </Table>
      </>
    )
  }
}

export default withRouter(ListCategory);