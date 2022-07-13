import { useState, SetStateAction, Dispatch } from 'react'
import { styled } from '@mui/material/styles'
import { Button, TableCell, tableCellClasses, TableRow, TextField } from '@mui/material'
import { ObjectId } from 'mongodb'
import Axios from 'axios'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export interface RowDetails {
  _id: ObjectId
  fullName: string
  age: number
  favoriteColor: string
}
export default function CustomTableRow({
  row,
  userList,
  setUserList,
  readEntries
}: {
  row: RowDetails
  userList: RowDetails[]
  setUserList: Dispatch<SetStateAction<RowDetails[]>>
  readEntries: () => Promise<void>
}) {
  const [fullName, setFullName] = useState<string>('')
  const [age, setAge] = useState<number>(0)
  const [favoriteColor, setFavoriteColor] = useState<string>('')
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false)
  const update = async (id: string) => {
    await Axios.put(`http://localhost:3001/routes/update/${id}`, {
      id: id,
      fullName: fullName,
      age: age,
      favoriteColor: favoriteColor
    })
  }

  const deleteEntry = async (id: string) => {
    await Axios.delete(`http://localhost:3001/routes/delete/${id}`)
  }

  return (
    <>
      {isButtonPressed ? (
        <StyledTableRow key={row.fullName}>
          <StyledTableCell component='th' scope='row'>
            <TextField
              id='fullName'
              label='Full Name'
              placeholder='Juan Dela Cruz'
              defaultValue={row.fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </StyledTableCell>
          <StyledTableCell align='right'>
            <TextField
              id='age'
              label='Age'
              placeholder='21'
              defaultValue={row.age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </StyledTableCell>
          <StyledTableCell align='right'>
            <TextField
              id='favoriteColor'
              label='Favorite Color'
              placeholder='Blue'
              defaultValue={row.favoriteColor}
              onChange={(e) => setFavoriteColor(e.target.value)}
            />
          </StyledTableCell>
          <StyledTableCell align='right'>
            <Button
              onClick={async () => {
                await update(row._id.toString())
                await readEntries()
                setIsButtonPressed(false)
              }}
              variant='contained'
            >
              Update
            </Button>
          </StyledTableCell>
          <StyledTableCell align='right'>
            <Button variant='contained'>Delete</Button>
          </StyledTableCell>
        </StyledTableRow>
      ) : (
        <StyledTableRow key={row.fullName}>
          <StyledTableCell component='th' scope='row'>
            {row.fullName}
          </StyledTableCell>
          <StyledTableCell align='right'>{row.age}</StyledTableCell>
          <StyledTableCell align='right'>{row.favoriteColor}</StyledTableCell>
          <StyledTableCell align='right'>
            <Button
              onClick={() => {
                setIsButtonPressed(true)
              }}
              variant='contained'
            >
              Edit
            </Button>
          </StyledTableCell>
          <StyledTableCell align='right'>
            <Button
              onClick={async () => {
                await deleteEntry(row._id.toString())
                setUserList(userList.filter((user) => user !== row))
              }}
              variant='contained'
            >
              Delete
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      )}
    </>
  )
}
