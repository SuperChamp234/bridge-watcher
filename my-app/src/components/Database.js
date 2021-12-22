import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../App.css";

export default function Database(props) {
  return (
    <TableContainer className="table"component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell align="right">Current Load (kg)</TableCell>
            <TableCell align="right"># of Vehicles</TableCell>
            <TableCell align="right">Tension (N)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow
              key={row.timestamp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.timestamp}
              </TableCell>
              {console.log("Printing row")}
              {console.log(row)}
              <TableCell align="right">{row.load}</TableCell>
              <TableCell align="right">{row.vehicles}</TableCell>
              <TableCell align="right">{row.tension}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
