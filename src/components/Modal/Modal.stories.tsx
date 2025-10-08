import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    faHeart,
    faTrash,
    faInfoCircle,
    faCheckCircle,
    faExclamationTriangle,
    faUser,
    faCog,
    faDownload
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import React from 'react';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Um componente Modal poderoso baseado no Ant Design com recursos aprimorados como arrastar, redimensionar, múltiplos tamanhos e vários tipos de animação.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        // Visibility & State
        open: {
            control: 'boolean',
            description: 'Controls whether the modal is open or closed',
            table: { category: 'Visibility & State' }
        },
        loading: {
            control: 'boolean',
            description: 'Shows loading state in modal content',
            table: { category: 'Visibility & State' }
        },

        // Content
        title: {
            control: 'text',
            description: 'Title of the modal',
            table: { category: 'Content' }
        },
        loadingTip: {
            control: 'text',
            description: 'Custom loading message',
            table: { category: 'Content' }
        },

        // Layout & Positioning
        centered: {
            control: 'boolean',
            description: 'Centers the modal vertically on screen',
            table: { category: 'Layout & Positioning' }
        },
        size: {
            control: 'select',
            options: ['small', 'default', 'large', 'extra-large'],
            description: 'Preset size for the modal',
            table: { category: 'Layout & Positioning' }
        },
        width: {
            control: 'text',
            description: 'Custom width for the modal',
            table: { category: 'Layout & Positioning' }
        },

        // Behavior
        closable: {
            control: 'boolean',
            description: 'Allows closing the modal by clicking X',
            table: { category: 'Behavior' }
        },
        keyboard: {
            control: 'boolean',
            description: 'Allows closing modal with ESC key',
            table: { category: 'Behavior' }
        },
        maskClosable: {
            control: 'boolean',
            description: 'Allows closing modal by clicking the overlay',
            table: { category: 'Behavior' }
        },
        draggable: {
            control: 'boolean',
            description: 'Makes the modal draggable',
            table: { category: 'Behavior' }
        },
        resizable: {
            control: 'boolean',
            description: 'Makes the modal resizable',
            table: { category: 'Behavior' }
        },
        destroyOnClose: {
            control: 'boolean',
            description: 'Destroys modal content when closed',
            table: { category: 'Behavior' }
        },

        // Button Configuration
        okText: {
            control: 'text',
            description: 'Text for the OK button',
            table: { category: 'Button Configuration' }
        },
        cancelText: {
            control: 'text',
            description: 'Text for the Cancel button',
            table: { category: 'Button Configuration' }
        },
        okType: {
            control: 'select',
            options: ['primary', 'default', 'danger', 'dashed', 'text', 'link'],
            description: 'Type of the OK button',
            table: { category: 'Button Configuration' }
        },
        confirmLoading: {
            control: 'boolean',
            description: 'Shows loading state on confirmation button',
            table: { category: 'Button Configuration' }
        },

        // Styling
        animationType: {
            control: 'select',
            options: ['fade', 'zoom', 'slide-up', 'slide-down', 'slide-left', 'slide-right'],
            description: 'Animation type for modal appearance',
            table: { category: 'Styling' }
        },
        zIndex: {
            control: 'number',
            description: 'z-index of the modal',
            table: { category: 'Styling' }
        },

        // Confirmation Features
        confirmType: {
            control: 'select',
            options: ['info', 'success', 'error', 'warning', 'confirm'],
            description: 'Type of confirmation modal with icon',
            table: { category: 'Confirmation Features' }
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ===== TEMPLATES =====

// Basic template for controlling modal state
const ModalTemplate = (args: any) => {
    const [isOpen, setIsOpen] = useState(args.open || false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                Open Modal
            </button>

            <Modal
                {...args}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                onOk={() => {
                    console.log('OK clicked');
                    setIsOpen(false);
                }}
            >
                {args.children}
            </Modal>
        </div>
    );
};

// Loading modal template (like Ant Design example)
const LoadingModalTemplate = (args: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showModal = () => {
        setIsOpen(true);
        setIsLoading(true);

        // Simulate loading like Ant Design example
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div>
            <button
                onClick={showModal}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                Open Loading Modal
            </button>

            <Modal
                {...args}
                open={isOpen}
                loading={isLoading}
                onCancel={() => {
                    setIsOpen(false);
                    setIsLoading(false);
                }}
                onOk={() => {
                    console.log('OK clicked');
                    setIsOpen(false);
                    setIsLoading(false);
                }}
            >
                {args.children}
            </Modal>
        </div>
    );
};

// Async operation template
const AsyncModalTemplate = (args: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = async () => {
        setConfirmLoading(true);

        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 2000));

        setConfirmLoading(false);
        setIsOpen(false);
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                Open Async Modal
            </button>

            <Modal
                {...args}
                open={isOpen}
                confirmLoading={confirmLoading}
                onCancel={() => setIsOpen(false)}
                onOk={handleOk}
            >
                {args.children}
            </Modal>
        </div>
    );
};

// ===== BASIC EXAMPLES =====

export const Default: Story = {
    render: ModalTemplate,
    args: {
        title: 'Basic Modal',
        children: (
            <div>
                <p>This is a basic modal with title and action buttons.</p>
                <p>You can close it by clicking the X, Cancel button, pressing ESC, or clicking outside the modal.</p>
            </div>
        ),
    },
};

export const Centered: Story = {
    render: ModalTemplate,
    args: {
        title: 'Centered Modal',
        centered: true,
        children: (
            <div>
                <p>This modal is vertically centered on the screen.</p>
                <p>Perfect for simple confirmations or short content.</p>
            </div>
        ),
    },
};

// ===== SIZE VARIANTS =====

export const SmallSize: Story = {
    render: ModalTemplate,
    args: {
        title: 'Small Modal',
        size: 'small',
        centered: true,
        children: (
            <div>
                <p>Small modal (416px width)</p>
                <p>Perfect for simple confirmations</p>
            </div>
        ),
    },
};

export const LargeSize: Story = {
    render: ModalTemplate,
    args: {
        title: 'Large Modal',
        size: 'large',
        children: (
            <div>
                <h4 style={{ marginTop: 0 }}>Large Modal Content</h4>
                <p>Large modal (880px width) with more space for complex content.</p>
                <div style={{
                    height: '200px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    padding: '20px',
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <p style={{ margin: 0, textAlign: 'center' }}>Large content area</p>
                </div>
            </div>
        ),
    },
};

export const ExtraLargeSize: Story = {
    render: ModalTemplate,
    args: {
        title: 'Extra Large Modal',
        size: 'extra-large',
        children: (
            <div>
                <h4 style={{ marginTop: 0 }}>Extra Large Modal</h4>
                <p>Extra large modal (1200px width) for complex dashboards or detailed forms.</p>
                <div style={{
                    height: '400px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    padding: '20px',
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <p style={{ margin: 0, textAlign: 'center' }}>Extra large content area</p>
                </div>
            </div>
        ),
    },
};

// ===== ANIMATION VARIANTS =====

export const FadeAnimation: Story = {
    render: ModalTemplate,
    args: {
        title: 'Fade Animation',
        animationType: 'fade',
        children: (
            <p>This modal fades in smoothly when opened.</p>
        ),
    },
};

export const SlideUpAnimation: Story = {
    render: ModalTemplate,
    args: {
        title: 'Slide Up Animation',
        animationType: 'slide-up',
        children: (
            <p>This modal slides up from the bottom when opened.</p>
        ),
    },
};

export const SlideDownAnimation: Story = {
    render: ModalTemplate,
    args: {
        title: 'Slide Down Animation',
        animationType: 'slide-down',
        children: (
            <p>This modal slides down from the top when opened.</p>
        ),
    },
};

// ===== INTERACTIVE FEATURES =====

export const DraggableModal: Story = {
    render: ModalTemplate,
    args: {
        title: 'Draggable Modal',
        draggable: true,
        children: (
            <div>
                <p>🎯 This modal can be dragged around!</p>
                <p>Click and drag the header to move it.</p>
                <p>Very useful for multi-modal workflows.</p>
            </div>
        ),
    },
};

export const ResizableModal: Story = {
    render: ModalTemplate,
    args: {
        title: 'Resizable Modal',
        resizable: true,
        children: (
            <div>
                <p>📏 This modal can be resized!</p>
                <p>Look for the resize handle in the bottom-right corner.</p>
                <p>You can also press F11 to toggle fullscreen.</p>
                <div style={{
                    height: '150px',
                    background: '#f0f2f5',
                    borderRadius: '4px',
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <p style={{ margin: 0 }}>Resize me!</p>
                </div>
            </div>
        ),
    },
};

export const DraggableAndResizable: Story = {
    render: ModalTemplate,
    args: {
        title: 'Draggable & Resizable Modal',
        draggable: true,
        resizable: true,
        children: (
            <div>
                <p>🎯📏 This modal has both drag and resize capabilities!</p>
                <p>Drag from the header, resize from the corner, or press F11 for fullscreen.</p>
            </div>
        ),
    },
};

// ===== CLICK OUTSIDE BEHAVIOR =====

export const ClickOutsideToClose: Story = {
    render: ModalTemplate,
    args: {
        title: 'Click Outside to Close',
        maskClosable: true,
        children: (
            <div>
                <p>✅ This modal can be closed by clicking outside of it.</p>
                <p>Try clicking on the dark overlay around this modal!</p>
                <p>This is the default behavior.</p>
            </div>
        ),
    },
};

export const NoClickOutsideClose: Story = {
    render: ModalTemplate,
    args: {
        title: 'Cannot Click Outside to Close',
        maskClosable: false,
        children: (
            <div>
                <p>❌ This modal CANNOT be closed by clicking outside.</p>
                <p>You must use the X button, Cancel button, or ESC key.</p>
                <p>Try clicking on the dark area - nothing will happen!</p>
            </div>
        ),
    },
};

export const CompletelyNonClosable: Story = {
    render: ModalTemplate,
    args: {
        title: 'Completely Non-Closable Modal',
        closable: false,
        keyboard: false,
        maskClosable: false,
        children: (
            <div>
                <p>🔒 This modal cannot be closed by any means:</p>
                <ul style={{ paddingLeft: '20px' }}>
                    <li>No X button (closable=false)</li>
                    <li>No ESC key (keyboard=false)</li>
                    <li>No clicking outside (maskClosable=false)</li>
                </ul>
                <p>Only the footer buttons can close it.</p>
            </div>
        ),
    },
};

// ===== LOADING STATES =====

export const AntDesignLoading: Story = {
    render: LoadingModalTemplate,
    args: {
        title: 'Loading Modal (Ant Design Style)',
        loadingTip: 'Please wait while we process your request...',
        children: (
            <div>
                <p>This modal shows loading state for 2 seconds when opened.</p>
                <p>This replicates the exact Ant Design loading modal behavior.</p>
            </div>
        ),
    },
};

export const LoadingContent: Story = {
    render: ModalTemplate,
    args: {
        title: 'Loading Data',
        loading: true,
        centered: true,
        loadingTip: 'Fetching data from server...',
    },
};

export const AsyncConfirmation: Story = {
    render: AsyncModalTemplate,
    args: {
        title: 'Async Operation',
        okText: 'Save',
        cancelText: 'Cancel',
        children: (
            <div>
                <p>Click "Save" to see the async loading state on the button.</p>
                <p>The operation will take 2 seconds to complete.</p>
            </div>
        ),
    },
};

// ===== CONFIRMATION DIALOGS =====

export const InfoConfirmation: Story = {
    render: ModalTemplate,
    args: {
        title: 'Information',
        okText: 'Got it',
        centered: true,
        confirmType: 'info',
        confirmText: 'This is some important information you should know about.',
        children: (
            <p style={{ margin: 0 }}>
                Additional details can be provided here.
            </p>
        ),
    },
};

export const SuccessConfirmation: Story = {
    render: ModalTemplate,
    args: {
        title: 'Success',
        okText: 'Continue',
        centered: true,
        confirmType: 'success',
        confirmText: 'Your operation was completed successfully!',
        onCancel: undefined,
    },
};

export const ErrorConfirmation: Story = {
    render: ModalTemplate,
    args: {
        title: 'Error',
        okText: 'Try Again',
        cancelText: 'Cancel',
        okType: 'danger',
        centered: true,
        confirmType: 'error',
        confirmText: 'Something went wrong with your request.',
        children: (
            <p style={{ margin: 0, fontSize: '14px' }}>
                Please check your connection and try again.
            </p>
        ),
    },
};

export const WarningConfirmation: Story = {
    render: ModalTemplate,
    args: {
        title: 'Warning',
        okText: 'Proceed',
        cancelText: 'Cancel',
        okType: 'danger',
        centered: true,
        confirmType: 'warning',
        confirmText: 'This action may have consequences. Are you sure?',
        children: (
            <p style={{ margin: 0, fontSize: '14px', color: '#faad14' }}>
                Please review your decision carefully.
            </p>
        ),
    },
};

export const DeleteConfirmation: Story = {
    render: ModalTemplate,
    args: {
        title: 'Confirm Delete',
        okText: 'Yes, delete',
        cancelText: 'Cancel',
        okType: 'danger',
        centered: true,
        confirmType: 'confirm',
        confirmText: 'Are you sure you want to delete this item?',
        children: (
            <p style={{ color: '#ff4d4f', fontSize: '14px', margin: 0 }}>
                This action cannot be undone.
            </p>
        ),
    },
};

// ===== CUSTOM BUTTONS =====

export const CustomButtons: Story = {
    render: ModalTemplate,
    args: {
        title: 'Custom Button Properties',
        okText: 'Save Changes',
        cancelText: 'Discard',
        okButtonProps: {
            size: 'large',
            type: 'primary',
        },
        cancelButtonProps: {
            size: 'large',
            type: 'dashed',
            danger: true,
        },
        children: (
            <div>
                <p>This modal demonstrates custom button properties.</p>
                <p>Both buttons are large size with different styles.</p>
            </div>
        ),
    },
};

export const ButtonTypes: Story = {
    render: ModalTemplate,
    args: {
        title: 'Button Type Variants',
        okText: 'Primary',
        okType: 'primary',
        footer: (
            <div style={{ textAlign: 'right' }}>
                <button style={{
                    marginRight: '8px',
                    padding: '4px 15px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    background: 'white',
                    borderStyle: 'dashed'
                }}>
                    Dashed
                </button>
                <button style={{
                    marginRight: '8px',
                    padding: '4px 15px',
                    border: 'none',
                    borderRadius: '6px',
                    background: 'transparent',
                    color: '#1890ff'
                }}>
                    Text
                </button>
                <button style={{
                    marginRight: '8px',
                    padding: '4px 15px',
                    border: '1px solid #ff4d4f',
                    borderRadius: '6px',
                    background: '#ff4d4f',
                    color: 'white'
                }}>
                    Danger
                </button>
                <button style={{
                    padding: '4px 15px',
                    border: '1px solid #1890ff',
                    borderRadius: '6px',
                    background: '#1890ff',
                    color: 'white'
                }}>
                    Primary
                </button>
            </div>
        ),
        children: (
            <div>
                <p>Showcase of different button types and styles available.</p>
            </div>
        ),
    },
};

// ===== FOOTER VARIANTS =====

export const NoFooter: Story = {
    render: ModalTemplate,
    args: {
        title: 'No Footer',
        footer: null,
        children: (
            <div>
                <p>This modal has no footer at all.</p>
                <p>Can only be closed via the X button or ESC key.</p>
            </div>
        ),
    },
};

export const CustomFooter: Story = {
    render: ModalTemplate,
    args: {
        title: 'Custom Footer Content',
        footer: (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 16px'
            }}>
                <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    Last saved: 2 minutes ago
                </div>
                <div>
                    <button style={{
                        marginRight: '8px',
                        padding: '4px 15px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '6px',
                        background: 'white'
                    }}>
                        Draft
                    </button>
                    <button style={{
                        padding: '4px 15px',
                        border: '1px solid #1890ff',
                        borderRadius: '6px',
                        background: '#1890ff',
                        color: 'white'
                    }}>
                        Publish
                    </button>
                </div>
            </div>
        ),
        children: (
            <div>
                <p>This modal has a completely custom footer.</p>
                <p>You can put any content in the footer area.</p>
            </div>
        ),
    },
};

// ===== CONTENT EXAMPLES =====

export const WithForm: Story = {
    render: ModalTemplate,
    args: {
        title: 'User Registration Form',
        okText: 'Register',
        cancelText: 'Cancel',
        width: 600,
        children: (
            <form>
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="fullName" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Full Name *
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        required
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d9d9d9',
                            borderRadius: '6px',
                            fontSize: '14px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d9d9d9',
                            borderRadius: '6px',
                            fontSize: '14px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="role" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Role
                    </label>
                    <select
                        id="role"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d9d9d9',
                            borderRadius: '6px',
                            fontSize: '14px',
                        }}
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Administrator</option>
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="bio" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        placeholder="Tell us about yourself"
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d9d9d9',
                            borderRadius: '6px',
                            fontSize: '14px',
                            resize: 'vertical'
                        }}
                    />
                </div>
            </form>
        ),
    },
};

export const LongContent: Story = {
    render: ModalTemplate,
    args: {
        title: 'Terms of Service',
        okText: 'I Agree',
        cancelText: 'Cancel',
        width: 700,
        children: (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <h4>1. Acceptance of Terms</h4>
                <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>

                <h4>2. Privacy Policy</h4>
                <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service.</p>

                <h4>3. User Responsibilities</h4>
                <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>

                <h4>4. Prohibited Uses</h4>
                <p>You may not use our service:</p>
                <ul>
                    <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                </ul>

                <h4>5. Service Modifications</h4>
                <p>We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.</p>

                <h4>6. Limitation of Liability</h4>
                <p>In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages.</p>

                <h4>7. Contact Information</h4>
                <p>If you have any questions about these Terms of Service, please contact us at support@example.com.</p>
            </div>
        ),
    },
};

// ===== ADVANCED EXAMPLES =====

export const CustomWidth: Story = {
    render: ModalTemplate,
    args: {
        title: 'Custom Width Modal',
        width: 800,
        children: (
            <div>
                <p>This modal has a custom width of 800px.</p>
                <p>You can set any width you need for your specific use case.</p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginTop: '20px'
                }}>
                    <div style={{ padding: '16px', background: '#f0f2f5', borderRadius: '4px' }}>
                        <h5 style={{ margin: '0 0 8px 0' }}>Left Column</h5>
                        <p style={{ margin: 0, fontSize: '14px' }}>Content in left column</p>
                    </div>
                    <div style={{ padding: '16px', background: '#f0f2f5', borderRadius: '4px' }}>
                        <h5 style={{ margin: '0 0 8px 0' }}>Right Column</h5>
                        <p style={{ margin: 0, fontSize: '14px' }}>Content in right column</p>
                    </div>
                </div>
            </div>
        ),
    },
};

export const WithoutHeader: Story = {
    render: ModalTemplate,
    args: {
        closable: false,
        centered: true,
        children: (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ margin: '0 0 16px 0' }}>Congratulations!</h3>
                <p style={{ margin: '0 0 24px 0' }}>Your account has been created successfully.</p>
                <button style={{
                    padding: '8px 24px',
                    backgroundColor: '#52c41a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}>
                    Get Started
                </button>
            </div>
        ),
    },
};

export const MultiStep: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [step, setStep] = useState(1);

        const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
        const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

        return (
            <div>
                <button
                    onClick={() => {
                        setIsOpen(true);
                        setStep(1);
                    }}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    Open Multi-Step Modal
                </button>

                <Modal
                    open={isOpen}
                    title={`Step ${step} of 3`}
                    onCancel={() => setIsOpen(false)}
                    footer={
                        <div style={{ textAlign: 'right' }}>
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    style={{
                                        marginRight: '8px',
                                        padding: '4px 15px',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '6px',
                                        background: 'white'
                                    }}
                                >
                                    Previous
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    marginRight: '8px',
                                    padding: '4px 15px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '6px',
                                    background: 'white'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={step === 3 ? () => setIsOpen(false) : nextStep}
                                style={{
                                    padding: '4px 15px',
                                    border: '1px solid #1890ff',
                                    borderRadius: '6px',
                                    background: '#1890ff',
                                    color: 'white'
                                }}
                            >
                                {step === 3 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    }
                >
                    <div>
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }}>
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        style={{
                                            width: '30%',
                                            height: '4px',
                                            backgroundColor: i <= step ? '#1890ff' : '#f0f0f0',
                                            borderRadius: '2px'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {step === 1 && (
                            <div>
                                <h4>Personal Information</h4>
                                <p>Please provide your basic information.</p>
                                <input
                                    placeholder="Full Name"
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '6px',
                                        marginBottom: '12px'
                                    }}
                                />
                                <input
                                    placeholder="Email"
                                    type="email"
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '6px'
                                    }}
                                />
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h4>Preferences</h4>
                                <p>Set your preferences and settings.</p>
                                <label style={{ display: 'block', marginBottom: '12px' }}>
                                    <input type="checkbox" style={{ marginRight: '8px' }} />
                                    Email notifications
                                </label>
                                <label style={{ display: 'block', marginBottom: '12px' }}>
                                    <input type="checkbox" style={{ marginRight: '8px' }} />
                                    SMS notifications
                                </label>
                                <label style={{ display: 'block' }}>
                                    <input type="checkbox" style={{ marginRight: '8px' }} />
                                    Marketing communications
                                </label>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h4>Review & Confirm</h4>
                                <p>Please review your information before submitting.</p>
                                <div style={{
                                    background: '#f0f2f5',
                                    padding: '16px',
                                    borderRadius: '4px'
                                }}>
                                    <p style={{ margin: '0 0 8px 0' }}><strong>Name:</strong> John Doe</p>
                                    <p style={{ margin: '0 0 8px 0' }}><strong>Email:</strong> john@example.com</p>
                                    <p style={{ margin: 0 }}><strong>Notifications:</strong> Email, SMS</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        );
    },
    args: {},
};