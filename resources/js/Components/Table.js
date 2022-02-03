import React, { useState } from 'react';
import moment from 'moment';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
import BTable from 'react-bootstrap/Table';

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span className="inner-addon right-addon" style={{float:'right'}}>
            <span className="glyphicon lnr lnr-magnifier"></span>
            <input className='form-control'
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records... `}
                style={{
                    fontSize: '0.6rem',
                    border: '1px solid #f2f2f2',
                    padding:'5px',
                    marginRight:'10px',
                    borderRadius:'5px',
                    width: '85%',
                    display: 'inline'

                }}
            />
            {' '}
        </span>
    )
}

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        preGlobalFilteredRows,
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
        initialState: { pageSize: 5, pageIndex: 0 },
    }, useGlobalFilter, usePagination);

    return (
        <>
        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
        <BTable {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                           
                        ))}
                         <th>Action</th>
                    </tr>
                ))}
                {/* <tr>
                    <th>
                        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
                    </th>
                </tr> */}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td>
                            <button className="btn_table" data-toggle="tooltip" data-placement="top" title="Accéder" ><span style={{color:'#80e4ff'}} className=" lnr lnr-pencil"  ></span></button>
                            <button className="btn_table" data-toggle="tooltip" data-placement="top" title="Dupliquer" ><span style={{color:'#9195fd'}} className=" lnr lnr-layers"  ></span></button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </BTable>
        <div className="pagination">
                <span > 
                    {' '}
                   {/* <input className='form-control'
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '60px'  , display:'inline' , padding:'5px' , fontSize:'0.6rem' , border: '1px solid #f2f2f2'}}
                    />*/}
                    {'    '} Rows per page :{'    '} <select className='form-select' style={{ border: '1px solid #f2f2f2' , width:'65px' , display:'inline' , padding:'5px' , fontSize:'0.6rem' }}
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                             {pageSize}
                        </option>
                    ))}
                    </select>
                </span>{' '}
                <span style={{float:'right'}}>
                <span>
                    {'  '}
                    <strong style={{fontWeight:"400"}}>
                        {pageIndex + 1}{'-'}{pageOptions.length} of {' '}{pageOptions.length} items
                    </strong>{'  '}
                </span>{' '}
                <button className="pagination-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
               
                <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button className="pagination-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                </span>{' '}
               
               
               
            </div>
        </>
    )
}

export default Table;