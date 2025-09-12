import React, { useState, useEffect, useRef, useCallback, useMemo, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faChevronDown,
    faChevronUp,
    faTimes,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { DateRangeProps, DateRangeValue, DateRangePreset } from './DateRange.types';
import './DateRange.scss';

// Presets padrão
const DEFAULT_PRESETS: DateRangePreset[] = [
    {
        key: 'today',
        label: 'Hoje',
        getValue: () => {
            const today = new Date().toISOString().split('T')[0];
            return { startDate: today, endDate: today };
        }
    },
    {
        key: 'yesterday',
        label: 'Ontem',
        getValue: () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const dateStr = yesterday.toISOString().split('T')[0];
            return { startDate: dateStr, endDate: dateStr };
        }
    },
    {
        key: 'last7days',
        label: 'Últimos 7 dias',
        description: 'Uma semana atrás até hoje',
        getValue: () => {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 6);
            return {
                startDate: start.toISOString().split('T')[0],
                endDate: end.toISOString().split('T')[0]
            };
        }
    },
    {
        key: 'last30days',
        label: 'Últimos 30 dias',
        description: 'Um mês atrás até hoje',
        getValue: () => {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 29);
            return {
                startDate: start.toISOString().split('T')[0],
                endDate: end.toISOString().split('T')[0]
            };
        }
    },
    {
        key: 'thisMonth',
        label: 'Este mês',
        getValue: () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            return {
                startDate: start.toISOString().split('T')[0],
                endDate: end.toISOString().split('T')[0]
            };
        }
    },
    {
        key: 'lastMonth',
        label: 'Mês passado',
        getValue: () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const end = new Date(now.getFullYear(), now.getMonth(), 0);
            return {
                startDate: start.toISOString().split('T')[0],
                endDate: end.toISOString().split('T')[0]
            };
        }
    }
];

export const DateRange = forwardRef<HTMLDivElement, DateRangeProps>(({
    // Valor
    value,
    defaultValue,
    
    // Configuração básica
    label,
    placeholder = 'Selecione o período...',
    variant = 'default',
    size = 'medium',
    
    // Estados
    disabled = false,
    loading = false,
    error,
    success,
    warning,
    
    // Aparência
    leftIcon = faCalendarAlt,
    rightIcon,
    separator = ' - ',
    
    // Funcionalidades
    clearable = true,
    showPresets = true,
    presets = DEFAULT_PRESETS,
    
    // Validação
    minDate,
    maxDate,
    maxRange,
    
    // Formato
    dateFormat = 'dd/mm/yyyy',
    locale = 'pt-BR',
    
    // Textos auxiliares
    helperText,
    startDateLabel = 'Data início',
    endDateLabel = 'Data fim',
    presetsTitle = 'Períodos',
    
    // Callbacks
    onChange,
    onClear,
    onPresetSelect,
    
    // Classes
    className = '',
    containerClassName = '',
    dropdownClassName = '',
    
    // Refs
    containerRef,
    
    ...props
}, ref) => {
    // Estados internos
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<DateRangeValue | null>(
        value || defaultValue || null
    );
    const [inputValue, setInputValue] = useState('');
    const [editingField, setEditingField] = useState<'start' | 'end' | null>(null);
    
    // Refs
    const dateRangeRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);
    
    const inputId = React.useId();
    const dropdownId = `${inputId}-dropdown`;
    
    // Sincronizar valor externo
    useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);
    
    // Formatar data para exibição
    const formatDate = useCallback((dateStr: string | null): string => {
        if (!dateStr) return '';
        
        try {
            const date = new Date(dateStr + 'T00:00:00');
            return date.toLocaleDateString(locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return dateStr;
        }
    }, [locale]);
    
    // Texto de exibição no input
    const displayText = useMemo(() => {
        if (!internalValue || (!internalValue.startDate && !internalValue.endDate)) {
            return placeholder;
        }
        
        const start = formatDate(internalValue.startDate);
        const end = formatDate(internalValue.endDate);
        
        if (start && end) {
            if (start === end) {
                return start;
            }
            return `${start}${separator}${end}`;
        }
        
        if (start) return `${start}${separator}...`;
        if (end) return `...${separator}${end}`;
        
        return placeholder;
    }, [internalValue, formatDate, separator, placeholder]);
    
    // Validar data
    const validateDate = useCallback((date: string): boolean => {
        if (!date) return true;
        
        const dateObj = new Date(date + 'T00:00:00');
        
        if (minDate && dateObj < new Date(minDate + 'T00:00:00')) return false;
        if (maxDate && dateObj > new Date(maxDate + 'T00:00:00')) return false;
        
        return true;
    }, [minDate, maxDate]);
    
    // Validar range
    const validateRange = useCallback((start: string | null, end: string | null): boolean => {
        if (!start || !end || !maxRange) return true;
        
        const startDate = new Date(start + 'T00:00:00');
        const endDate = new Date(end + 'T00:00:00');
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays <= maxRange;
    }, [maxRange]);
    
    // Handler para mudança de valor
    const handleValueChange = useCallback((newValue: DateRangeValue | null) => {
        // Validações
        if (newValue) {
            if (newValue.startDate && !validateDate(newValue.startDate)) return;
            if (newValue.endDate && !validateDate(newValue.endDate)) return;
            if (!validateRange(newValue.startDate, newValue.endDate)) return;
            
            // Garantir que start <= end
            if (newValue.startDate && newValue.endDate) {
                const start = new Date(newValue.startDate + 'T00:00:00');
                const end = new Date(newValue.endDate + 'T00:00:00');
                
                if (start > end) {
                    newValue = {
                        startDate: newValue.endDate,
                        endDate: newValue.startDate
                    };
                }
            }
        }
        
        setInternalValue(newValue);
        onChange?.(newValue);
    }, [onChange, validateDate, validateRange]);
    
    // Handler para toggle do dropdown
    const handleToggle = useCallback(() => {
        if (disabled || loading) return;
        setIsOpen(prev => !prev);
    }, [disabled, loading]);
    
    // Handler para seleção de preset
    const handlePresetSelect = useCallback((preset: DateRangePreset) => {
        const newValue = preset.getValue();
        handleValueChange(newValue);
        onPresetSelect?.(preset);
        setIsOpen(false);
    }, [handleValueChange, onPresetSelect]);
    
    // Handler para limpar
    const handleClear = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setInternalValue(null);
        onChange?.(null);
        onClear?.();
    }, [onChange, onClear]);
    
    // Handler para mudança das datas individuais
    const handleDateChange = useCallback((field: 'start' | 'end', dateStr: string) => {
        const currentValue = internalValue || { startDate: null, endDate: null };
        
        const newValue = {
            ...currentValue,
            [field === 'start' ? 'startDate' : 'endDate']: dateStr || null
        };
        
        handleValueChange(newValue);
    }, [internalValue, handleValueChange]);
    
    // Handler para navegação por teclado
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (disabled || loading) return;
        
        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                handleToggle();
                break;
            case 'Escape':
                if (isOpen) {
                    e.preventDefault();
                    setIsOpen(false);
                }
                break;
        }
    }, [disabled, loading, isOpen, handleToggle]);
    
    // Fechar quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);
    
    // Estados computados
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;
    const hasWarning = Boolean(warning) && !hasError && !hasSuccess;
    const hasValue = Boolean(internalValue && (internalValue.startDate || internalValue.endDate));
    const showClear = clearable && hasValue && !disabled && !loading;
    
    // Classes CSS
    const containerClasses = [
        'ui-daterange',
        `ui-daterange--${variant}`,
        `ui-daterange--${size}`,
        hasError && 'ui-daterange--error',
        hasSuccess && 'ui-daterange--success',
        hasWarning && 'ui-daterange--warning',
        disabled && 'ui-daterange--disabled',
        loading && 'ui-daterange--loading',
        isOpen && 'ui-daterange--open',
        containerClassName
    ].filter(Boolean).join(' ');
    
    const triggerClasses = [
        'ui-daterange__trigger',
        className
    ].filter(Boolean).join(' ');
    
    const dropdownClasses = [
        'ui-daterange__dropdown',
        dropdownClassName
    ].filter(Boolean).join(' ');
    
    return (
        <div
            ref={containerRef || dateRangeRef}
            className={containerClasses}
            {...props}
        >
            {/* Label */}
            {label && (
                <label htmlFor={inputId} className="ui-daterange__label">
                    {label}
                </label>
            )}
            
            {/* Trigger */}
            <div
                ref={ref as React.RefObject<HTMLDivElement>}
                id={inputId}
                className={triggerClasses}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                aria-describedBy={dropdownId}
                aria-invalid={hasError}
            >
                {/* Left Icon */}
                {leftIcon && (
                    <div className="ui-daterange__icon ui-daterange__icon--left">
                        <FontAwesomeIcon icon={leftIcon} />
                    </div>
                )}
                
                {/* Display Text */}
                <span className={`ui-daterange__text ${!hasValue ? 'ui-daterange__text--placeholder' : ''}`}>
                    {displayText}
                </span>
                
                {/* Right Icons */}
                <div className="ui-daterange__icons">
                    {loading && (
                        <div className="ui-daterange__icon ui-daterange__spinner">
                            <FontAwesomeIcon icon={faSpinner} spin />
                        </div>
                    )}
                    
                    {showClear && (
                        <button
                            type="button"
                            className="ui-daterange__clear"
                            onClick={handleClear}
                            aria-label="Limpar período"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}
                    
                    {rightIcon ? (
                        <div className="ui-daterange__icon">
                            <FontAwesomeIcon icon={rightIcon} />
                        </div>
                    ) : (
                        <div className="ui-daterange__icon ui-daterange__chevron">
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
                    role="dialog"
                    aria-label="Seleção de período"
                >
                    {/* Date Inputs */}
                    <div className="ui-daterange__inputs">
                        <div className="ui-daterange__input-group">
                            <label className="ui-daterange__input-label">
                                {startDateLabel}
                            </label>
                            <input
                                ref={startInputRef}
                                type="date"
                                className="ui-daterange__input"
                                value={internalValue?.startDate || ''}
                                onChange={(e) => handleDateChange('start', e.target.value)}
                                min={minDate}
                                max={maxDate}
                                disabled={disabled}
                            />
                        </div>
                        
                        <div className="ui-daterange__separator">
                            {separator.trim()}
                        </div>
                        
                        <div className="ui-daterange__input-group">
                            <label className="ui-daterange__input-label">
                                {endDateLabel}
                            </label>
                            <input
                                ref={endInputRef}
                                type="date"
                                className="ui-daterange__input"
                                value={internalValue?.endDate || ''}
                                onChange={(e) => handleDateChange('end', e.target.value)}
                                min={minDate}
                                max={maxDate}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    
                    {/* Presets */}
                    {showPresets && presets.length > 0 && (
                        <>
                            <div className="ui-daterange__divider" />
                            <div className="ui-daterange__presets">
                                <div className="ui-daterange__presets-title">
                                    {presetsTitle}
                                </div>
                                <div className="ui-daterange__presets-list">
                                    {presets.map((preset) => (
                                        <button
                                            key={preset.key}
                                            className="ui-daterange__preset"
                                            onClick={() => handlePresetSelect(preset)}
                                            type="button"
                                        >
                                            <span className="ui-daterange__preset-label">
                                                {preset.label}
                                            </span>
                                            {preset.description && (
                                                <span className="ui-daterange__preset-description">
                                                    {preset.description}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
            
            {/* Helper Text */}
            {helperText && !hasError && (
                <div className="ui-daterange__helper">
                    {helperText}
                </div>
            )}
            
            {/* Error Message */}
            {error && (
                <div className="ui-daterange__error">
                    {typeof error === 'string' ? error : 'Período inválido'}
                </div>
            )}
            
            {/* Success Message */}
            {success && !error && (
                <div className="ui-daterange__success">
                    {typeof success === 'string' ? success : 'Período válido'}
                </div>
            )}
            
            {/* Warning Message */}
            {warning && !error && !success && (
                <div className="ui-daterange__warning">
                    {typeof warning === 'string' ? warning : 'Atenção no período'}
                </div>
            )}
        </div>
    );
});

DateRange.displayName = 'DateRange';