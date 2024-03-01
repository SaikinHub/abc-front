import { useEffect, useState } from 'react';
import PersonalInfos from './forms/PersonalInfos';
import { getUserInfos } from '../lib/actions/user.actions';

export const SettingsUserInfos = () => {
    const [userInfos, setUserInfos] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const infos = await getUserInfos().then((res) => res.json());
            setUserInfos(infos);
        };
        fetch();
    }, []);
    return (
        <div>{userInfos && <PersonalInfos initialContent={userInfos} />}</div>
    );
};
