import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/pools">View Pools</Link></p>

            <p><Link to="/dash/pools/new">Add New Pool</Link></p>

            <p><Link to="/dash/users">View User Settings</Link></p>

            <p><Link to="/dash/users/new">Add New Users</Link></p>

        </section>
    )

    return content
}
export default Welcome