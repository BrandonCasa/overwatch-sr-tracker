import React, {Component} from 'react';
import {Card, Col, Row, Checkbox, Input, Select, Button, Menu} from 'antd';
import './SrGraphPanel.component.css';
import * as firebase from "firebase";
import {Chart} from "@antv/g2";

const { Option } = Select;

class SrGraphPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSrInputRole: "tank",
            inputSr: 2500,
            selectedRemoveMatchRole: "tank",
            tankMatches: [],
            damageMatches: [],
            supportMatches: [],
            selectedMatchString: ""
        };
    }

    componentDidMount() {
        const db = firebase.firestore();

        db.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
            if (!snapshot.exists) {
                db.collection("users").doc(firebase.auth().currentUser.uid).set({
                    tanksrdata: [],
                    damagesrdata: [],
                    supportsrdata: [],
                }).then(() => {
                    db.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
                        if (snapshot.data().hasOwnProperty('tanksrdata')) {
                            let numList = [];
                            for (let i=1; i<=snapshot.data().tanksrdata.length; i++) {
                                numList.push(i)
                            }
                            this.setState({
                                tankMatches: numList
                            });
                        } else {
                            this.setState({
                                tankMatches: []
                            });
                        }

                        if (snapshot.data().hasOwnProperty('damagesrdata')) {
                            let numList = [];
                            for (let i=1; i<=snapshot.data().damagesrdata.length; i++) {
                                numList.push(i)
                            }
                            this.setState({
                                damageMatches: numList
                            });
                        } else {
                            this.setState({
                                damageMatches: []
                            });
                        }

                        if (snapshot.data().hasOwnProperty('supportsrdata')) {
                            let numList = [];
                            for (let i=1; i<=snapshot.data().supportsrdata.length; i++) {
                                numList.push(i)
                            }
                            this.setState({
                                supportMatches: numList
                            });
                        } else {
                            this.setState({
                                supportMatches: []
                            });
                        }

                        db.collection("users").doc(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
                            if (snapshot.data().hasOwnProperty('tanksrdata')) {
                                let numList = [];
                                for (let i=1; i<=snapshot.data().tanksrdata.length; i++) {
                                    numList.push(i)
                                }
                                this.setState({
                                    tankMatches: numList
                                });
                            } else {
                                this.setState({
                                    tankMatches: []
                                });
                            }

                            if (snapshot.data().hasOwnProperty('damagesrdata')) {
                                let numList = [];
                                for (let i=1; i<=snapshot.data().damagesrdata.length; i++) {
                                    numList.push(i)
                                }
                                this.setState({
                                    damageMatches: numList
                                });
                            } else {
                                this.setState({
                                    damageMatches: []
                                });
                            }

                            if (snapshot.data().hasOwnProperty('supportsrdata')) {
                                let numList = [];
                                for (let i=1; i<=snapshot.data().supportsrdata.length; i++) {
                                    numList.push(i)
                                }
                                this.setState({
                                    supportMatches: numList
                                });
                            } else {
                                this.setState({
                                    supportMatches: []
                                });
                            }
                        });
                    });
                });
            } else {
                db.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
                    if (snapshot.data().hasOwnProperty('tanksrdata')) {
                        let numList = [];
                        for (let i=1; i<=snapshot.data().tanksrdata.length; i++) {
                            numList.push(i)
                        }
                        this.setState({
                            tankMatches: numList
                        });
                    } else {
                        this.setState({
                            tankMatches: []
                        });
                    }

                    if (snapshot.data().hasOwnProperty('damagesrdata')) {
                        let numList = [];
                        for (let i=1; i<=snapshot.data().damagesrdata.length; i++) {
                            numList.push(i)
                        }
                        this.setState({
                            damageMatches: numList
                        });
                    } else {
                        this.setState({
                            damageMatches: []
                        });
                    }

                    if (snapshot.data().hasOwnProperty('supportsrdata')) {
                        let numList = [];
                        for (let i=1; i<=snapshot.data().supportsrdata.length; i++) {
                            numList.push(i)
                        }
                        this.setState({
                            supportMatches: numList
                        });
                    } else {
                        this.setState({
                            supportMatches: []
                        });
                    }

                    db.collection("users").doc(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
                        if (snapshot.data().hasOwnProperty('tanksrdata')) {
                            let numList = [];
                            for (let i=1; i<=snapshot.data().tanksrdata.length; i++) {
                                numList.push(i)
                            }
                            this.setState({
                                tankMatches: numList
                            });
                        } else {
                            this.setState({
                                tankMatches: []
                            });
                        }

                        if (snapshot.data().hasOwnProperty('damagesrdata')) {
                            let numList = [];
                            for (let i=1; i<=snapshot.data().damagesrdata.length; i++) {
                                numList.push(i)
                            }
                            this.setState({
                                damageMatches: numList
                            });
                        } else {
                            this.setState({
                                damageMatches: []
                            });
                        }

                        if (snapshot.data().hasOwnProperty('supportsrdata')) {
                            let numList = [];
                            for (let i=1; i<=snapshot.data().supportsrdata.length; i++) {
                                numList.push(i)
                            }
                            this.setState({
                                supportMatches: numList
                            });
                        } else {
                            this.setState({
                                supportMatches: []
                            });
                        }
                    });
                });
            }
        });
    }

    render() {
        const onChangeSelectedMatch = (value) => {
            this.setState({
                selectedMatchString: value
            });
        }

        function MatchesList(props) {
            if (props.selectedRemoveMatchRole === "tank")
            {
                const matches = props.tankMatches.map((number) =>
                    <Option key={number} value={`Match ${number}`}>Match {number}</Option>
                )

                return (
                    <Select value={props.selectedMatchString} defaultValue="" style={{width: "5vw"}} onChange={onChangeSelectedMatch}>
                        {matches}
                    </Select>
                )
            } else if (props.selectedRemoveMatchRole === "damage") {
                const matches = props.damageMatches.map((number) =>
                    <Option key={number} value={`Match ${number}`}>Match {number}</Option>
                )

                return (
                    <Select value={props.selectedMatchString} defaultValue="" style={{width: "5vw"}} onChange={onChangeSelectedMatch}>
                        {matches}
                    </Select>
                )
            } else if (props.selectedRemoveMatchRole === "support") {
                const matches = props.supportMatches.map((number) =>
                    <Option key={number} value={`Match ${number}`}>Match {number}</Option>
                )

                return (
                    <Select value={props.selectedMatchString} defaultValue="" style={{width: "5vw"}} onChange={onChangeSelectedMatch}>
                        {matches}
                    </Select>
                )
            }
            return null;
        }

        function onChangeSettings(checkedValues) {
        }

        const onChangeRemoveRole = (value) => {
            this.setState({
                selectedRemoveMatchRole: value
            });
        }

        const onChangeInputRole = (value) => {
            this.setState({
                selectedSrInputRole: value
            });
        }

        const onChangeInputNum = (value) => {
            this.setState({
                inputSr: parseInt(value.target.value)
            });
        }

        const onClickAddMatch = () => {
            const db = firebase.firestore();

            if (this.state.selectedSrInputRole === "tank") {
                db.collection("users").doc(firebase.auth().currentUser.uid).update({
                    tanksrdata: firebase.firestore.FieldValue.arrayUnion(this.state.inputSr)
                });
            } else if (this.state.selectedSrInputRole === "damage") {
                db.collection("users").doc(firebase.auth().currentUser.uid).update({
                    damagesrdata: firebase.firestore.FieldValue.arrayUnion(this.state.inputSr)
                });
            } else if (this.state.selectedSrInputRole === "support") {
                db.collection("users").doc(firebase.auth().currentUser.uid).update({
                    supportsrdata: firebase.firestore.FieldValue.arrayUnion(this.state.inputSr)
                });
            }
        }

        const onClickRemoveMatch = () => {
            const db = firebase.firestore();

            if (this.state.selectedRemoveMatchRole === "tank") {
                db.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
                    db.collection("users").doc(firebase.auth().currentUser.uid).update({
                        tanksrdata: firebase.firestore.FieldValue.arrayRemove(snapshot.data().tanksrdata[parseInt(this.state.selectedMatchString.split(' ')[1]) - 1])
                    });
                    this.setState({
                        selectedMatchString: ""
                    });
                });
            } else if (this.state.selectedRemoveMatchRole === "damage") {
                db.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
                    db.collection("users").doc(firebase.auth().currentUser.uid).update({
                        damagesrdata: firebase.firestore.FieldValue.arrayRemove(snapshot.data().damagesrdata[parseInt(this.state.selectedMatchString.split(' ')[1]) - 1])
                    });
                    this.setState({
                        selectedMatchString: ""
                    });
                });
            } else if (this.state.selectedRemoveMatchRole === "support") {
                db.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
                    db.collection("users").doc(firebase.auth().currentUser.uid).update({
                        supportsrdata: firebase.firestore.FieldValue.arrayRemove(snapshot.data().supportsrdata[parseInt(this.state.selectedMatchString.split(' ')[1]) - 1])
                    });
                    this.setState({
                        selectedMatchString: ""
                    });
                });
            }
        }

        const optionsWithDisabled = [
            { label: 'Automated Input', value: 'automated', disabled: true },
            { label: 'Visible to friends', value: 'visibilefriends', disabled: false },
        ];

        const inputSrBefore = (
            <Select defaultValue="tank" style={{width: "5vw"}} onChange={onChangeInputRole}>
                <Option value="tank">Tank</Option>
                <Option value="damage">Damage</Option>
                <Option value="support">Support</Option>
            </Select>
        );

        return (
            <div>
                <Card title="Manual Input" style={{ height: 217 }}>
                    <Row>
                        <Col span={12}>
                            <Input addonBefore={inputSrBefore} defaultValue={2500} style={{width: "10vw"}} type="number" onChange={onChangeInputNum} />
                            <br/>
                            <Button type="primary" style={{width: "10vw"}} onClick={onClickAddMatch}>Add Match</Button>
                        </Col>
                        <Col span={12}>
                            <Select defaultValue="tank" style={{width: "5vw"}} onChange={onChangeRemoveRole}>
                                <Option value="tank">Tank</Option>
                                <Option value="damage">Damage</Option>
                                <Option value="support">Support</Option>
                            </Select>
                            <MatchesList selectedRemoveMatchRole={this.state.selectedRemoveMatchRole} tankMatches={this.state.tankMatches} damageMatches={this.state.damageMatches} supportMatches={this.state.supportMatches} selectedMatchString={this.state.selectedMatchString} />
                            <br/>
                            <Button type="primary" style={{width: "10vw"}} onClick={onClickRemoveMatch}>Remove Match</Button>
                        </Col>
                    </Row>
                </Card>
                <Card title="Input Settings" style={{ height: 150 }}>
                    <Checkbox.Group options={optionsWithDisabled} defaultValue={['visibilefriends']} onChange={onChangeSettings} />
                </Card>
                <Card title="View Friends" style={{ height: 283 }}>
                    <p>Prizrakowo</p>
                    <p>Rorrim Eluc</p>
                    <p>ARMAGEDONKNIGHT</p>
                </Card>
            </div>
        );
    }
}

export default SrGraphPanel;