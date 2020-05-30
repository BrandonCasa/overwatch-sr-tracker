import React, {Component} from 'react';
import { Row, Col, Layout, Menu } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './SignIn.page.css';
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var uiConfig = {
            signInSuccessUrl: '/home',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
        };
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.forceUpdate();
            }
        });
    }

    render() {
        return (
            <div id="firebaseui-auth-container"></div>
        );
    }
}

export default SignIn;