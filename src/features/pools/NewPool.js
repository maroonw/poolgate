import { useSelector } from "react-redux"
import { selectAllUsers } from '../users/usersApiSlice'
import NewPoolForm from './NewPoolForm'

const NewPool = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewPoolForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewPool