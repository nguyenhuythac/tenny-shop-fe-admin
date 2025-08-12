import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter'
import ContentHeader from '../common/ContentHeader';
import Column from 'antd/es/table/Column';

import { Button, Space, Table, Tag, Modal } from 'antd';

import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { clearCategoryState, getCategories } from '../../redux/actions/categoryAction';

class ListCategory extends Component {
    constructor() {
        super();
        this.state = {
            // dataSource: [
                
            // ],
            category: {

            }
        }
    };

    componentDidMount = () => {
        console.log('ListCategory component mounted');
        this.props.getCategories();
    }

    componentWillUnmount= () => {
        console.log('ListCategory component will unmount');
        this.props.clearCategoryState();
    }


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
    const { categories } = this.props;
    return (
      <>
        <ContentHeader 
            navigate={navigate}
            className="site-page-header"
            title="Danh sách danh mục"
        ></ContentHeader>
        <Table 
            dataSource= {categories}
            size="small"
            rowKey="id"
        >
            <Column 
                title="Category ID" 
                key="id" 
                dataIndex="id" 
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
                    if(status === "Visible"){
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


const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
})

const mapDispatchToProps = {
    getCategories,
    clearCategoryState
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCategory))