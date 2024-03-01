import { actionIcons, moderatorActions } from '../constants/constants';
import ActionIconButton from './ActionIconButton';

const ActionButtonPanel = ({ type, id }) => {
    return (
        <div className="action-icon-button__wrapper">
            {type === 'playable' &&
                actionIcons.map((item) => (
                    <ActionIconButton
                        key={item.action}
                        action={item.action}
                        iconUrl={item.iconUrl}
                        path={item.path}
                    />
                ))}
            {type === 'moderator' &&
                moderatorActions.map((item) => (
                    <ActionIconButton
                        key={item.action}
                        action={item.action}
                        iconUrl={item.iconUrl}
                        path={item?.path}
                        id={id ?? undefined}
                    />
                ))}
        </div>
    );
};

export default ActionButtonPanel;
