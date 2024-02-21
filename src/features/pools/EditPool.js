import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPoolById } from "./poolsApiSlice"
import { selectAllUsers } from '../users/usersApiSlice'
import EditPoolForm from "./EditPoolForm"

const EditPool = () => {
    const { id } = useParams()

    const pool = useSelector(state => selectPoolById(state, id))
    const users = useSelector(selectAllUsers)

    const content = pool && users ? <EditPoolForm pool={pool} users={users} /> : <p>Loading...</p>

    return content
}

export default EditPool