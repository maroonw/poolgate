import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPoolById } from './poolsApiSlice';

const Pool = ({ poolId }) => {
    const pool = useSelector((state) => selectPoolById(state, poolId));
    const navigate = useNavigate();

    if (pool) {
        const created = new Date(pool.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        const updated = new Date(pool.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        const handleEdit = () => navigate(`/dash/pools/${poolId}`);

        return (
            <tr className="table__row">
                <td className="table__cell pool__status">
                    {pool.completed ? (
                        <span className="pool__status--completed">Completed</span>
                    ) : (
                        <span className="pool__status--open">Open</span>
                    )}
                </td>
                <td className="table__cell pool__created">{created}</td>
                <td className="table__cell pool__updated">{updated}</td>
                <td className="table__cell pool__poolname">{pool.poolname}</td>
                <td className="table__cell pool__address">{pool.address}</td>
                <td className="table__cell pool__description">{pool.description}</td>
                <td className="table__cell pool__username">{pool.username}</td>
                <td className="table__cell">
                    <button className="icon-button table__button" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        );
    } else {
        return null;
    }
};

export default Pool;
