import React, {Component} from 'react';
import {Card, Checkbox, Col, Row} from 'antd';
import './Friends.page.css';
import * as firebase from "firebase";
import { Input } from 'antd';
import { Divider } from 'antd';
import { List, Avatar, Button, Skeleton } from 'antd';

const { Search } = Input;

class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friendids: [],
            addFriendInput: "",
            friendstemp: [
                {
                    title: 'Kannatron',
                }
            ]
        };
    }

    componentDidMount() {
        const db = firebase.firestore();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.forceUpdate();
                db.collection("friends").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
                    if (!snapshot.exists) { //Check if user is in the database
                        //If the user isn't in the database add them to it...
                        //No reason to populate friends list as there will be no friends
                        db.collection("friends").doc(firebase.auth().currentUser.uid).set({
                            friendids: [],
                        });
                    } else { //If it does exist, then populate remove match
                        db.collection("friends").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
                            if (snapshot.data().hasOwnProperty('friendids')) {
                                let idList = [];
                                for (let i=0; i<snapshot.data().friendids.length; i++) {
                                    idList.push(snapshot.data().friendids[i]);
                                }
                                this.setState({
                                    friendids: idList
                                });
                            } else {
                                this.setState({
                                    friendids: []
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={14}>
                        <Card title="Messages" style={{ height: 'calc(100vh - 64px)' }}>
                        </Card>
                    </Col>
                    <Col span={2}>
                    </Col>
                    <Col span={8}>
                        <Card title="Friends" style={{ height: 'calc(100vh - 64px)' }}>
                            <Search placeholder="Add Friend" onSearch={value => console.log(value)} enterButton />
                            <Divider />
                            <Search placeholder="Search Friends" onSearch={value => console.log(value)} enterButton style={{ width: '75%' }} />
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.friendstemp}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={item.title}
                                            description="Peak 3497 Doomfist player"
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Friends;