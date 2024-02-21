import { useState, useEffect } from "react"
import { useUpdatePoolMutation, useDeletePoolMutation } from "./poolsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditPoolForm = ({ pool, users }) => {

    const [updatePool, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdatePoolMutation()

    const [deletePool, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeletePoolMutation()

    const navigate = useNavigate()

    const [poolname, setPoolname] = useState(pool.poolname)
    const [address, setAddress] = useState(pool.address)
    const [description, setDescription] = useState(pool.description)
    const [userId, setUserId] = useState(pool.user)

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setPoolname('')
            setAddress('')
            setDescription('')
            setUserId('')
            navigate('/dash/pools')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onPoolnameChanged = e => setPoolname(e.target.value)
    const onAddressChanged = e => setAddress(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [poolname, address, description, userId].every(Boolean) && !isLoading

    const onSavePoolClicked = async (e) => {
        if (canSave) {
            await updatePool({ id: pool.id, user: userId, poolname, address, description })
        }
    }

    const onDeletePoolClicked = async () => {
        await deletePool({ id: pool.id })
    }

    const created = new Date(pool.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(pool.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validPoolnameClass = !poolname ? "form__input--incomplete" : ''
    const validAddressClass = !address ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delError?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Pool #{pool.poolNumber}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSavePoolClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeletePoolClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="pool-poolname">
                    Pool Name:</label>
                <input
                    className={`form__input ${validPoolnameClass}`}
                    id="pool-poolname"
                    name="poolname"
                    type="text"
                    autoComplete="off"
                    value={poolname}
                    onChange={onPoolnameChanged}
                />

                <label className="form__label" htmlFor="pool-address">
                    Address:</label>
                <input
                    className={`form__input ${validAddressClass}`}
                    id="pool-address"
                    name="address"
                    type="text"
                    value={address}
                    onChange={onAddressChanged}
                />

                <label className="form__label" htmlFor="pool-description">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="pool-description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="pool-username">
                            Assigned To:</label>
                        <select
                            id="pool-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditPoolForm
