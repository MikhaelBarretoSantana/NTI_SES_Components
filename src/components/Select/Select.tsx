import React, { useState, useEffect, useRef, useCallback, useMemo, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faTimes,
    faSpinner,
    faSearch,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { SelectProps, SelectOption } from './Select.types';
import './Select.scss';

export const Select = forwardRef<HTMLDivElement, SelectProps>(({
    // Dados
    options = [],
    value,
    defaultValue,

    // Configuração
    label,
    placeholder = 'Selecione uma opção',
    variant = 'default',
    size = 'medium',

    // Funcionalidades
    multiple = false,
    searchable = false,
    clearable = false,
    disabled = false,
    loading = false,

    // Estados
    error,
    success,
    warning,

    // Aparência
    leftIcon,
    rightIcon,

    // Comportamento
    maxHeight = 200,
    maxSelectedDisplay = 3,

    // Textos
    helperText,
    noOptionsText = 'Nenhuma opção encontrada',
    loadingText = 'Carregando...',
    searchPlaceholder = 'Buscar...',

    // Callbacks
    onChange,
    onSearch,
    onOpen,
    onClose,

    // Classes
    className = '',
    containerClassName = '',
    dropdownClassName = '',
    optionClassName = '',

    // Refs
    containerRef,
    required = false,

    ...props
}, ref) => {
    // Estados internos
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [internalValue, setInternalValue] = useState(value || defaultValue || (multiple ? [] : null));

    // Refs
    const selectRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const inputId = React.useId();
    const dropdownId = `${inputId}-dropdown`;

    // Sincronizar valor externo
    useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);

    // Filtrar opções baseado na busca
    const filteredOptions = useMemo(() => {
        if (!searchable || !searchTerm) return options;

        return options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm, searchable]);

    // Agrupar opções se tiverem grupo
    const groupedOptions = useMemo(() => {
        const groups: { [key: string]: SelectOption[] } = {};
        const ungrouped: SelectOption[] = [];

        filteredOptions.forEach(option => {
            if (option.group) {
                if (!groups[option.group]) groups[option.group] = [];
                groups[option.group].push(option);
            } else {
                ungrouped.push(option);
            }
        });

        return { groups, ungrouped };
    }, [filteredOptions]);

    // Obter opção selecionada(s)
    const selectedOptions = useMemo(() => {
        if (!internalValue) return [];
        const values = Array.isArray(internalValue) ? internalValue : [internalValue];
        return options.filter(option => values.includes(option.value));
    }, [internalValue, options]);

    // Texto a ser exibido no select
    const displayText = useMemo(() => {
        if (!selectedOptions.length) return placeholder;

        if (!multiple) {
            return selectedOptions[0]?.label || '';
        }

        if (selectedOptions.length <= maxSelectedDisplay) {
            return selectedOptions.map(opt => opt.label).join(', ');
        }

        const displayCount = maxSelectedDisplay;
        const remainingCount = selectedOptions.length - displayCount;
        const displayLabels = selectedOptions.slice(0, displayCount).map(opt => opt.label);

        return `${displayLabels.join(', ')} +${remainingCount} mais`;
    }, [selectedOptions, placeholder, multiple, maxSelectedDisplay]);

    // Handlers
    const handleToggle = useCallback(() => {
        if (disabled || loading) return;

        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);

        if (newIsOpen) {
            onOpen?.();
            setFocusedIndex(-1);
            if (searchable) {
                setTimeout(() => searchRef.current?.focus(), 100);
            }
        } else {
            onClose?.();
            setSearchTerm('');
        }
    }, [disabled, loading, isOpen, onOpen, onClose, searchable]);

    const handleOptionClick = useCallback((option: SelectOption) => {
        if (option.disabled) return;

        let newValue;

        if (multiple) {
            const currentArray = Array.isArray(internalValue) ? internalValue : [];
            if (currentArray.includes(option.value)) {
                newValue = currentArray.filter(v => v !== option.value);
            } else {
                newValue = [...currentArray, option.value];
            }
        } else {
            newValue = option.value;
            setIsOpen(false);
            onClose?.();
        }

        setInternalValue(newValue);
        onChange?.(newValue);
    }, [multiple, internalValue, onChange, onClose]);

    const handleClear = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        const newValue = multiple ? [] : null;
        setInternalValue(newValue);
        onChange?.(newValue);
    }, [multiple, onChange]);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        setFocusedIndex(-1);
        onSearch?.(term);
    }, [onSearch]);

    // Navegação por teclado
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (disabled || loading) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                if (!isOpen) {
                    e.preventDefault();
                    handleToggle();
                } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
                    e.preventDefault();
                    handleOptionClick(filteredOptions[focusedIndex]);
                }
                break;

            case 'Escape':
                if (isOpen) {
                    e.preventDefault();
                    setIsOpen(false);
                    onClose?.();
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    handleToggle();
                } else {
                    setFocusedIndex(prev =>
                        prev < filteredOptions.length - 1 ? prev + 1 : prev
                    );
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (isOpen) {
                    setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
                }
                break;
        }
    }, [disabled, loading, isOpen, focusedIndex, filteredOptions, handleToggle, handleOptionClick, onClose]);

    // Fechar quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                onClose?.();
                setSearchTerm('');
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, onClose]);

    // Estados computados
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;
    const hasWarning = Boolean(warning) && !hasError && !hasSuccess;
    const hasValue = selectedOptions.length > 0;
    const showClear = clearable && hasValue && !disabled && !loading;

    // Classes CSS
    const containerClasses = [
        'ui-select',
        `ui-select--${variant}`,
        `ui-select--${size}`,
        hasError && 'ui-select--error',
        hasSuccess && 'ui-select--success',
        hasWarning && 'ui-select--warning',
        disabled && 'ui-select--disabled',
        loading && 'ui-select--loading',
        isOpen && 'ui-select--open',
        leftIcon && 'ui-select--has-left-icon',
        containerClassName
    ].filter(Boolean).join(' ');

    const triggerClasses = [
        'ui-select__trigger',
        className
    ].filter(Boolean).join(' ');

    const dropdownClasses = [
        'ui-select__dropdown',
        dropdownClassName
    ].filter(Boolean).join(' ');

    return (
        <div
            ref={containerRef || selectRef}
            className={containerClasses}
            {...props}
        >
            {/* Label */}
            {label && (
                <label htmlFor={inputId} className="ui-select__label">
                    {label}
                    {required && <span className="ui-select__required">*</span>}
                </label>
            )}

            {/* Select Trigger */}
            <div
                ref={ref as React.RefObject<HTMLDivElement>}
                id={inputId}
                className={triggerClasses}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-describedby={dropdownId}
                aria-invalid={hasError}
            >
                {/* Left Icon */}
                {leftIcon && (
                    <div className="ui-select__icon ui-select__icon--left">
                        <FontAwesomeIcon icon={leftIcon} />
                    </div>
                )}

                {/* Display Text */}
                <span className={`ui-select__text ${!hasValue ? 'ui-select__text--placeholder' : ''}`}>
                    {displayText}
                </span>

                {/* Right Icons */}
                <div className="ui-select__icons">
                    {loading && (
                        <div className="ui-select__icon ui-select__spinner">
                            <FontAwesomeIcon icon={faSpinner} spin />
                        </div>
                    )}

                    {showClear && (
                        <button
                            type="button"
                            className="ui-select__clear"
                            onClick={handleClear}
                            aria-label="Limpar seleção"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}

                    {rightIcon ? (
                        <div className="ui-select__icon">
                            <FontAwesomeIcon icon={rightIcon} />
                        </div>
                    ) : (
                        <div className="ui-select__icon ui-select__chevron">
                            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                        </div>
                    )}
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div
                    id={dropdownId}
                    className={dropdownClasses}
                    role="listbox"
                    aria-multiselectable={multiple}
                    style={{ maxHeight }}
                >
                    {/* Search Input */}
                    {searchable && (
                        <div className="ui-select__search">
                            <FontAwesomeIcon icon={faSearch} className="ui-select__search-icon" />
                            <input
                                ref={searchRef}
                                type="text"
                                className="ui-select__search-input"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    )}

                    {/* Options */}
                    <div
                        ref={optionsRef}
                        className="ui-select__options"
                    >
                        {loading ? (
                            <div className="ui-select__message">
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <span>{loadingText}</span>
                            </div>
                        ) : filteredOptions.length === 0 ? (
                            <div className="ui-select__message">
                                {noOptionsText}
                            </div>
                        ) : (
                            <>
                                {/* Opções sem grupo */}
                                {groupedOptions.ungrouped.map((option, index) => {
                                    const isSelected = Array.isArray(internalValue)
                                        ? internalValue.includes(option.value)
                                        : internalValue === option.value;
                                    const isFocused = index === focusedIndex;

                                    return (
                                        <div
                                            key={option.value}
                                            className={[
                                                'ui-select__option',
                                                isSelected && 'ui-select__option--selected',
                                                isFocused && 'ui-select__option--focused',
                                                option.disabled && 'ui-select__option--disabled',
                                                optionClassName
                                            ].filter(Boolean).join(' ')}
                                            role="option"
                                            aria-selected={isSelected}
                                            onClick={() => handleOptionClick(option)}
                                        >
                                            {option.icon && (
                                                <FontAwesomeIcon icon={option.icon} className="ui-select__option-icon" />
                                            )}

                                            <div className="ui-select__option-content">
                                                <span className="ui-select__option-label">{option.label}</span>
                                                {option.description && (
                                                    <span className="ui-select__option-description">{option.description}</span>
                                                )}
                                            </div>

                                            {isSelected && (
                                                <FontAwesomeIcon icon={faCheck} className="ui-select__option-check" />
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Opções agrupadas */}
                                {Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
                                    <div key={groupName} className="ui-select__group">
                                        <div className="ui-select__group-title">{groupName}</div>
                                        {groupOptions.map((option) => {
                                            const isSelected = Array.isArray(internalValue)
                                                ? internalValue.includes(option.value)
                                                : internalValue === option.value;

                                            return (
                                                <div
                                                    key={option.value}
                                                    className={[
                                                        'ui-select__option',
                                                        'ui-select__option--grouped',
                                                        isSelected && 'ui-select__option--selected',
                                                        option.disabled && 'ui-select__option--disabled',
                                                        optionClassName
                                                    ].filter(Boolean).join(' ')}
                                                    role="option"
                                                    aria-selected={isSelected}
                                                    onClick={() => handleOptionClick(option)}
                                                >
                                                    {option.icon && (
                                                        <FontAwesomeIcon icon={option.icon} className="ui-select__option-icon" />
                                                    )}

                                                    <div className="ui-select__option-content">
                                                        <span className="ui-select__option-label">{option.label}</span>
                                                        {option.description && (
                                                            <span className="ui-select__option-description">{option.description}</span>
                                                        )}
                                                    </div>

                                                    {isSelected && (
                                                        <FontAwesomeIcon icon={faCheck} className="ui-select__option-check" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Helper Text */}
            {helperText && !hasError && (
                <div className="ui-select__helper">
                    {helperText}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="ui-select__error">
                    {typeof error === 'string' ? error : 'Seleção inválida'}
                </div>
            )}

            {/* Success Message */}
            {success && !error && (
                <div className="ui-select__success">
                    {typeof success === 'string' ? success : 'Seleção válida'}
                </div>
            )}

            {/* Warning Message */}
            {warning && !error && !success && (
                <div className="ui-select__warning">
                    {typeof warning === 'string' ? warning : 'Atenção'}
                </div>
            )}
        </div>
    );
});

Select.displayName = 'Select';