import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
import BTable from 'react-bootstrap/Table';
import moment from 'moment';
import FlashMessage from 'react-flash-message';
import 'regenerator-runtime/runtime'
import Table from '@/Components/Table';


// function GlobalFilter({
//     preGlobalFilteredRows,
//     globalFilter,
//     setGlobalFilter,
// }) {
//     const count = preGlobalFilteredRows.length
//     const [value, setValue] = React.useState(globalFilter)
//     const onChange = useAsyncDebounce(value => {
//         setGlobalFilter(value || undefined)
//     }, 200)

//     return (
//         <span>
//             Search:{' '}
//             <input
//                 value={value || ""}
//                 onChange={e => {
//                     setValue(e.target.value);
//                     onChange(e.target.value);
//                 }}
//                 placeholder={`${count} records...`}
//                 style={{
//                     fontSize: '1.1rem',
//                     border: '0',
//                 }}
//             />
//         </span>
//     )
// }

// function Table({ columns, data }) {
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         state,
//         setGlobalFilter,
//         preGlobalFilteredRows,
//         page,
//         canPreviousPage,
//         canNextPage,
//         pageOptions,
//         pageCount,
//         gotoPage,
//         nextPage,
//         previousPage,
//         setPageSize,
//         state: { pageIndex, pageSize },
        
//     } = useTable({
//         columns,
//         data,
//         initialState: { pageSize: 5, pageIndex: 0 },
//     }, useGlobalFilter, usePagination);

//     return (
//         <>
//         <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
//         <BTable {...getTableProps()}>
//             <thead>
//                 {headerGroups.map(headerGroup => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                         {headerGroup.headers.map(column => (
//                             <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                         ))}
//                     </tr>
//                 ))}
//                 {/* <tr>
//                     <th>
//                         <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
//                     </th>
//                 </tr> */}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//                 {page.map((row, i) => {
//                     prepareRow(row)
//                     return (
//                         <tr {...row.getRowProps()}>
//                             {row.cells.map(cell => {
//                                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                             })}
//                         </tr>
//                     )
//                 })}
//             </tbody>
//         </BTable>
//         <div className="pagination">
//                 <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//                     {'<<'}
//                 </button>{' '}
//                 <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//                     {'<'}
//                 </button>{' '}
//                 <button onClick={() => nextPage()} disabled={!canNextPage}>
//                     {'>'}
//                 </button>{' '}
//                 <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//                     {'>>'}
//                 </button>{' '}
//                 <span>
//                     Page{' '}
//                     <strong>
//                         {pageIndex + 1} of {pageOptions.length}
//                     </strong>{' '}
//                 </span>
//                 <span>
//                     | Go to page:{' '}
//                     <input
//                         type="number"
//                         defaultValue={pageIndex + 1}
//                         onChange={e => {
//                             const page = e.target.value ? Number(e.target.value) - 1 : 0
//                             gotoPage(page)
//                         }}
//                         style={{ width: '100px' }}
//                     />
//                 </span>{' '}
//                 <select
//                     value={pageSize}
//                     onChange={e => {
//                         setPageSize(Number(e.target.value))
//                     }}
//                 >
//                     {[5, 10, 20, 30, 40, 50].map(pageSize => (
//                         <option key={pageSize} value={pageSize}>
//                             Show {pageSize}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//         </>
//     )
// }

const Dashboard = (props) => {
    
    const Rccolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: 'product_name',
            },
            {
                Header: 'Procedure Type',
                accessor: 'procedure_type',
            },
            {
                Header: 'Country / Countries',
                // accessor: 'country',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.country && Array.isArray(originalRow.country)) {
                        
                        return originalRow.country.map(ele => (
                            <ul>
                                <li>{ele}</li>
                            </ul>
                        ))
                    }
               }
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

    const Variationcolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: 'product_name',
            },
            {
                Header: 'Procedure Type',
                accessor: 'procedure_type',
            },
            {
                Header: 'Country / Countries',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.country && Array.isArray(originalRow.country)) {
                        
                        return originalRow.country.map(ele => (
                            <ul>
                                <li>{ele}</li>
                            </ul>
                        ))
                    }
               }
            },
            {
                Header: 'Variation Title',
                accessor: 'variation_title',
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

    const Renewalcolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: 'product_name',
            },
            {
                Header: 'Procedure Type',
                accessor: 'procedure_type',
            },
            {
                Header: 'Country / Countries',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.country && Array.isArray(originalRow.country)) {
                        
                        return originalRow.country.map(ele => (
                            <ul>
                                <li>{ele}</li>
                            </ul>
                        ))
                    }
               }
            },
            {
                Header: 'Renewal Title',
                accessor: 'renewal_title',
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

    const Baselinecolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: 'product_name',
            },
            {
                Header: 'Procedure Type',
                accessor: 'procedure_type',
            },
            {
                Header: 'Country / Countries',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.country && Array.isArray(originalRow.country)) {
                        
                        return originalRow.country.map(ele => (
                            <ul>
                                <li>{ele}</li>
                            </ul>
                        ))
                    }
               }
            },
            {
                Header: 'Baseline Title',
                accessor: 'baseline_title',
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

    const Rcdata = React.useMemo(() => props.rc, []);
    const VariationData = React.useMemo(() => props.variation, []);
    const RenewalData = React.useMemo(() => props.renewal, []);
    const BaselineData = React.useMemo(() => props.baseline, []);

    return (
        // <Authenticated
        //     auth={props.auth}
        //     errors={props.errors}
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        // >
        <>
            {props.flash.message ?
            <FlashMessage duration={5000} persistOnHover={true} >
                <div style={{width:'300px', height :'60px',background: 'lightgreen',position: 'absolute', top: '70px', right: '10px',zIndex:'1000',borderRadius:'5px'}}>
                    <p style={{color:'white'}}>{props.flash.message}</p>
                </div>
                
            </FlashMessage> 
            : ''}
            <Head title="Dashboard" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title"><i style={{paddingBottom:'8px'}}class="fas fa-home"></i> / Dashboard</h3>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12" >
                    <div className="card main-card">
                        <div className="card-body">
                            <div style={{marginBottom: '50px'}}>
                                <h5 className="mb-3 head-table" style={{float: 'left'}}>MA Registration Creation</h5>
                                <Table columns={Rccolumns} data={Rcdata} />
                            </div>
                            <div style={{marginBottom: '50px'}}>
                                <h5 className="mb-3 head-table" style={{float: 'left'}}>Variation</h5>
                                <Table columns={Variationcolumns} data={VariationData} />
                            </div>
                            <div style={{marginBottom: '50px'}}>
                                <h5 className="mb-3 head-table" style={{float: 'left'}}>Renewal</h5>
                                <Table columns={Renewalcolumns} data={RenewalData} />
                            </div>
                            <div style={{marginBottom: '50px'}}>
                                <h5 className="mb-3 head-table" style={{float: 'left'}}>Baseline</h5>
                                <Table columns={Baselinecolumns} data={BaselineData} />
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>

        </>
        // </Authenticated>
    );
}

Dashboard.layout = page =>  <Authenticated children={page} auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} />

export default Dashboard;