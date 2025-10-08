import React, {
    useEffect,
    useRef,
    useCallback,
    useMemo,
    forwardRef,
    useImperativeHandle,
    MouseEvent,
    KeyboardEvent,
    useState,
    useLayoutEffect
} from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faInfoCircle,
    faCheckCircle,
    faExclamationTriangle,
    faTimesCircle,
    faExpand,
    faCompress
} from '@fortawesome/free-solid-svg-icons';
import { ModalProps, ModalComponentRef, ModalSize } from './Modal.types';
import './Modal.scss';

// Size configurations
const SIZE_CONFIG: Record<ModalSize, { width: number | string; minHeight?: number; maxWidth?: string }> = {
    small: { width: 416, maxWidth: '90vw' },
    default: { width: 520, maxWidth: '90vw' },
    large: { width: 880, minHeight: 600, maxWidth: '95vw' },
    'extra-large': { width: 1200, minHeight: 700, maxWidth: '98vw' }
};

// Animation type configurations
const ANIMATION_CONFIG = {
    fade: 'ant-modal-fade',
    zoom: 'ant-modal-zoom',
    'slide-up': 'ant-modal-slide-up',
    'slide-down': 'ant-modal-slide-down',
    'slide-left': 'ant-modal-slide-left',
    'slide-right': 'ant-modal-slide-right'
};

// Confirmation type icons and colors
const CONFIRM_ICONS = {
    info: { icon: faInfoCircle, color: '#1890ff' },
    success: { icon: faCheckCircle, color: '#52c41a' },
    error: { icon: faTimesCircle, color: '#ff4d4f' },
    warning: { icon: faExclamationTriangle, color: '#faad14' },
    confirm: { icon: faExclamationTriangle, color: '#faad14' }
};

let globalZIndex = 1000;

const Modal = forwardRef<ModalComponentRef, ModalProps>(({
    // Content
    title,
    children,

    // Visibility & State
    open = false,
    visible, // Support deprecated prop
    loading = false,

    // Event Handlers
    onOk,
    onCancel,
    afterClose,
    afterOpenChange,
    beforeClose,

    // Button Configuration
    okText = 'OK',
    cancelText = 'Cancel',
    okType = 'primary',
    okButtonProps = {},
    cancelButtonProps = {},
    confirmLoading = false,

    // Layout & Positioning
    centered = false,
    width,
    height,
    size = 'default',
    position,

    // Behavior
    closable = true,
    keyboard = true,
    mask = true,
    maskClosable = true,
    destroyOnClose = false,
    forceRender = false,
    focusTriggerAfterClose = true,
    draggable = false,
    resizable = false,

    // Styling
    className = '',
    style = {},
    classNames = {},
    styles = {},
    zIndex,
    animationType = 'zoom',
    theme,

    // Header
    closeIcon = faTimes,

    // Footer
    footer,

    // Advanced
    getContainer,
    modalRender,

    // Accessibility
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    role = 'dialog',

    // Enhanced Features
    loadingTip = 'Loading...',
    autoFocus = true,
    restoreFocus = true,
    onEscape,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,

    // Confirmation Features
    confirmText,
    confirmType,

    // Custom Events
    onKeyDown,
    onMouseDown,
    onOpenStart,
    onCloseStart,

    // Animation
    transitionName,
    maskTransitionName,

    ...restProps
}, ref) => {
    // State
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    // Refs
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);
    const currentZIndex = useRef(zIndex || ++globalZIndex);

    // State management
    const isVisible = useMemo(() => open ?? visible ?? false, [open, visible]);

    // Calculate modal styles with enhanced features
    const modalStyles = useMemo(() => {
        const sizeConfig = SIZE_CONFIG[size];
        let baseStyles: React.CSSProperties = {
            width: width ?? sizeConfig.width,
            minHeight: height ?? sizeConfig.minHeight,
            maxWidth: maxWidth ?? sizeConfig.maxWidth,
            maxHeight: maxHeight ?? '90vh',
            minWidth: minWidth ?? '320px',
            ...style
        };

        // Apply custom positioning
        if (position) {
            baseStyles = { ...baseStyles, ...position };
        }

        // Apply drag position
        if (draggable && (dragPosition.x !== 0 || dragPosition.y !== 0)) {
            baseStyles.transform = `translate(${dragPosition.x}px, ${dragPosition.y}px)`;
        }

        // Apply fullscreen
        if (isFullscreen) {
            baseStyles = {
                ...baseStyles,
                width: '100vw',
                height: '100vh',
                maxWidth: 'none',
                maxHeight: 'none',
                top: 0,
                left: 0,
                transform: 'none'
            };
        }

        // Apply theme
        if (theme) {
            baseStyles.backgroundColor = theme.backgroundColor;
            baseStyles.color = theme.textColor;
            baseStyles.borderRadius = theme.borderRadius;
            baseStyles.boxShadow = theme.boxShadow;
        }

        return baseStyles;
    }, [size, width, height, style, position, dragPosition, isFullscreen, theme, maxWidth, maxHeight, minWidth, minHeight]);

    // Modal class names with enhanced features
    const modalClassNames = useMemo(() => {
        const baseClass = 'ant-modal';
        const classes = [baseClass];

        if (className) classes.push(className);
        if (size !== 'default') classes.push(`${baseClass}-${size}`);
        if (animationType !== 'zoom') classes.push(`${baseClass}-${animationType}`);
        if (draggable) classes.push(`${baseClass}-draggable`);
        if (resizable) classes.push(`${baseClass}-resizable`);
        if (isFullscreen) classes.push(`${baseClass}-fullscreen`);
        if (isDragging) classes.push(`${baseClass}-dragging`);
        if (confirmType) classes.push(`${baseClass}-confirm`, `${baseClass}-confirm-${confirmType}`);

        return classes.join(' ');
    }, [className, size, animationType, draggable, resizable, isFullscreen, isDragging, confirmType]);

    // Container management
    const getModalContainer = useCallback(() => {
        if (getContainer) {
            const container = getContainer();
            return container === false ? document.body : container;
        }
        return document.body;
    }, [getContainer]);

    // Focus management with enhanced features
    useEffect(() => {
        if (isVisible) {
            if (onOpenStart) onOpenStart();
            previousActiveElement.current = document.activeElement as HTMLElement;

            // Auto focus
            if (autoFocus) {
                setTimeout(() => {
                    const focusableElements = modalRef.current?.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusableElements && focusableElements.length > 0) {
                        (focusableElements[0] as HTMLElement).focus();
                    } else {
                        modalRef.current?.focus();
                    }
                }, 100);
            }
        } else {
            if (onCloseStart) onCloseStart();

            // Restore focus
            if (restoreFocus && focusTriggerAfterClose && previousActiveElement.current) {
                previousActiveElement.current.focus();
            }

            // Reset states
            setIsFullscreen(false);
            setDragPosition({ x: 0, y: 0 });

            if (afterClose) {
                setTimeout(afterClose, 300); // Wait for animation
            }
        }
    }, [isVisible, afterClose, focusTriggerAfterClose, autoFocus, restoreFocus, onOpenStart, onCloseStart]);

    // Visibility change callback
    useEffect(() => {
        if (afterOpenChange) {
            afterOpenChange(isVisible);
        }
    }, [isVisible, afterOpenChange]);

    // Body scroll management
    useLayoutEffect(() => {
        if (isVisible) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isVisible]);

    // Enhanced keyboard event handling
    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (onKeyDown) {
            onKeyDown(event);
        }

        if (!keyboard && event.key !== 'Tab') return;

        switch (event.key) {
            case 'Escape':
                if (onEscape) {
                    onEscape();
                } else if (closable && maskClosable) {
                    handleCancel(event as any);
                }
                break;
            case 'F11':
                if (resizable) {
                    event.preventDefault();
                    setIsFullscreen(prev => !prev);
                }
                break;
            case 'Tab':
                // Enhanced focus trap
                const focusableElements = modalRef.current?.querySelectorAll(
                    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
                );
                if (focusableElements && focusableElements.length > 0) {
                    const firstElement = focusableElements[0] as HTMLElement;
                    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                    if (event.shiftKey && document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    } else if (!event.shiftKey && document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
                break;
        }
    }, [onKeyDown, keyboard, closable, maskClosable, onEscape, resizable]);

    // Event handlers with enhanced functionality
    const handleCancel = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
        // Check beforeClose callback
        if (beforeClose) {
            const shouldClose = await beforeClose();
            if (!shouldClose) return;
        }

        if (onCancel) {
            onCancel(event);
        }
    }, [onCancel, beforeClose]);

    const handleOk = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
        if (onOk) {
            try {
                const result = onOk(event);
                if (result instanceof Promise) {
                    await result;
                }
            } catch (error) {
                console.error('Modal onOk error:', error);
            }
        }
    }, [onOk]);

    const handleMaskClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        // Enhanced click outside detection
        const target = event.target as HTMLElement;
        const currentTarget = event.currentTarget as HTMLElement;

        // Check if click was on mask/wrapper and not on modal content
        if ((target === currentTarget ||
            target.classList.contains('ant-modal-wrap') ||
            target.classList.contains('ant-modal-mask')) &&
            maskClosable && closable) {
            handleCancel(event as any);
        }
    }, [maskClosable, closable, handleCancel]);

    // Drag functionality
    const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (onMouseDown) {
            onMouseDown(event);
        }

        if (!draggable || isFullscreen) return;

        const header = (event.target as HTMLElement).closest('.ant-modal-header');
        if (!header) return;

        setIsDragging(true);
        const startX = event.clientX - dragPosition.x;
        const startY = event.clientY - dragPosition.y;

        const handleMouseMove = (e: MouseEvent) => {
            setDragPosition({
                x: e.clientX - startX,
                y: e.clientY - startY
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove as any);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove as any);
        document.addEventListener('mouseup', handleMouseUp);
    }, [onMouseDown, draggable, isFullscreen, dragPosition]);

    // Imperative handle for ref
    useImperativeHandle(ref, () => ({
        destroy: () => {
            if (onCancel) {
                onCancel({} as MouseEvent<HTMLButtonElement>);
            }
        },
        update: (config) => {
            console.log('Update config:', config);
        },
        getElement: () => modalRef.current,
        focus: () => modalRef.current?.focus(),
        blur: () => modalRef.current?.blur()
    }), [onCancel]);

    // Render close icon with fullscreen toggle
    const renderCloseIcon = () => {
        if (!closable) return null;

        return (
            <div className="ant-modal-close-group">
                {resizable && (
                    <button
                        className="ant-modal-fullscreen"
                        onClick={() => setIsFullscreen(prev => !prev)}
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        type="button"
                    >
                        <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
                    </button>
                )}
                <button
                    className="ant-modal-close"
                    onClick={handleCancel}
                    aria-label="Close"
                    type="button"
                >
                    <span className="ant-modal-close-x">
                        {React.isValidElement(closeIcon) ? closeIcon : <FontAwesomeIcon icon={closeIcon as any} className="ant-modal-close-icon" />}
                    </span>
                </button>
            </div>
        );
    };

    // Render confirmation icon
    const renderConfirmIcon = () => {
        if (!confirmType) return null;

        const config = CONFIRM_ICONS[confirmType];
        return (
            <div className={`ant-modal-confirm-icon ant-modal-confirm-${confirmType}`} style={{ color: config.color }}>
                <FontAwesomeIcon icon={config.icon} />
            </div>
        );
    };

    // Enhanced footer rendering
    const renderFooter = () => {
        if (footer === null) return null;

        if (footer !== undefined) {
            return (
                <div className={`ant-modal-footer ${classNames.footer || ''}`} style={styles.footer}>
                    {footer}
                </div>
            );
        }

        if (!onOk && !onCancel) return null;

        return (
            <div className={`ant-modal-footer ${classNames.footer || ''}`} style={styles.footer}>
                {onCancel && (
                    <button
                        {...cancelButtonProps}
                        className={`ant-btn ant-btn-${cancelButtonProps.type || 'default'} ${cancelButtonProps.className || ''}`}
                        onClick={handleCancel}
                        type="button"
                        disabled={cancelButtonProps.disabled}
                    >
                        {cancelButtonProps.loading && (
                            <span className="ant-btn-loading-icon">
                                <span className="ant-spin ant-spin-spinning">
                                    <span className="ant-spin-dot ant-spin-dot-spin">
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                    </span>
                                </span>
                            </span>
                        )}
                        <span>{cancelText}</span>
                    </button>
                )}
                {onOk && (
                    <button
                        {...okButtonProps}
                        className={`ant-btn ant-btn-${okType} ${okButtonProps.className || ''}`}
                        onClick={handleOk}
                        disabled={confirmLoading || okButtonProps.disabled}
                        type="button"
                    >
                        {(confirmLoading || okButtonProps.loading) && (
                            <span className="ant-btn-loading-icon">
                                <span className="ant-spin ant-spin-spinning">
                                    <span className="ant-spin-dot ant-spin-dot-spin">
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                    </span>
                                </span>
                            </span>
                        )}
                        <span>{okText}</span>
                    </button>
                )}
            </div>
        );
    };

    // Enhanced modal content rendering
    const renderModalContent = () => {
        const content = (
            <div
                ref={modalRef}
                className={modalClassNames}
                style={modalStyles}
                role={role}
                aria-modal="true"
                aria-labelledby={ariaLabelledby || (title ? 'modal-title' : undefined)}
                aria-describedby={ariaDescribedby}
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                onMouseDown={handleMouseDown}
                {...restProps}
            >
                <div className={`ant-modal-content ${classNames.content || ''}`} style={styles.content}>
                    {/* Header */}
                    {(title || closable || confirmType) && (
                        <div className={`ant-modal-header ${classNames.header || ''}`} style={styles.header}>
                            <div className="ant-modal-header-content">
                                {confirmType && renderConfirmIcon()}
                                {title && (
                                    <div className="ant-modal-title" id="modal-title">
                                        {title}
                                    </div>
                                )}
                            </div>
                            {renderCloseIcon()}
                        </div>
                    )}

                    {/* Body */}
                    <div className={`ant-modal-body ${classNames.body || ''}`} style={styles.body}>
                        {loading ? (
                            <div className="ant-modal-loading-content">
                                <div className="ant-spin ant-spin-spinning ant-spin-lg">
                                    <span className="ant-spin-dot ant-spin-dot-spin">
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                        <i className="ant-spin-dot-item"></i>
                                    </span>
                                </div>
                                {loadingTip && <div className="ant-modal-loading-tip">{loadingTip}</div>}
                            </div>
                        ) : (
                            <>
                                {confirmText && (
                                    <div className="ant-modal-confirm-content">{confirmText}</div>
                                )}
                                {children}
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    {renderFooter()}

                    {/* Resize handle */}
                    {resizable && !isFullscreen && (
                        <div className="ant-modal-resize-handle" />
                    )}
                </div>
            </div>
        );

        return modalRender ? modalRender(content) : content;
    };

    // Don't render if not visible and not forced
    if (!isVisible && !forceRender) {
        return null;
    }

    const modalElement = (
        <>
            {/* Mask - Enhanced overlay */}
            {mask && (
                <div
                    className={`ant-modal-mask ${maskTransitionName || ''} ${classNames.mask || ''}`}
                    style={{ zIndex: currentZIndex.current, ...styles.mask }}
                    onClick={handleMaskClick}
                />
            )}

            {/* Wrapper - Enhanced container */}
            <div
                className={`ant-modal-wrap ${centered ? 'ant-modal-centered' : ''} ${transitionName || ''} ${classNames.wrapper || ''}`}
                style={{ zIndex: currentZIndex.current + 1, ...styles.wrapper }}
                onClick={handleMaskClick}
            >
                {renderModalContent()}
            </div>
        </>
    );

    // Handle portal rendering
    const container = getModalContainer();
    if (container && container !== document.body) {
        return ReactDOM.createPortal(modalElement, container);
    }

    return modalElement;
});

Modal.displayName = 'Modal';

export default Modal;