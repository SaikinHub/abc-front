import ActionIconButton from '../ActionIconButton';

const CreateWidget = () => {
    return (
        <div>
            <ActionIconButton
                action={'create'}
                iconUrl={'/assets/svg/plus-sign.svg'}
                path={'/create'}
            />
        </div>
    );
};

export default CreateWidget;
