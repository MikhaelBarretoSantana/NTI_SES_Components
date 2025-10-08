import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownProps, DropdownItem } from './Dropdown.types';
import './Dropdown.scss';

export const Dropdown: React.FC<DropdownProps> = ({
    // Conteúdo
    items = [],
    children,

    // Configuração
    trigger = 'click',
    placement = 'bottom-start',
    variant = 'default', // Nova prop
    disabled = false,

    // Aparência
    arrow = true,
    maxHeight = 300,
    minWidth,

    // Comportamento
    closeOnSelect = true,
    closeOnClickOutside = true,
    closeOnEscape = true,

    // Estados
    open,
    defaultOpen = false,

    // Callbacks
    onOpenChange,
    onSelect,

    // Classes
    className = '',
    dropdownClassName = '',
    itemClassName = '',

    // Refs
    containerRef,
}) => {
    // Estados internos
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

    // Refs
    const dropdownRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Estado controlado vs não controlado
    const isControlled = open !== undefined;
    const currentlyOpen = isControlled ? open : isOpen;

    // Triggers em array
    const triggers = Array.isArray(trigger) ? trigger : [trigger];

    // Processar itens baseado no variant
    const processedItems = useMemo(() => {
        if (variant !== 'divided') return items;

        const result: DropdownItem[] = [];
        
        items.forEach((item, index) => {
            // Adiciona o item
            result.push(item);
            
            // Se não for o último item e não for um divider/header, adiciona divider
            if (
                index < items.length - 1 && 
                item.type !== 'divider' && 
                item.type !== 'header' &&
                items[index + 1].type !== 'divider' &&
                items[index + 1].type !== 'header'
            ) {
                result.push({
                    key: `auto-divider-${index}`,
                    type: 'divider'
                });
            }
        });
        
        return result;
    }, [items, variant]);

    // Calcular posição do dropdown
    const calculatePosition = useCallback(() => {
        if (!triggerRef.current || !contentRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        let top = 0;
        let left = 0;

        // Calcular posição baseado no placement
        switch (placement) {
            case 'bottom-start':
                top = triggerRect.bottom + 4;
                left = triggerRect.left;
                break;
            case 'bottom-end':
                top = triggerRect.bottom + 4;
                left = triggerRect.right - contentRect.width;
                break;
            case 'top-start':
                top = triggerRect.top - contentRect.height - 4;
                left = triggerRect.left;
                break;
            case 'top-end':
                top = triggerRect.top - contentRect.height - 4;
                left = triggerRect.right - contentRect.width;
                break;
            case 'left':
                top = triggerRect.top;
                left = triggerRect.left - contentRect.width - 4;
                break;
            case 'right':
                top = triggerRect.top;
                left = triggerRect.right + 4;
                break;
        }

        // Ajustar para não sair da viewport
        if (left + contentRect.width > viewport.width) {
            left = viewport.width - contentRect.width - 8;
        }
        if (left < 8) {
            left = 8;
        }
        if (top + contentRect.height > viewport.height) {
            top = triggerRect.top - contentRect.height - 4;
        }
        if (top < 8) {
            top = triggerRect.bottom + 4;
        }

        setPosition({ top, left });
    }, [placement]);

    // Handlers para abrir/fechar
    const handleOpen = useCallback(() => {
        if (disabled) return;

        // Limpar timeout se existir
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }

        const newOpen = true;
        if (!isControlled) {
            setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    }, [disabled, isControlled, onOpenChange, hoverTimeout]);

    const handleClose = useCallback(() => {
        const newOpen = false;
        if (!isControlled) {
            setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    }, [isControlled, onOpenChange]);

    const handleDelayedClose = useCallback(() => {
        // Só para hover trigger
        if (!triggers.includes('hover')) {
            handleClose();
            return;
        }

        // Para hover, adicionar um pequeno delay
        const timeout = setTimeout(() => {
            handleClose();
        }, 150);
        setHoverTimeout(timeout);
    }, [triggers, handleClose]);

    const handleToggle = useCallback(() => {
        if (currentlyOpen) {
            handleClose();
        } else {
            handleOpen();
        }
    }, [currentlyOpen, handleOpen, handleClose]);

    // Handler para seleção de item
    const handleItemClick = useCallback((item: DropdownItem) => {
        if (item.disabled) return;

        if (item.type === 'item' || !item.type) {
            // Executar ação do item
            item.onClick?.();
            onSelect?.(item);

            // Navegação via href
            if (item.href) {
                if (item.target === '_blank') {
                    window.open(item.href, '_blank');
                } else {
                    window.location.href = item.href;
                }
            }

            // Fechar dropdown se configurado
            if (closeOnSelect) {
                handleClose();
            }
        }
    }, [onSelect, closeOnSelect, handleClose]);

    // Handlers para hover no dropdown content
    const handleDropdownMouseEnter = useCallback(() => {
        if (triggers.includes('hover') && hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
    }, [triggers, hoverTimeout]);

    const handleDropdownMouseLeave = useCallback(() => {
        if (triggers.includes('hover')) {
            handleDelayedClose();
        }
    }, [triggers, handleDelayedClose]);

    // Event handlers para diferentes triggers
    const triggerHandlers = {
        onClick: triggers.includes('click') ? handleToggle : undefined,
        onMouseEnter: triggers.includes('hover') ? handleOpen : undefined,
        onMouseLeave: triggers.includes('hover') ? handleDelayedClose : undefined,
        onContextMenu: triggers.includes('contextMenu') ? (e: React.MouseEvent) => {
            e.preventDefault();
            handleToggle();
        } : undefined,
    };

    // Fechar quando clicar fora
    useEffect(() => {
        if (!closeOnClickOutside || !currentlyOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [currentlyOpen, closeOnClickOutside, handleClose]);

    // Fechar com Escape
    useEffect(() => {
        if (!closeOnEscape || !currentlyOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [currentlyOpen, closeOnEscape, handleClose]);

    // Recalcular posição quando abrir
    useEffect(() => {
        if (currentlyOpen) {
            calculatePosition();
            // Recalcular na próxima frame para garantir que o conteúdo foi renderizado
            setTimeout(calculatePosition, 0);
        }
    }, [currentlyOpen, calculatePosition]);

    // Recalcular posição no resize da janela
    useEffect(() => {
        if (!currentlyOpen) return;

        const handleResize = () => calculatePosition();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentlyOpen, calculatePosition]);

    // Cleanup hover timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        };
    }, [hoverTimeout]);

    // Classes CSS
    const dropdownClasses = [
        'ui-dropdown',
        `ui-dropdown--${variant}`, // Nova classe de variant
        currentlyOpen && 'ui-dropdown--open',
        disabled && 'ui-dropdown--disabled',
        className
    ].filter(Boolean).join(' ');

    const contentClasses = [
        'ui-dropdown__content',
        `ui-dropdown__content--${placement}`,
        dropdownClassName
    ].filter(Boolean).join(' ');

    return (
        <div
            ref={containerRef || dropdownRef}
            className={dropdownClasses}
        >
            {/* Trigger */}
            <div
                ref={triggerRef}
                className="ui-dropdown__trigger"
                {...triggerHandlers}
            >
                {children}
            </div>

            {/* Dropdown Content */}
            {currentlyOpen && (
                <>
                    {/* Portal para renderizar no body */}
                    {typeof document !== 'undefined' && document.body && (
                        <div
                            ref={contentRef}
                            className={contentClasses}
                            style={{
                                position: 'fixed',
                                top: position.top,
                                left: position.left,
                                maxHeight,
                                minWidth,
                                zIndex: 1000,
                            }}
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                        >
                            {/* Arrow */}
                            {arrow && (
                                <div className="ui-dropdown__arrow" />
                            )}

                            {/* Items */}
                            <div className="ui-dropdown__items">
                                {processedItems.map((item, index) => {
                                    if (item.type === 'divider') {
                                        return (
                                            <div
                                                key={item.key || `divider-${index}`}
                                                className="ui-dropdown__divider"
                                            />
                                        );
                                    }

                                    if (item.type === 'header') {
                                        return (
                                            <div
                                                key={item.key || `header-${index}`}
                                                className="ui-dropdown__header"
                                            >
                                                {item.label}
                                            </div>
                                        );
                                    }

                                    // Item normal
                                    const itemClasses = [
                                        'ui-dropdown__item',
                                        item.disabled && 'ui-dropdown__item--disabled',
                                        item.danger && 'ui-dropdown__item--danger',
                                        itemClassName
                                    ].filter(Boolean).join(' ');

                                    const ItemComponent = item.href ? 'a' : 'button';

                                    return (
                                        <ItemComponent
                                            key={item.key}
                                            className={itemClasses}
                                            onClick={() => handleItemClick(item)}
                                            disabled={item.disabled}
                                            href={item.href}
                                            target={item.target}
                                            role="menuitem"
                                        >
                                            {item.icon && (
                                                <FontAwesomeIcon
                                                    icon={item.icon}
                                                    className="ui-dropdown__item-icon"
                                                />
                                            )}

                                            <div className="ui-dropdown__item-content">
                                                <span className="ui-dropdown__item-label">
                                                    {item.label}
                                                </span>
                                                {item.description && (
                                                    <span className="ui-dropdown__item-description">
                                                        {item.description}
                                                    </span>
                                                )}
                                            </div>
                                        </ItemComponent>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

Dropdown.displayName = 'Dropdown';