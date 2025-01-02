import React, { ReactNode, useState } from 'react';
import './Tooltip.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

interface TooltipProps {
    text?: ReactNode;
}

const Tooltip = ({ text }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout); // Clear any existing timeout to prevent premature hiding
        }
        setIsVisible(true);
    };

    const hideTooltip = () => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 100); // Adjust delay (in milliseconds) as needed
        setHideTimeout(timeout);
    };

    return (
        <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            <FontAwesomeIcon icon={faQuestion} />
            {isVisible && (
                <div
                    className="tooltip-box"
                    onMouseEnter={showTooltip} // Keep the tooltip visible
                    onMouseLeave={hideTooltip} // Hide when the mouse leaves the tooltip-box
                >
                    <p className='small-text'>{text}</p>
                    <a href='/learn' className='tooltip-link'>
                        Learn more about Intentional Binding
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
