import React from 'react';
import classes from './HorseList.module.css';
import { useTable, usePagination } from 'react-table';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
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
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 2 },
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table className={classes['table']} {...getTableProps()}>
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
                  return <tr key={row.original.id}>
                  <td>{row.original.name}</td>
                  <td>{row.original.favouriteFood}</td>
                  <td>{row.original.height}</td>
                  <td>{row.original.weight}</td>
                  </tr>
          })}
        </tbody>
      </table>
      
      <div className={classes['pagination']}>
        <button className={classes['button']} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button  className={classes['button']} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button  className={classes['button']} onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button  className={classes['button']} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[2,5,10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
const HorseList = (props) => {
  const data = props.horseData;
     const columns = React.useMemo(
      () => [
        {
          Header: 'Name'
        },
      {
        Header: 'Favourite Food'
      },
      {
        Header: 'Height'
      },
      {
        Header: 'Weight'
      }],
      []
    )
  
  
    return (
      <div>
        <Table columns={columns} data={data} />
      </div>
    )
};

export default HorseList;




