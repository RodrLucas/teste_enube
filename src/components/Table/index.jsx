import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import formatCurrency from '../../services/formatCurrency';
import { format } from 'date-fns'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(cotacoesInfo) {
    return { cotacoesInfo };
}

export default function CustomizedTables(props) {
    const rows = [
        createData(props)
    ];


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>Cotação de Compra</StyledTableCell>
                        <StyledTableCell align='center'>Cotação de Venda</StyledTableCell>
                        <StyledTableCell align='center'>Data da cotação</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows[0].cotacoesInfo.props.map(prop => {
                        let cotacaoCompra = prop.cotacaoCompra
                        let cotacaoVenda = prop.cotacaoVenda
                        let dataHoraCotacao = prop.dataHoraCotacao
                        return (
                            <StyledTableRow key={Math.random()}>
                                <StyledTableCell align='center' key={Math.random()}>{formatCurrency(cotacaoCompra)}</StyledTableCell>

                                <StyledTableCell align='center' key={Math.random()}>{formatCurrency(cotacaoVenda)}</StyledTableCell>

                                <StyledTableCell align='center' key={Math.random()}>{format(new Date(dataHoraCotacao), 'dd/MM/yyyy')}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
