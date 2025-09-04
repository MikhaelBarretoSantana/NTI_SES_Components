import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faHouse } from '@fortawesome/free-regular-svg-icons';

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    children,
    onClick,
    icon,
    iconSide = "Right",
    type = 'button',
    className = '',
    ...props
}) => {
    const baseClass = 'ui-button';
    const variantClass = `ui-button--${variant}`;
    const sizeClass = `ui-button--${size}`;
    const disabledClass = disabled || loading ? 'ui-button--disabled' : '';
    const loadingClass = loading ? 'ui-button--loading' : '';
    const iconRight = icon && iconSide === "Right";
    const iconLeft = icon && iconSide === "Left";

    const buttonClass = [
        baseClass,
        variantClass,
        sizeClass,
        disabledClass,
        loadingClass,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClass}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <FontAwesomeIcon className="ui-button__spinner" icon={faHourglass} />}
            <div className='ui-button__content'>
                {(iconLeft) && <FontAwesomeIcon className='ui-button__content-icon' icon={icon} />}
                <span className="ui-button__content-text">{children}</span>
                {(iconRight) && <FontAwesomeIcon className='ui-button__content-icon' icon={icon} />}
            </div>
        </button>
    );
};