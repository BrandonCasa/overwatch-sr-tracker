import React, {Component} from 'react';
import { Row, Col, Layout, Menu } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Home.page.css';
import SrGraph from "../../components/SrGraph.component/SrGraph.component";
import SrGraphPanel from "../../components/SrGraphPanel.component/SrGraphPanel.component";
import * as firebase from "firebase";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.forceUpdate();
            }
        });
    }

    render() {
        var user = firebase.auth().currentUser;

        if (user) {
            return (
                <div>
                    <Row>
                        <Col span={16}>
                            <SrGraph></SrGraph>
                        </Col>
                        <Col span={8}>
                            <SrGraphPanel></SrGraphPanel>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div>signing in...</div>
            )
        }
    }
}

export default Home;