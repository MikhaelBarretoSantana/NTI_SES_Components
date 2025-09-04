import React, { useState, useCallback, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { InputProps } from './Input.types';
import './Input.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    // Básicas
    label,
    type = 'text',
    variant = 'default',
    size = 'medium',

    // Estados
    error,
    success,
    warning,
    loading,
    disabled,

    // Aparência
    leftIcon,
    rightIcon,
    leftAddon,
    rightAddon,

    // Funcionalidades
    clearable = false,
    showPassword = false,
    counter = false,

    // Textos
    helperText,
    placeholder,

    // Eventos
    onChange,
    onClear,
    onIconClick,

    // Classes
    className = '',
    containerClassName = '',
    labelClassName = '',
    fieldClassName = '',
    helperClassName = '',
    errorClassName = '',

    // Referências
    containerRef,

    // Props do input nativo
    value,
    defaultValue,
    maxLength,
    ...inputProps
}, ref) => {
    const [showPasswordToggle, setShowPasswordToggle] = useState(false);
    const [internalValue, setInternalValue] = useState(value || defaultValue || '');

    const inputId = React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Determinar o tipo real do input
    const actualType = type === 'password' && showPassword && showPasswordToggle ? 'text' : type;

    // Handlers
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(e);
    }, [onChange]);

    const handleClear = useCallback(() => {
        if (ref && 'current' in ref && ref.current) {
            ref.current.value = '';
            const event = new Event('input', { bubbles: true });
            ref.current.dispatchEvent(event);
        }
        setInternalValue('');
        onClear?.();
    }, [onClear, ref]);

    const handlePasswordToggle = useCallback(() => {
        setShowPasswordToggle(prev => !prev);
    }, []);

    // Estados computados
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;
    const hasWarning = Boolean(warning) && !hasError && !hasSuccess;
    const hasLeftContent = Boolean(leftIcon || leftAddon);
    const hasRightContent = Boolean(
        rightIcon ||
        rightAddon ||
        clearable ||
        (type === 'password' && showPassword) ||
        loading
    );

    // Classes CSS
    const containerClasses = [
        'ui-input',
        `ui-input--${variant}`,
        `ui-input--${size}`,
        hasError && 'ui-input--error',
        hasSuccess && 'ui-input--success',
        hasWarning && 'ui-input--warning',
        disabled && 'ui-input--disabled',
        loading && 'ui-input--loading',
        hasLeftContent && 'ui-input--has-left',
        hasRightContent && 'ui-input--has-right',
        containerClassName
    ].filter(Boolean).join(' ');

    const fieldClasses = [
        'ui-input__field',
        fieldClassName,
        className
    ].filter(Boolean).join(' ');

    // Valor atual para contador
    const currentValue = value !== undefined ? value : internalValue;
    const currentLength = String(currentValue).length;

    return (
        <div ref={containerRef} className={containerClasses}>
            {/* Label */}
            {label && (
                <label
                    htmlFor={inputId}
                    className={`ui-input__label ${labelClassName}`}
                >
                    {label}
                    {inputProps.required && <span className="ui-input__required">*</span>}
                </label>
            )}

            {/* Input Container */}
            <div className="ui-input__container">
                {/* Left Addon */}
                {leftAddon && (
                    <div className="ui-input__addon ui-input__addon--left">
                        {leftAddon}
                    </div>
                )}

                {/* Left Icon */}
                {leftIcon && (
                    <button
                        type="button"
                        className="ui-input__icon ui-input__icon--left"
                        onClick={() => onIconClick?.('left')}
                        tabIndex={-1}
                    >
                        <FontAwesomeIcon icon={leftIcon} />
                    </button>
                )}

                {/* Input Field */}
                <input
                    {...inputProps}
                    id={inputId}
                    ref={ref}
                    type={actualType}
                    className={fieldClasses}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={handleChange}
                    aria-invalid={hasError ? 'true' : 'false'}
                    aria-describedby={[
                        error ? errorId : null,
                        helperText ? helperId : null
                    ].filter(Boolean).join(' ') || undefined}
                    value={value}
                    defaultValue={defaultValue}
                    maxLength={maxLength}
                />

                {/* Loading Spinner */}
                {loading && (
                    <div className="ui-input__spinner">
                        <FontAwesomeIcon icon={faSpinner} className="ui-input__spinner-icon" spin />
                    </div>
                )}

                {/* Clear Button */}
                {clearable && currentValue && !disabled && !loading && (
                    <button
                        type="button"
                        className="ui-input__clear"
                        onClick={handleClear}
                        aria-label="Limpar campo"
                        tabIndex={-1}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}

                {/* Password Toggle */}
                {type === 'password' && showPassword && (
                    <button
                        type="button"
                        className="ui-input__password-toggle"
                        onClick={handlePasswordToggle}
                        aria-label={showPasswordToggle ? 'Ocultar senha' : 'Mostrar senha'}
                        tabIndex={-1}
                    >
                        <FontAwesomeIcon icon={showPasswordToggle ? faEyeSlash : faEye} />
                    </button>
                )}

                {/* Right Icon */}
                {rightIcon && (
                    <button
                        type="button"
                        className="ui-input__icon ui-input__icon--right"
                        onClick={() => onIconClick?.('right')}
                        tabIndex={-1}
                    >
                        <FontAwesomeIcon icon={rightIcon} />
                    </button>
                )}

                {/* Right Addon */}
                {rightAddon && (
                    <div className="ui-input__addon ui-input__addon--right">
                        {rightAddon}
                    </div>
                )}
            </div>

            {/* Counter */}
            {counter && maxLength && (
                <div className="ui-input__counter">
                    {currentLength}/{maxLength}
                </div>
            )}

            {/* Helper Text */}
            {helperText && !hasError && (
                <div id={helperId} className={`ui-input__helper ${helperClassName}`}>
                    {helperText}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div id={errorId} className={`ui-input__error ${errorClassName}`}>
                    {typeof error === 'string' ? error : 'Campo inválido'}
                </div>
            )}

            {/* Success Message */}
            {success && !error && (
                <div className="ui-input__success">
                    {typeof success === 'string' ? success : 'Campo válido'}
                </div>
            )}

            {/* Warning Message */}
            {warning && !error && !success && (
                <div className="ui-input__warning">
                    {typeof warning === 'string' ? warning : 'Atenção'}
                </div>
            )}
        </div>
    );
});