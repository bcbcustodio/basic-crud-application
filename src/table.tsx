import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CustomTableRow, { RowDetails } from './tableRow'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Button, Stack } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

export default function CustomizedTables() {
  const [fullName, setFullName] = useState<string>('')
  const [age, setAge] = useState<number>(0)
  const [favoriteColor, setFavoriteColor] = useState<string>('')
  const [userList, setUserList] = useState<RowDetails[]>([])

  const submit = async () => {
    console.log('here')
    await Axios.post('http://localhost:3001/routes/create', {
      fullName: fullName,
      age: age,
      favoriteColor: favoriteColor
    })

    await readEntries()
  }

  const readEntries = async (): Promise<void> => {
    Axios.get('http://localhost:3001/routes/read').then((response) => {
      setUserList(Array.from(response.data))
    })
  }

  //function is called whenever the page is reloaded
  useEffect(() => {
    readEntries()
  }, [])

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        autoComplete='off'
      >
        <div>
          <Stack direction='row' spacing={2}>
            <TextField
              id='fullName'
              label='Full Name'
              placeholder='Juan Dela Cruz'
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField id='age' label='Age' placeholder='21' onChange={(e) => setAge(parseInt(e.target.value))} />
            <TextField
              id='favoriteColor'
              label='Favorite Color'
              placeholder='Blue'
              onChange={(e) => setFavoriteColor(e.target.value)}
            />
            <Button
              size='large'
              onClick={async () => {
                await submit()
                await readEntries()
              }}
              variant='contained'
            >
              Create
            </Button>
          </Stack>
        </div>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Full Name </StyledTableCell>
              <StyledTableCell align='right'>Age</StyledTableCell>
              <StyledTableCell align='right'>Favorite Color</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row: RowDetails) => (
              <CustomTableRow row={row} setUserList={setUserList} userList={userList} readEntries={readEntries} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
