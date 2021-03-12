import React, { Component } from 'react'
import axios from 'axios'
import { PageHeader } from 'antd';
import Config from '../../Config';

import { Layout, Menu, Breadcrumb } from 'antd';
import { Card } from 'antd';
import TransactionTable from '../TransactionTable';
import AddressChangeTable from '../AddressChangeTable';
const { Header, Content, Footer } = Layout;



export class MinerProfile extends Component {

    state = {
        data: null,
        responseStatus: null
    }

    componentDidMount() {
        console.log(this.props.match.params.address + " miner id")
        axios.post(Config.miner_marketplace_api, {
            query: `query ($id: ID!) {
                miner(id: $id) {
                    id
                    address
                    name
                    bio
                    owner {
                      id
                      address
                      actor
                      balance
                      messages
                      createdAt
                      latestTransactionAt
                    }
                    worker {
                      id
                      address
                      actor
                      balance
                      messages
                      createdAt
                      latestTransactionAt
                    }
                    contact {
                      email
                      slack
                      website
                      twitter
                      email
                    }
                    verified
                    serviceDetails {
                      storage
                      retrieval
                      repair
                      onlineDeals
                      offlineDeals
                      storageAskPrice
                      retrievalAskPrice
                      minPieceSize
                      maxPieceSize
                    }
                    financeMetrics(since: 545000, till: 570000) {
                      totalIncome
                      totalExpenditure
                      blockRewards
                      storageDealPayments
                      retrievalDealPayments
                      networkFee
                      penalty
                      preCommitDeposits
                      initialPledge
                      lockedFunds
                      availableFunds
                    }
                    qualityIndicators {
                      winCount
                      blocksMined
                      qualityAdjPower
                      feeDebt
                      dataStored
                      faultySectors
                    }
                    transactions(since: 545000, till: 570000) {
                      id
                      height
                      amount
                      sender
                      receiver
                      direction
                      minerFee
                      burnFee
                      actorName
                      methodName
                      exitCode
                    }
                }
              }`,
            variables: {
                id: this.props.match.params.address
            }
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data)
                var minerdata = res.data.data.miner
                console.log('fetching textile data')

                axios.get('https://minerindex.hub.textile.io/v1/index/miner/' + this.props.match.params.address, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        var textiledata = res.data.info

                        minerdata.location = textiledata.metadata.location

                        minerdata.qualityIndicators.relativePower = textiledata.filecoin.relativePower
                        minerdata.qualityIndicators.activeSectors = textiledata.filecoin.activeSectors

                        minerdata.serviceDetails.storageAskPrice = textiledata.filecoin.askPrice
                        minerdata.serviceDetails.sectorSize = textiledata.filecoin.sectorSize
                        minerdata.serviceDetails.minPieceSize = textiledata.filecoin.minPieceSize
                        minerdata.serviceDetails.maxPieceSize = textiledata.filecoin.maxPieceSize

                        minerdata.storageDealSummary = textiledata.dealsSummary
                        minerdata.retrievalDealSummary = textiledata.retrievalsSummary

                        console.log('updated miner data')
                        console.log(minerdata)

                        console.log('fetching address history')
                        axios.get('http://ec2-18-237-94-115.us-west-2.compute.amazonaws.com/addrChanges.json', {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => {
                                console.log('address history fetched successfully')
                                console.log(res.data)

                                var minerId = this.props.match.params.address
                                if (minerId in res.data) {
                                    minerdata.ownerChanges = res.data[minerId].ownerChanges
                                    minerdata.workerChanges = res.data[minerId].workerChanges
                                } else {
                                    minerdata.ownerChanges = null
                                    minerdata.workerChanges = null
                                }

                                console.log('final miner data')
                                console.log(minerdata)


                                this.setState({ data: minerdata, responseStatus: "success" })

                            })
                            .catch(err => {
                                console.log('failure in fetching address history')
                                console.log(err)
                                minerdata.ownerChanges = null
                                minerdata.workerChanges = null

                                this.setState({ data: null, responseStatus: "failed" })
                            })

                    })
                    .catch(err => {
                        console.log('failure in fetching data from textile')
                        console.log(err)
                        this.setState({ data: null, responseStatus: "failed" })
                    })

            })
            .catch(err => {
                console.log('failure in fetching data from miner marketplace api')
                console.log(err)
                this.setState({ data: null, responseStatus: "failed" })
            })
    }

    formatFIL(value) {
        if (value === "") {
            value = 0
        } else {
            value = parseInt(value)
        }
        // console.log(value, typeof(value))
        value = value / (10 ** 18)
        // console.log(value)
        value = value.toFixed(4)
        // console.log(value)
        return value.toString() + " FIL"
    }

    formatAdjPower(value) {
        if (value === "") {
            value = 0
        } else {
            value = parseInt(value)
        }
        // console.log(value, typeof(value))
        if (value >= 1024 ** 6) {
            value = value / (1024 ** 6)
            value = value.toFixed(4)
            value = value.toString() + " EiB"
            return value
        }
        if (value >= 1024 ** 5) {
            value = value / (1024 ** 5)
            value = value.toFixed(4)
            value = value.toString() + " PiB"
            return value
        }
        if (value >= 1024 ** 4) {
            value = value / (1024 ** 4)
            value = value.toFixed(4)
            value = value.toString() + " TiB"
            return value
        }
        if (value >= 1024 ** 3) {
            value = value / (1024 ** 3)
            value = value.toFixed(4)
            value = value.toString() + " GiB"
            return value
        }
        if (value >= 1024 ** 2) {
            value = value / (1024 ** 2)
            value = value.toFixed(4)
            value = value.toString() + " MiB"
            return value
        }
        if (value >= 1024) {
            value = value / (1024)
            value = value.toFixed(4)
            value = value.toString() + " KiB"
            return value
        }
        return value.toString() + " bytes"
    }

    // makeRequest() {
    //     return new Promise(function (resolve, reject) {
    //         axios.get('http://ec2-18-237-94-115.us-west-2.compute.amazonaws.com/addrChanges.json', {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then(res => {
    //                 console.log('address history fetched successfully')
    //                 console.log(res.data)
    //                 resolve(res.data)
    //             })
    //             .catch(err => {
    //                 console.log('failure in fetching address history')
    //                 console.log(err)
    //                 reject(null)
    //             })
    //     })
    // }

    // getAddressHistory() {
    //     console.log('fetching address history')
    //     var minerId = this.props.match.params.address

    //     var addressHistory = await this.makeRequest()
    //     var data = {}

    //     if (addressHistory && minerId in res.data) {
    //         data = res.data[minerId]
    //     } else {
    //         data = {
    //             "ownerChanges": null,
    //             "workerChanges": null
    //         }
    //     }

    //     axios.get('http://ec2-18-237-94-115.us-west-2.compute.amazonaws.com/addrChanges.json', {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(res => {
    //             console.log('address history fetched successfully')
    //             console.log(res.data)

    //             if (minerId in res.data) {
    //                 data = res.data[minerId]
    //             } else {
    //                 data = {
    //                     "ownerChanges": null,
    //                     "workerChanges": null
    //                 }
    //             }


    //         })
    //         .catch(err => {
    //             console.log('failure in fetching address history')
    //             console.log(err)
    //             data = {
    //                 "ownerChanges": null,
    //                 "workerChanges": null
    //             }
    //         })

    //     return data
    // }

    render() {
        if (!this.state.responseStatus) {
            return (
                <React.Fragment>
                    <p>Fetching data from the server...</p>
                </React.Fragment>
            )
        } else {
            if (this.state.data) {
                var data = this.state.data
                console.log("miner data")
                console.log(data)

                // var history = this.getAddressHistory()
                // console.log('history data')
                // console.log(history)

                return (
                    <div>
                        <PageHeader
                            className="site-page-header"
                            backIcon="false"
                            title="Miner Profile "
                            subTitle={this.props.match.params.address}
                        />
                        {/* <PriceHistoryGraph data={this.state.data} style={{ width: "80vw", height: "75vh"}}/> */}
                        <Card title="Basic Info" style={{ width: "93vw" }}>
                            <p>Name : {data.name} </p>
                            <p>Bio : {data.bio} </p>
                            <p>Location : {data.location} </p>
                            <p>Id : {data.id} </p>
                            <p>Owner : {data.owner.id} </p>
                            <p>Worker : {data.worker.id} </p>
                            <p>Verified: {data.verified ? "Yes" : "No"}</p>
                        </Card>
                        <br></br>
                        <Card title="Contact" style={{ width: "93vw" }}>
                            <p>Slack : {data.contact.slack} </p>
                            <p>Twitter : {data.contact.twitter} </p>
                            <p>Email : {data.contact.email} </p>
                            <p>Website : {data.contact.website} </p>
                        </Card>
                        <br></br>
                        <Card title="Service Details" style={{ width: "93vw" }}>
                            <p>Storage : {data.serviceDetails.storage ? "Yes" : "No"} </p>
                            <p>Retrieval : {data.serviceDetails.retrieval ? "Yes" : "No"} </p>
                            <p>Repair : {data.serviceDetails.repair ? "Yes" : "No"} </p>
                            <p>Online Deals : {data.serviceDetails.onlineDeals ? "Yes" : "No"} </p>
                            <p>Offline Deals : {data.serviceDetails.offlineDeals ? "Yes" : "No"} </p>
                            <p>Storage Ask Price : {this.formatFIL(data.serviceDetails.storageAskPrice) + "/GiB/epoch"} </p>
                            <p>Retrieval Ask Price : {data.serviceDetails.retrievalAskPrice} </p>
                            <p>Sector Size : {this.formatAdjPower(data.serviceDetails.sectorSize)} </p>
                            <p>Minimum Piece Size : {this.formatAdjPower(data.serviceDetails.minPieceSize)} </p>
                            <p>Maximum Piece Size : {this.formatAdjPower(data.serviceDetails.maxPieceSize)} </p>
                        </Card>
                        <br></br>
                        <Card title="Financial Metrics" style={{ width: "93vw" }}>
                            <p>Total Income : {this.formatFIL(data.financeMetrics.totalIncome)} </p>
                            <p>Total Expenditure : {this.formatFIL(data.financeMetrics.totalExpenditure)} </p>
                            <p>Block Rewards : {this.formatFIL(data.financeMetrics.blockRewards)} </p>
                            <p>Storage Deal Payments : {this.formatFIL(data.financeMetrics.blockRewards)} </p>
                            <p>Retrieval Deal Payments : {this.formatFIL(data.financeMetrics.retrievalDealPayments)} </p>
                            <p>Network Fee : {this.formatFIL(data.financeMetrics.networkFee)} </p>
                            <p>Penalty : {this.formatFIL(data.financeMetrics.penalty)} </p>
                            <p>PreCommit Deposits : {this.formatFIL(data.financeMetrics.preCommitDeposits)} </p>
                            <p>Initial Pledge : {this.formatFIL(data.financeMetrics.initialPledge)} </p>
                            <p>Locked Funds : {this.formatFIL(data.financeMetrics.lockedFunds)} </p>
                            <p>Available Funds : {this.formatFIL(data.financeMetrics.availableFunds)} </p>
                        </Card>
                        <br></br>
                        <Card title="Quality Indicators" style={{ width: "93vw" }}>
                            <p>Win Count : {data.qualityIndicators.winCount} </p>
                            <p>Blocks Mined : {data.qualityIndicators.blocksMined} </p>
                            <p>Quality Adjusted Power: {this.formatAdjPower(data.qualityIndicators.qualityAdjPower)} </p>
                            <p>Active Sectors: {data.qualityIndicators.activeSectors} </p>
                            <p>Faulty Sectors: {data.qualityIndicators.faultySectors} </p>
                        </Card>
                        <br></br>
                        <Card title="Worker Address History" style={{ width: "93vw" }}>
                            <AddressChangeTable data={data.workerChanges}></AddressChangeTable>
                        </Card>
                        <br></br>
                        <Card title="Owner Address History" style={{ width: "93vw" }}>
                            <AddressChangeTable data={data.ownerChanges}></AddressChangeTable>
                        </Card>
                        <br></br>
                        <Card title="Transaction History" style={{ width: "93vw" }}>
                            <TransactionTable data={data.transactions}></TransactionTable>
                        </Card>
                        <br></br>
                    </div>
                )
            } else {
                return (
                    <div>Error in fetching data from the server. See console for more details.</div>
                )
            }
        }
    }
}

export default MinerProfile