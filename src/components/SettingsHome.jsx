import { settingsOptions } from '../constants/constants';
import SettingsOptionButton from './SettingsOptionButton';

const SettingsHome = () => {
    return (
        <div className="settings-home__options-container">
            {settingsOptions.map((option, i) => (
                <SettingsOptionButton key={i} option={option} />
            ))}
        </div>
    );
};

export default SettingsHome;
