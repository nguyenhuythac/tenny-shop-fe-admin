import './DashboardPage.css';
import React, { useEffect, useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, message, Row, theme } from 'antd';
import { MdAddCircleOutline, MdCategory, MdFormatListBulleted, 
    MdInsertChartOutlined, MdLogout, MdManageAccounts, MdOutlineHome, 
    MdOutlineInventory2, MdOutlineShoppingBag, MdRequestPage, MdSupervisorAccount } from 'react-icons/md';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../components/home/Home';
import AddOrEditCategory from '../components/categories/AddOrEditCategory';
import ListCategory from '../components/categories/ListCategory';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setMessage } from '../redux/actions/commonAction';

const { Header, Sider, Content } = Layout;
function DashboardPage() {
    const [marginLeft, setMarginLeft] = useState(200)
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const msg = useSelector(state => state.commonReducer.message);
    const err = useSelector(state => state.commonReducer.error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (msg) {
            dispatch(setMessage(""))
            message.success(msg);
        }
        if (err) {
            dispatch(setError(""))
            message.error(err);
        }
    }, [msg, err]);

    const siteLayoutStyle = {marginLeft:marginLeft};
    const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0   
      }}>
        <div className="demo-logo-vertical" >
            <h2>{collapsed ? 'SS' : 'SpringShop'}</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <MdOutlineHome />,
              label: 'Home',
              onClick: () => navigate('/'),
            },
            {
              key: '2',
              icon: <MdCategory />,
              label: 'Categories',
              children: [
                {
                  key: '2-1',
                  icon: <MdAddCircleOutline />,
                  label: 'Add Category',
                  onClick: () => navigate('/categories/add'),
                },
                {
                  key: '2-2',
                  icon: <MdFormatListBulleted />,
                  label: 'List category',
                  onClick: () => navigate('/categories/list'),  
                },
              ]
            },
            {
              key: '3',
              icon: <MdOutlineInventory2 />,
              label: 'Products',
            },
            {
              key: '4',
              icon: <MdOutlineShoppingBag />,
              label: 'Orders',
            },
            {
              key: '5',
              icon: <MdRequestPage />,
              label: 'Invoices',
            },
            {
              key: '6',
              icon: <MdInsertChartOutlined />,
              label: 'Statistics',
            },
            {
              key: '7',
              icon: <MdManageAccounts />,
              label: 'Profile',
            },
            {
              key: '8',
              icon: <MdSupervisorAccount />,
              label: 'Account',
            },
            {
              key: '9',
              icon: <MdLogout />,
              label: 'Logout',
            },

          ]}
        />
      </Sider>
      <Layout className='site-layout' style={siteLayoutStyle}>
        <Header className='site-layout-background' 
        style={{ 
            padding: 0, 
            background: colorBgContainer ,
            right: 16,
            left: marginLeft + 16,
            top: 0,
            position: 'fixed',
            height:70
        }}>
            <Row>
                <Col md={18}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => {
                            const sts = !collapsed;
                            setCollapsed(sts)
                            setMarginLeft(sts ? 80 : 200)
                        }}
                        style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        }}
                    />
                </Col>
                <Col md={6}>
                    <div>
                        <Avatar size="default" icon={<UserOutlined />}></Avatar> Tenny Nguyen
                    </div>
                </Col>
            </Row>
          
        </Header>
        <Content
          style={{
            margin: '80px 24px 16px 24px',
            padding: '24px',
            minHeight: '280',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
            <div className='content-panel'>
              <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/categories/add' element={<AddOrEditCategory key='a' />}></Route>
                  <Route path='/categories/update/:id' element={<AddOrEditCategory key='u' />}></Route>
                  <Route path='/categories/list' element={<ListCategory />}></Route>
                </Routes>
                <Outlet></Outlet>
            </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardPage;