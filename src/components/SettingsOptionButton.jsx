import { useDispatch } from 'react-redux';
import { pushScreen } from '../lib/utils/globalState/settingsSlice';

const SettingsOptionButton = ({ option }) => {
    const dispatch = useDispatch();
    return (
        <button
            className="settings__option-btn"
            onClick={() => dispatch(pushScreen(option.screenId))}
        >
            <p className="settigns__option-title">{option.title}</p>
            <img src="/assets/svg/right-chevron.svg" alt="right chevron" />
        </button>
    );
};

export default SettingsOptionButton;
