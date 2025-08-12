import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter'
import { Button, Col, Divider, Form, Input, Popconfirm, Row, Select } from 'antd';
import ContentHeader from '../common/ContentHeader';
import { connect } from 'react-redux'
import { clearCategory, getCategory, insertCategory, updateCategory } from '../../redux/actions/categoryAction';

class AddOrEditCategory extends Component {
    formRef = React.createRef();
    constructor(props) {
      super(props)
    
      this.state = {
         category: {
            id:'',
            name:'',
            status:'Visible',
         }
      }
    }
    componentDidMount = () => {
        const { id } = this.props.router.params;
        if (id) {
            this.props.getCategory(id);
        } else{
            this.props.clearCategory();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.category && nextProps.category !== prevState.category) {
            return {
                ...prevState, category: nextProps.category
            };
        } else if (!nextProps.category) {
            return {
                ...prevState, category: {
                    id: '',
                    name: '',
                    status: 'Visible',
                }
            };
        }
        return null;
    }

    confirmUpdate = () => {
        console.log("update category");

        //call onSubmitForm function
        this.formRef.current.submit();
    }

    onSubmitForm = (values) => {
        console.log('Form values:', values);
        const { navigate } = this.props.router;
        const { id } = this.props.category;
        if(!id) {
            this.props.insertCategory(values, navigate);
        } else {
            this.props.updateCategory(id, values, navigate);

        }
    }

  render() {
    
    const { navigate } = this.props.router;
    const { isLoading } = this.props;
    const { category } = this.state;
    let title = 'Add New Category';
    if (category.id) {
        title = 'Update Category';
    }
    return (
      <div>
       <ContentHeader 
            navigate={navigate}
            className="site-page-header"
            title={title}
        ></ContentHeader>
        <Form layout="vertical" className='form' onFinish={this.onSubmitForm} key={category.id} ref={this.formRef} disabled={isLoading}>
            <Row>
                <Col md={12}>
                    <Form.Item label="Category Id" name="categoryId" initialValue={category.id} hidden={!category.id}>
                        <Input readOnly></Input>
                    </Form.Item>
                    <Form.Item label="Name" name="name" initialValue={category.name} rules={[{ required: true, min: 2, message: 'Please enter category name' }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Status" name="status" initialValue={category.status ==="Visible" ? "0" : "1"}>
                        <Select>
                            <Select.Option value="0">Visible</Select.Option>
                            <Select.Option value="1">In-Visible</Select.Option>
                        </Select>
                    </Form.Item>
                    <Divider></Divider>
                    {!category.id &&(<Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={isLoading}>Save</Button>)}
                    {category.id &&(
                        <Popconfirm title="Are you sure to update this category?" onConfirm={() => this.confirmUpdate()}>
                            <Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={isLoading}>Update</Button>
                        </Popconfirm>
                    )}
                </Col>
            </Row>
        </Form>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    category: state.categoryReducer.category,
    isLoading: state.commonReducer.isLoading,
})

const mapDispatchToProps = {
    insertCategory,
    updateCategory,
    getCategory,
    clearCategory,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditCategory));