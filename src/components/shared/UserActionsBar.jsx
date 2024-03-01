import { useSelector } from 'react-redux';
import CreateWidget from './CreateWidget';
import UserWidget from './UserWidget';

const UserActionsBar = () => {
    const { userObj, isInstructor } = useSelector((state) => state.user);
    return (
        <div className="user-actions__wrapper">
            {isInstructor && <CreateWidget />}
            <UserWidget user={userObj} />
        </div>
    );
};

export default UserActionsBar;
