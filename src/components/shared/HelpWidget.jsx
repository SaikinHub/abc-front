import { useState } from 'react';
import { helpCenter } from '../../constants/constants';
import NavButton from '../NavButton';

const HelpWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="help-widget__wrapper">
            {isOpen && (
                <div className="help-widget__panel">
                    {helpCenter &&
                        helpCenter.map((item, i) => (
                            <NavButton key={i} showTitle={true} button={item} />
                        ))}
                </div>
            )}
            <button
                className="help-widget"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <img src="/assets/svg/question-mark.svg" alt="help icon" />
            </button>
        </div>
    );
};

export default HelpWidget;
