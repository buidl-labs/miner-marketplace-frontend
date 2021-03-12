import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'antd';

export class AddressChangeTable extends Component {
 
    columns = [
        {
            title: "Epoch",
            dataIndex: "epoch",
            align: "left",
            sorter: {
                compare: (a, b) => parseInt(a.epoch) - parseInt(b.epoch)
            }
        },
        {
            title: "From",
            dataIndex: "from",
            align: "left"
        },
        {
            title: "To",
            dataIndex: "to",
            align: "left"
        }
    ]

    onChange (pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }
    
    render() {
        // const data = this.preprocessData(this.props.data)
        return (
            <Table columns={this.columns} dataSource={this.props.data} onChange={this.onChange} pagination={false}/>
        )
    }
}

export default AddressChangeTable
