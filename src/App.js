import React, {Component} from 'react';
import { Row, Col, Layout, Menu } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import Home from "./pages/Home.page/Home.page";
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import SignIn from "./pages/signin/SignIn.page";

const { Header, Content, Footer } = Layout

/*
<Row>
            <Col span={16}>

            </Col>
            <Col span={8}>GRAPH PANEL</Col>
        </Row>
 */

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Layout className="layout">
                        <Header>
                            <div className="logo" />
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1">
                                    <Link to="/home">Home</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="friends">Friends</Link>
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
                            <Switch>
                                <Route path="/friends" exact>
                                    Friends
                                </Route>
                                <Route path="/home" exact>
                                    <Home></Home>
                                </Route>
                                <Route path="/" exact>
                                    <SignIn></SignIn>
                                </Route>
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Kannatronics ©2020 Created by Brandon Casamichana</Footer>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default App;