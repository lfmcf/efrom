import React from 'react';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
import BTable from 'react-bootstrap/Table';
import { Inertia } from '@inertiajs/inertia'
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

function Table(props) {
    
    const {columns, data} = props
    
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

    const handleShowClick = (id) => {
        if(props.for == 'ma') {
            Inertia.get('ma/'+id+'/show')
        }else if(props.for == 'variation') {
            Inertia.get('variation/'+id+'/show')
        }
        else if(props.for == 'renewal') {
            Inertia.get('renewal/'+id+'/show')
        }else if(props.for == 'baseline') {
            Inertia.get('baseline/'+id+'/show')
        }else if(props.for == 'crc') {
            Inertia.get('clinical/'+id+'/show')
        }
        else if(props.for == 'amendment') {
            Inertia.get('amendments/'+id+'/show')
        }else if(props.for == 'transfer') {
            Inertia.get('transfer/'+id+'/show')
        }else if(props.for == 'rt') {
            Inertia.get('registrationtermination/'+id+'/show')
        }
        
    }
    const handleDuplicateClick = (id) => {
        if(props.for == 'ma') {
            Inertia.get('ma/'+id+'/edit')
        }else if(props.for == 'variation') {
            Inertia.get('variation/'+id+'/edit')
        }else if(props.for == 'renewal') {
            Inertia.get('renewal/'+id+'/edit')
        }else if(props.for == 'baseline') {
            Inertia.get('baseline/'+id+'/edit')
        }else if(props.for == 'crc') {
            Inertia.get('clinical/'+id+'/edit')
        }else if(props.for == 'amendment') {
            Inertia.get('amendments/'+id+'/edit')
        }else if(props.for == 'transfer') {
            Inertia.get('transfer/'+id+'/edit')
        }else if(props.for == 'rt') {
            Inertia.get('registrationtermination/'+id+'/edit')
        }
    }

    const handleEditClick = (id) => {
        if(props.for == 'ma') {
            Inertia.get('ma/'+id+'/edit', {opr: 'edit'})
        }else if(props.for == 'variation') {
            Inertia.get('variation/'+id+'/edit', {opr: 'edit'})
        }else if(props.for == 'renewal') {
            Inertia.get('renewal/'+id+'/edit', {opr: 'edit'})
        }else if(props.for == 'baseline') {
            Inertia.get('baseline/'+id+'/edit', {opr: 'edit'})
        }else if(props.for == 'crc') {
            Inertia.get('clinical/'+id+'/edit', {opr: 'edit'})
        }else if(props.for == 'amendment') {
            Inertia.get('amendments/'+id+'/edit', {opr: 'edit'})
        }else if(props.for == 'transfer') {
            Inertia.get('transfer/'+id+'/edit', {opr: 'edit'})
        }else if(props.for == 'rt') {
            Inertia.get('registrationtermination/'+id+'/edit', {opr: 'edit'})
        }
    }

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
                                {row.values.Status == "Submitted" ?
                                    <>
                                        <IconButton aria-label="Duplicate" size="small" style={{color:'rgb(212,101,141)'}}  onClick={() => handleDuplicateClick(row.original._id)}>
                                            <ContentCopyIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="Show" size="small" color="primary" onClick={() => handleShowClick(row.original._id)}>
                                            <VisibilityIcon fontSize="inherit" />
                                        </IconButton>
                                       
                                    </> :
                                   
                                    <IconButton aria-label="Edit" size="small" style={{color:'rgb(50,187,145)'}} onClick={() => handleEditClick(row.original._id)}>
                                        <EditIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </BTable>
        <div className="pagination">
                <span > 
                    {' '}
                   
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