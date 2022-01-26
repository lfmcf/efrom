import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { useTable, usePagination } from 'react-table';
import BTable from 'react-bootstrap/Table';
import moment from 'moment';

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    }, usePagination);

    return (
        <>
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
                {page.map((row, i) => {
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
        <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5,10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

const Dashboard = (props) => {
    console.log(props)
    const columns = React.useMemo(
        () => [
            {
                Header: 'Product Name',
                accessor: 'product_name',
            },
            {
                Header: 'Procedure Type',
                accessor: 'procedure_type',
            },
            {
                Header: 'Country / Countries',
                accessor: 'country',
            },
            {
                Header: 'Procedure N°',
                accessor: 'procedure_number',
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
                <div className="col-12" >
                    <div className="card main-card">
                        <div className="card-body">
                            <h5 className="mb-3">MA Registration Creation</h5>
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