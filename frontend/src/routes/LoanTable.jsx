import React, { Fragment, useEffect, useState } from 'react'
import { parse } from 'papaparse';
import { Table, TableHead, TableBody, TablePagination, TableRow, TableCell, Typography } from "@material-ui/core";

const LoanTable = () => {
    const [loanData, setLoanData] = useState(null)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const getLoanData = async () => {
        const request = new Request("http://localhost:12059/react-interview/getLoanData", {
            method: "GET"
        })
        const response = await fetch(request);
        const loanData = await response.text();
        setLoanData(parse(loanData).data);
    }
    useEffect(() => {
        getLoanData()
    }, []);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = e => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };
    return <div style={{ padding: 16, overflow: "scroll", height: "calc(100vh - 96px)", position: "relative" }}>
        {loanData &&
            <Fragment>
                <Table style={{ margin: "16px 12px 0px 12px", overflow: "hidden" }}>
                    <TableHead>
                        <TableRow>
                            {loanData[0].map((column, index) => {
                            return <TableCell key={`column-${index}`}><Typography color="primary" variant="body1">{column}</Typography></TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loanData.slice(page * rowsPerPage + 1, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                {row.map(data => <TableCell key={`${data}-${index}`}>{data}</TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={loanData.slice(1).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    style={{ position: "absolute", right: 0 }}
                />
            </Fragment>
        }
    </div>
}

export default LoanTable;