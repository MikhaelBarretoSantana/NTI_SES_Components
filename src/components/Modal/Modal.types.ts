import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { CSSProperties, ReactNode, MouseEvent, KeyboardEvent, HTMLAttributes } from "react";

/**
 * Button configuration interface for modal buttons
 */
export interface ModalButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
    key?: string;
    type?: 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'danger';
    size?: 'large' | 'middle' | 'small';
    loading?: boolean;
    disabled?: boolean;
    danger?: boolean;
    ghost?: boolean;
    shape?: 'default' | 'circle' | 'round';
    icon?: ReactNode;
    children?: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    href?: string;
    target?: string;
    htmlType?: 'button' | 'submit' | 'reset';
}

/**
 * Class names configuration for different parts of the modal
 */
export interface ModalClassNames {
    /** Header class name */
    header?: string;
    /** Body class name */
    body?: string;
    /** Footer class name */
    footer?: string;
    /** Mask (overlay) class name */
    mask?: string;
    /** Wrapper class name */
    wrapper?: string;
    /** Content class name */
    content?: string;
}

/**
 * Styles configuration for different parts of the modal
 */
export interface ModalStyles {
    /** Header styles */
    header?: CSSProperties;
    /** Body styles */
    body?: CSSProperties;
    /** Footer styles */
    footer?: CSSProperties;
    /** Mask (overlay) styles */
    mask?: CSSProperties;
    /** Wrapper styles */
    wrapper?: CSSProperties;
    /** Content styles */
    content?: CSSProperties;
}

/**
 * Size presets for the modal
 */
export type ModalSize = 'small' | 'default' | 'large' | 'extra-large';

/**
 * Animation types for modal appearance
 */
export type ModalAnimationType = 'fade' | 'zoom' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

/**
 * Position configuration for custom modal positioning
 */
export interface ModalPosition {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
}

/**
 * Theme configuration for the modal
 */
export interface ModalTheme {
    /** Primary color */
    primaryColor?: string;
    /** Background color */
    backgroundColor?: string;
    /** Text color */
    textColor?: string;
    /** Border radius */
    borderRadius?: number | string;
    /** Shadow configuration */
    boxShadow?: string;
}

/**
 * Main Modal props interface
 */
export interface ModalProps {
    // ===== CONTENT =====
    /** Modal title */
    title?: ReactNode;
    /** Modal content */
    children?: ReactNode;

    // ===== VISIBILITY & STATE =====
    /** Whether the modal is visible (new prop name) */
    open?: boolean;
    /** @deprecated Use 'open' instead. Whether the modal is visible */
    visible?: boolean;
    /** Whether the modal is in loading state */
    loading?: boolean;

    // ===== EVENT HANDLERS =====
    /** Callback when OK button is clicked */
    onOk?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    /** Callback when Cancel button is clicked or modal is closed */
    onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
    /** Callback after modal is completely closed */
    afterClose?: () => void;
    /** Callback when open state changes */
    afterOpenChange?: (open: boolean) => void;
    /** Callback before close (can prevent closing by returning false) */
    beforeClose?: () => boolean | Promise<boolean>;

    // ===== BUTTON CONFIGURATION =====
    /** Text for OK button */
    okText?: ReactNode;
    /** Text for Cancel button */
    cancelText?: ReactNode;
    /** Type of OK button */
    okType?: 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'danger';
    /** Properties for OK button */
    okButtonProps?: Partial<ModalButtonProps>;
    /** Properties for Cancel button */
    cancelButtonProps?: Partial<ModalButtonProps>;
    /** Whether OK button is in loading state */
    confirmLoading?: boolean;

    // ===== LAYOUT & POSITIONING =====
    /** Whether modal is vertically centered */
    centered?: boolean;
    /** Width of modal */
    width?: string | number;
    /** Height of modal */
    height?: string | number;
    /** Preset size for modal */
    size?: ModalSize;
    /** Custom position configuration */
    position?: ModalPosition;

    // ===== BEHAVIOR =====
    /** Whether modal can be closed via close button */
    closable?: boolean;
    /** Whether modal can be closed via ESC key */
    keyboard?: boolean;
    /** Whether to show mask (overlay) */
    mask?: boolean;
    /** Whether modal can be closed by clicking mask */
    maskClosable?: boolean;
    /** Whether to destroy modal content when closed */
    destroyOnClose?: boolean;
    /** Whether to render modal even when not visible */
    forceRender?: boolean;
    /** Whether to focus trigger element after close */
    focusTriggerAfterClose?: boolean;
    /** Whether modal can be dragged */
    draggable?: boolean;
    /** Whether modal can be resized */
    resizable?: boolean;

    // ===== STYLING =====
    /** Additional class name for modal */
    className?: string;
    /** Inline styles for modal */
    style?: CSSProperties;
    /** Class names for different parts */
    classNames?: ModalClassNames;
    /** Styles for different parts */
    styles?: ModalStyles;
    /** z-index of modal */
    zIndex?: number;
    /** Animation type */
    animationType?: ModalAnimationType;
    /** Theme configuration */
    theme?: ModalTheme;

    // ===== HEADER =====
    /** Custom close icon */
    closeIcon?: ReactNode | IconDefinition;

    // ===== FOOTER =====
    /** Custom footer content (null to hide footer) */
    footer?: ReactNode | null;

    // ===== ADVANCED =====
    /** Function to get container element */
    getContainer?: () => HTMLElement | false;
    /** Function to customize modal rendering */
    modalRender?: (node: ReactNode) => ReactNode;

    // ===== ACCESSIBILITY =====
    /** ARIA labelledby attribute */
    'aria-labelledby'?: string;
    /** ARIA describedby attribute */
    'aria-describedby'?: string;
    /** Role attribute */
    role?: string;

    // ===== ANIMATION =====
    /** Custom transition name for modal */
    transitionName?: string;
    /** Custom transition name for mask */
    maskTransitionName?: string;

    // ===== ENHANCED FEATURES =====
    /** Custom loading tip text */
    loadingTip?: ReactNode;
    /** Whether to auto-focus first focusable element */
    autoFocus?: boolean;
    /** Whether to restore focus after close */
    restoreFocus?: boolean;
    /** Custom escape key handler */
    onEscape?: () => void;
    /** Maximum width of modal */
    maxWidth?: string | number;
    /** Maximum height of modal */
    maxHeight?: string | number;
    /** Minimum width of modal */
    minWidth?: string | number;
    /** Minimum height of modal */
    minHeight?: string | number;

    // ===== CONFIRMATION FEATURES =====
    /** Confirmation text (shows icon based on type) */
    confirmText?: ReactNode;
    /** Type of confirmation modal */
    confirmType?: 'info' | 'success' | 'error' | 'warning' | 'confirm';

    // ===== CUSTOM EVENTS =====
    /** Custom keydown handler */
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    /** Custom mousedown handler */
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
    /** Callback when modal starts opening */
    onOpenStart?: () => void;
    /** Callback when modal starts closing */
    onCloseStart?: () => void;
}

/**
 * Configuration for programmatic modal usage (Modal.confirm, etc.)
 */
export interface ModalConfigProps extends Omit<ModalProps, 'open' | 'visible'> {
    /** Main content of the modal */
    content?: ReactNode;
    /** Icon to display */
    icon?: ReactNode;
    /** Whether to show Cancel button */
    okCancel?: boolean;
    /** Which button to auto-focus */
    autoFocusButton?: null | 'ok' | 'cancel';
    /** Custom button configuration */
    buttons?: ModalButtonProps[];
}

/**
 * Return type for programmatic modals
 */
export interface ModalRef {
    /** Close/destroy the modal */
    destroy: () => void;
    /** Update modal configuration */
    update: (config: Partial<ModalConfigProps>) => void;
    /** Get current modal element */
    getElement: () => HTMLElement | null;
}

/**
 * Hook return type for useModal
 */
export interface ModalHookReturnType {
    /** Show info modal */
    info: (config: ModalConfigProps) => ModalRef;
    /** Show success modal */
    success: (config: ModalConfigProps) => ModalRef;
    /** Show error modal */
    error: (config: ModalConfigProps) => ModalRef;
    /** Show warning modal */
    warning: (config: ModalConfigProps) => ModalRef;
    /** Show confirm modal */
    confirm: (config: ModalConfigProps) => ModalRef;
    /** Context holder element */
    contextHolder: ReactNode;
}

/**
 * Extended props with additional features
 * @deprecated Use ModalProps instead
 */
export interface ExtendedModalProps extends ModalProps { }

/**
 * Modal component ref interface
 */
export interface ModalComponentRef extends ModalRef {
    /** Focus the modal */
    focus: () => void;
    /** Blur the modal */
    blur: () => void;
}

/**
 * Preset configurations for common modal types
 */
export interface ModalPresets {
    /** Confirmation dialog preset */
    confirmation: Partial<ModalProps>;
    /** Form modal preset */
    form: Partial<ModalProps>;
    /** Info modal preset */
    info: Partial<ModalProps>;
    /** Full screen modal preset */
    fullscreen: Partial<ModalProps>;
}