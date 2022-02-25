import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
import BTable from 'react-bootstrap/Table';
import moment from 'moment';
import FlashMessage from 'react-flash-message';
import 'regenerator-runtime/runtime'
import Table from '@/Components/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Typography } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

    const { flash } = usePage().props

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
            // {
            //     Header: 'Country / Countries',

            //     accessor: function (originalRow, rowIndex) {
            //         if (originalRow.country && Array.isArray(originalRow.country)) {

            //             return originalRow.country.map(ele => (
            //                 <ul>
            //                     <li>{ele}</li>
            //                 </ul>
            //             ))
            //         }
            //    }
            // },
            {
                Header: 'Procedure N°',
                accessor: 'procedure_number',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
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
            // {
            //     Header: 'Country / Countries',
            //     accessor: function (originalRow, rowIndex) {
            //         if (originalRow.country && Array.isArray(originalRow.country)) {

            //             return originalRow.country.map(ele => (
            //                 <ul>
            //                     <li>{ele}</li>
            //                 </ul>
            //             ))
            //         }
            //    }
            // },
            {
                Header: 'Variation Title',
                accessor: 'variation_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
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
            // {
            //     Header: 'Country / Countries',
            //     accessor: function (originalRow, rowIndex) {
            //         if (originalRow.country && Array.isArray(originalRow.country)) {

            //             return originalRow.country.map(ele => (
            //                 <ul>
            //                     <li>{ele}</li>
            //                 </ul>
            //             ))
            //         }
            //    }
            // },
            {
                Header: 'Renewal Title',
                accessor: 'renewal_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
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
            // {
            //     Header: 'Country / Countries',
            //     accessor: function (originalRow, rowIndex) {
            //         if (originalRow.country && Array.isArray(originalRow.country)) {

            //             return originalRow.country.map(ele => (
            //                 <ul>
            //                     <li>{ele}</li>
            //                 </ul>
            //             ))
            //         }
            //    }
            // },
            {
                Header: 'Baseline Title',
                accessor: 'baseline_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
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

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    

    React.useEffect(() => {
        flash.message ? setOpen(true) : setOpen(false)
    }, [])

    return (

        <>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {props.flash.message}
                </Alert>
            </Snackbar>


            <Head title="Dashboard" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title"><i style={{ paddingBottom: '8px' }} className="fas fa-home"></i> / Dashboard</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-12" >
                    <div className="card main-card">
                        <div className="card-body dash-table">
                            <div style={{ marginBottom: '50px', position:'relative' }}>
                                <h5 className="mb-3 head-table" style={{ float: 'left' }}>MA Registration Creation</h5>
                                <Table columns={Rccolumns} data={Rcdata} for="ma" />
                            </div>
                            <div style={{ marginBottom: '50px', position:'relative' }}>
                                <h5 className="mb-3 head-table" style={{ float: 'left' }}>Variation</h5>
                                <Table columns={Variationcolumns} data={VariationData} for="variation" />
                            </div>
                            <div style={{ marginBottom: '50px', position:'relative' }}>
                                <h5 className="mb-3 head-table" style={{ float: 'left' }}>Renewal</h5>
                                <Table columns={Renewalcolumns} data={RenewalData} for="renewal" />
                            </div>
                            <div style={{ marginBottom: '50px', position:'relative' }}>
                                <h5 className="mb-3 head-table" style={{ float: 'left' }}>Baseline</h5>
                                <Table columns={Baselinecolumns} data={BaselineData} for="baseline" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>Ekemia</span> &copy; 2022</Typography>
            </footer>

        </>

    );
}

Dashboard.layout = page => <Authenticated children={page} auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} />

export default Dashboard;