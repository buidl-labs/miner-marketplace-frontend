import React, { Component } from 'react'
import axios from 'axios'
import SearchBar from '../SearchBar'
import { PageHeader } from 'antd';
import Config from '../../Config'

export class MinerSearch extends Component {

    state = {
        data: null,
        responseStatus: null,
    }

    // componentDidMount() {
        
    //             axios.post(Config.miner_marketplace_api, {
    //                 query: `query {
    //                     allMiners {
    //                       id
    //                     }
    //                   }`,
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then((result) => {
    //                 console.log(result.data)
    //                 result = result.data.data.allMiners
    //                 console.log(result)
    //                 // let minerIds = []

    //                 // for (let i = 0; i < result.length; i++) {
    //                 //     minerIds.push(result[i].id)
    //                 // }
    //                 // console.log(minerIds)
    //                 this.setState({ data: { result }, responseStatus: "success" })
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 this.setState({ data: null, responseStatus: "failed" })
    //             })
            
    // }

    render() {

        return (
            <React.Fragment>
                {/* <PageHeader
                    className="site-page-header"
                    backIcon="false"
                    title="Miner Search"
                    subTitle=""
                /> */}
                <div >
                    {/* <h1>Miner Search</h1>
                    <SearchBar options={this.state.data} /> */}
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p style={{ textAlign: 'center', fontSize: 'large'}}>Search for a miner profile by entering the miner's address in the search bar below.</p>
                    <br></br>
                    <SearchBar />
                </div>
                
            </React.Fragment>
        )

        // if (!this.state.responseStatus) {
        //     return (
        //         <React.Fragment>
        //             <p>Fetching data from the server...</p>
        //         </React.Fragment>
        //     )
        // } else {
        //     if (this.state.data) {
        //         return (
        //             <React.Fragment>
        //                 {/* <PageHeader
        //                     className="site-page-header"
        //                     backIcon="false"
        //                     title="Miner Search"
        //                     subTitle=""
        //                 /> */}
        //                 <div style={{ width: "80vw", height: "75vh", justifyContent:"center", alignContent:"center"}}>
        //                     {/* <h1>Miner Search</h1>
        //                     <SearchBar options={this.state.data} /> */}
        //                     <p>Search for a miner profile by entering a miner's address in the search bar.</p>
        //                 </div>
                        
        //             </React.Fragment>
        //         )
        //     } else {
        //         return (
        //             <React.Fragment>
        //                 <p>Error in fetching data from the server. See console for more details.</p>
        //             </React.Fragment>
        //         )
        //     }
        // }
    }
}

export default MinerSearch
