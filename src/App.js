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
import SignIn from "./pages/SignIn.page/SignIn.page";
import Friends from "./pages/Friends.page/Friends.page";

const { Header, Content, Footer } = Layout

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Layout className="layout">
                        <Header style={{ height: '64px' }}>
                            <div className="logo" />
                            <Switch>
                                <Route path="/friends" exact>
                                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                        <Menu.Item key="1">
                                            <Link to="/home">Home</Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to="/friends">Friends</Link>
                                        </Menu.Item>
                                    </Menu>
                                </Route>
                                <Route path="/home" exact>
                                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                                        <Menu.Item key="1">
                                            <Link to="/home">Home</Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to="/friends">Friends</Link>
                                        </Menu.Item>
                                    </Menu>
                                </Route>
                            </Switch>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
                            <Switch>
                                <Route path="/friends" exact>
                                    <Friends />
                                </Route>
                                <Route path="/home" exact>
                                    <Home />
                                </Route>
                                <Route path="/" exact>
                                    <SignIn />
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