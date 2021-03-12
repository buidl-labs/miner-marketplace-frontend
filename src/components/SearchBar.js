import React, { Component, useState } from 'react'
import { AutoComplete } from 'antd';
import { Input, Space } from 'antd';
import { useHistory, withRouter } from "react-router-dom"

export class SearchBar extends Component {

    redirectToProfile = (value) => {
        const { history } = this.props;
        if(history) history.push("/miner/"+value);
       }

    onSearch = (value) => {
        console.log(value);
        this.redirectToProfile(value);
    }

    render() {

        // const [value, setValue] = useState();
        // const [options, setOptions] = useState();

        // const onSearch = (searchText) => {
        //     setOptions(
        //         !searchText ? [] : options,
        //     );
        // };

        // const onSelect = (data) => {
        //     console.log('onSelect', data);
        // };

        // const onChange = (data) => {
        //     setValue(data);
        // };


        // return (
        //     <AutoComplete
        //         options={options}
        //         style={{ width: 400 }}
        //         onSelect={onSelect}
        //         onSearch={onSearch}
        //         placeholder="Enter Miner Address"
        //     />
        // )

        const { Search } = Input;

        return (
            <Space direction="vertical" style={{ marginLeft: "30vw" }}>
                <Search placeholder="Enter miner address" onSearch={this.onSearch} style={{ width: 400}} />
            </Space>
        )
    }
}

export default withRouter(SearchBar)
