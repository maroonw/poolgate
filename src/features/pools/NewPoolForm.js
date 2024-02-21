import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPoolMutation } from "./poolsApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewPoolForm = ({ users }) => {

    const [addNewPool, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPoolMutation();

    const navigate = useNavigate();

    const [poolname, setPoolname] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(users.length > 0 ? users[0].id : '');

    useEffect(() => {
        if (isSuccess) {
            setPoolname('');
            setAddress('');
            setDescription('');
            setUserId('');
            navigate('/dash/pools');
        }
    }, [isSuccess, navigate]);

    const onPoolnameChanged = e => setPoolname(e.target.value);
    const onAddressChanged = e => setAddress(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onUserIdChanged = e => setUserId(e.target.value);

    const canSave = [poolname, address, description, userId].every(Boolean) && !isLoading;

    const onSavePoolClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewPool({
                user: userId,
                poolname,
                address,
                description
            });
        }
    };

    const options = users.map(user => (
        <option key={user.id} value={user.id}>{user.username}</option>
    ));

    const errClass = isError ? "errmsg" : "offscreen";
    const validPoolnameClass = !poolname ? "form__input--incomplete" : '';
    const validAddressClass = !address ? "form__input--incomplete" : '';
    const validDescriptionClass = !description ? "form__input--incomplete" : '';

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSavePoolClicked}>
                <div className="form__title-row">
                    <h2>New Pool</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="poolname">Pool Name:</label>
                <input
                    className={`form__input ${validPoolnameClass}`}
                    id="poolname"
                    name="poolname"
                    type="text"
                    autoComplete="off"
                    value={poolname}
                    onChange={onPoolnameChanged}
                />

                <label className="form__label" htmlFor="address">Address:</label>
                <input
                    className={`form__input ${validAddressClass}`}
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    onChange={onAddressChanged}
                />

                <label className="form__label" htmlFor="description">Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">Assigned To:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
            </form>
        </>
    );

    return content;
};

export default NewPoolForm;
