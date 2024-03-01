import { SettingsUserInfos } from '../../../components/SettingsUserInfos';
import SettingsHome from '../../../components/SettingsHome';
import { useDispatch, useSelector } from 'react-redux';
import {
    popScreen,
    resetTree,
} from '../../../lib/utils/globalState/settingsSlice';
import SettingsPasswordManagement from '../../../components/SettingsPasswordManagement';
import { useEffect } from 'react';

const Settings = () => {
    const dispatch = useDispatch();
    const { settingsNavTree } = useSelector((state) => state.settings);

    let heading = undefined;

    switch (settingsNavTree[settingsNavTree.length - 1]) {
        case 2:
            heading = 'My Infos';
            break;

        case 3:
            heading = 'Change Password';
            break;

        default:
            heading = 'Settings';
            break;
    }

    useEffect(() => {
        dispatch(resetTree());
    }, []);
    return (
        <section>
            <div className="settings__wrapper">
                {settingsNavTree.length > 1 && (
                    <button onClick={() => dispatch(popScreen())}>
                        <img src="/assets/svg/left-arrow.svg" alt="" />
                    </button>
                )}
                <h2 className="settings__heading">{heading}</h2>

                {/* MAIN MENU */}

                {/* Home */}
                {settingsNavTree[settingsNavTree.length - 1] === 1 && (
                    <SettingsHome />
                )}

                {/* SUB MENUS */}

                {/* User Infos */}
                {settingsNavTree[settingsNavTree.length - 1] === 2 && (
                    <SettingsUserInfos />
                )}

                {/* Password Management */}
                {settingsNavTree[settingsNavTree.length - 1] === 3 && (
                    <SettingsPasswordManagement />
                )}
            </div>
        </section>
    );
};

export default Settings;
