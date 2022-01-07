import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { useTable } from 'react-table';
import BTable from 'react-bootstrap/Table';
import moment from 'moment';

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        <BTable {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </BTable>
    )
}

const Dashboard = (props) => {
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Procedure Type',
                accessor: 'procedure_type',
            },
            {
                Header: 'Product Type',
                accessor: 'product_type',
            },
            {
                Header: 'Product Name',
                accessor: 'product_name',
            },
            {
                Header: 'Registration Holder',
                accessor: 'registration_holder',
            },
            {
                Header: 'Status',
                accessor: 'type',
            },
            {
                Header: 'Date',
                accessor: function(originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('YYYY-MM-DD'); 
                },
            }
        ],
        []
    )

    const data = React.useMemo(() => props.rc, []);

    return (
        // <Authenticated
        //     auth={props.auth}
        //     errors={props.errors}
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        // >
        <>
            <Head title="Dashboard" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Online Marketing Dashboard</h3>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12" style={{height:"300px"}}>
                    <div className="card main-card">
                        <div className="card-body">
                            <h5 className="mb-3">Variations Table</h5>
                            <Table columns={columns} data={data} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 col-xl-3"></div>
                <div className="col-12 col-md-12 col-lg-6 col-xl-3"></div>
                <div className="col-12 col-md-12 col-lg-6 col-xl-3"></div>
            </div>

        </>
        // </Authenticated>
    );
}

Dashboard.layout = page =>  <Authenticated children={page} auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} />

export default Dashboard;