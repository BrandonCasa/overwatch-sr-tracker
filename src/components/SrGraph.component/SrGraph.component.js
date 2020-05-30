import React, {Component} from 'react';
import {Chart} from '@antv/g2';
import './SrGraph.component.css';
import {Card} from "antd";
import * as firebase from "firebase";

class SrGraph extends Component {
    render() {
        return (
            <Card title="Sr Graph" style={{height: 650}}>
                <div id="srgraph"></div>
            </Card>
        );
    }

    constructor(props) {
        super(props);
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
                        let oldData = [];
                        let maxI = 0;

                        if (snapshot.data().hasOwnProperty('tanksrdata')) {
                            for (let i = 0; i < snapshot.data().tanksrdata.length; i++) {
                                let newData = {};
                                newData.match = (i + 1).toString();
                                newData.role = 'Tank';
                                newData.sr = snapshot.data().tanksrdata[i];
                                oldData.push(newData);
                                maxI++;
                            }
                        } else {
                            db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                tanksrdata: []
                            });
                        }

                        if (snapshot.data().hasOwnProperty('damagesrdata')) {
                            for (let i = 0; i < snapshot.data().damagesrdata.length; i++) {
                                let newData = {};
                                newData.match = (i + 1).toString();
                                newData.role = 'Damage';
                                newData.sr = snapshot.data().damagesrdata[i];
                                oldData.push(newData);
                                if (i > maxI)
                                    maxI++;
                            }
                        } else {
                            db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                damagesrdata: []
                            });
                        }

                        if (snapshot.data().hasOwnProperty('supportsrdata')) {
                            for (let i = 0; i < snapshot.data().supportsrdata.length; i++) {
                                let newData = {};
                                newData.match = (i + 1).toString();
                                newData.role = 'Support';
                                newData.sr = snapshot.data().supportsrdata[i];
                                oldData.push(newData);
                                if (i > maxI)
                                    maxI++;
                            }
                        } else {
                            db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                supportsrdata: []
                            });
                        }

                        this.state = {
                            data: oldData
                        }

                        const chart = new Chart({
                            container: 'srgraph',
                            autoFit: true,
                            height: 600,
                        });

                        chart.data(this.state.data);
                        chart.scale({
                            match: {
                                range: [0, 1],
                            },
                            sr: {
                                nice: true,
                            },
                        });

                        chart.tooltip({
                            showCrosshairs: true,
                            shared: true,
                        });

                        chart.axis('sr', {
                            label: {
                                formatter: (val) => {
                                    return val + ' sr';
                                },
                            },
                        });

                        chart
                            .line()
                            .position('match*sr')
                            .color('role')
                            .shape('smooth');

                        chart
                            .point()
                            .position('match*sr')
                            .color('role')
                            .shape('circle')
                            .style({
                                stroke: '#fff',
                                lineWidth: 1,
                            });

                        chart.render();

                        db.collection("users").doc(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
                            let pogData = [];
                            let maxI = 0;

                            if (snapshot.data().hasOwnProperty('tanksrdata')) {
                                for (let i = 0; i < snapshot.data().tanksrdata.length; i++) {
                                    let newData = {};
                                    newData.match = (i + 1).toString();
                                    newData.role = 'Tank';
                                    newData.sr = snapshot.data().tanksrdata[i];
                                    pogData.push(newData);
                                    maxI++;
                                }
                            } else {
                                db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                    tanksrdata: []
                                });
                            }

                            if (snapshot.data().hasOwnProperty('damagesrdata')) {
                                for (let i = 0; i < snapshot.data().damagesrdata.length; i++) {
                                    let newData = {};
                                    newData.match = (i + 1).toString();
                                    newData.role = 'Damage';
                                    newData.sr = snapshot.data().damagesrdata[i];
                                    pogData.push(newData);
                                    if (i > maxI)
                                        maxI++;
                                }
                            } else {
                                db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                    damagesrdata: []
                                });
                            }

                            if (snapshot.data().hasOwnProperty('supportsrdata')) {
                                for (let i = 0; i < snapshot.data().supportsrdata.length; i++) {
                                    let newData = {};
                                    newData.match = (i + 1).toString();
                                    newData.role = 'Support';
                                    newData.sr = snapshot.data().supportsrdata[i];
                                    pogData.push(newData);
                                    if (i > maxI)
                                        maxI++;
                                }
                            } else {
                                db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                    supportsrdata: []
                                });
                            }

                            this.setState({
                                date: pogData
                            });

                            chart.data(pogData);
                            chart.render();
                        });
                    });
                });
            } else {
                db.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
                    let oldData = [];
                    let maxI = 0;

                    if (snapshot.data().hasOwnProperty('tanksrdata')) {
                        for (let i = 0; i < snapshot.data().tanksrdata.length; i++) {
                            let newData = {};
                            newData.match = (i + 1).toString();
                            newData.role = 'Tank';
                            newData.sr = snapshot.data().tanksrdata[i];
                            oldData.push(newData);
                            maxI++;
                        }
                    } else {
                        db.collection("users").doc(firebase.auth().currentUser.uid).update({
                            tanksrdata: []
                        });
                    }

                    if (snapshot.data().hasOwnProperty('damagesrdata')) {
                        for (let i = 0; i < snapshot.data().damagesrdata.length; i++) {
                            let newData = {};
                            newData.match = (i + 1).toString();
                            newData.role = 'Damage';
                            newData.sr = snapshot.data().damagesrdata[i];
                            oldData.push(newData);
                            if (i > maxI)
                                maxI++;
                        }
                    } else {
                        db.collection("users").doc(firebase.auth().currentUser.uid).update({
                            damagesrdata: []
                        });
                    }

                    if (snapshot.data().hasOwnProperty('supportsrdata')) {
                        for (let i = 0; i < snapshot.data().supportsrdata.length; i++) {
                            let newData = {};
                            newData.match = (i + 1).toString();
                            newData.role = 'Support';
                            newData.sr = snapshot.data().supportsrdata[i];
                            oldData.push(newData);
                            if (i > maxI)
                                maxI++;
                        }
                    } else {
                        db.collection("users").doc(firebase.auth().currentUser.uid).update({
                            supportsrdata: []
                        });
                    }

                    this.state = {
                        data: oldData
                    }

                    const chart = new Chart({
                        container: 'srgraph',
                        autoFit: true,
                        height: 600,
                    });

                    chart.data(this.state.data);
                    chart.scale({
                        match: {
                            range: [0, 1],
                        },
                        sr: {
                            nice: true,
                        },
                    });

                    chart.tooltip({
                        showCrosshairs: true,
                        shared: true,
                    });

                    chart.axis('sr', {
                        label: {
                            formatter: (val) => {
                                return val + ' sr';
                            },
                        },
                    });

                    chart
                        .line()
                        .position('match*sr')
                        .color('role')
                        .shape('smooth');

                    chart
                        .point()
                        .position('match*sr')
                        .color('role')
                        .shape('circle')
                        .style({
                            stroke: '#fff',
                            lineWidth: 1,
                        });

                    chart.render();

                    db.collection("users").doc(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
                        let pogData = [];
                        let maxI = 0;

                        if (snapshot.data().hasOwnProperty('tanksrdata')) {
                            for (let i = 0; i < snapshot.data().tanksrdata.length; i++) {
                                let newData = {};
                                newData.match = (i + 1).toString();
                                newData.role = 'Tank';
                                newData.sr = snapshot.data().tanksrdata[i];
                                pogData.push(newData);
                                maxI++;
                            }
                        } else {
                            db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                tanksrdata: []
                            });
                        }

                        if (snapshot.data().hasOwnProperty('damagesrdata')) {
                            for (let i = 0; i < snapshot.data().damagesrdata.length; i++) {
                                let newData = {};
                                newData.match = (i + 1).toString();
                                newData.role = 'Damage';
                                newData.sr = snapshot.data().damagesrdata[i];
                                pogData.push(newData);
                                if (i > maxI)
                                    maxI++;
                            }
                        } else {
                            db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                damagesrdata: []
                            });
                        }

                        if (snapshot.data().hasOwnProperty('supportsrdata')) {
                            for (let i = 0; i < snapshot.data().supportsrdata.length; i++) {
                                let newData = {};
                                newData.match = (i + 1).toString();
                                newData.role = 'Support';
                                newData.sr = snapshot.data().supportsrdata[i];
                                pogData.push(newData);
                                if (i > maxI)
                                    maxI++;
                            }
                        } else {
                            db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                supportsrdata: []
                            });
                        }

                        this.setState({
                            date: pogData
                        });

                        chart.data(pogData);
                        chart.render();
                    });
                });
            }
        });
    }
}

export default SrGraph;