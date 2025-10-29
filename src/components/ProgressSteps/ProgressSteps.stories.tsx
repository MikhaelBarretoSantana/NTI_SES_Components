import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ProgressSteps from './ProgressSteps';
import { ProgressStepsProps, Step } from './ProgressSteps.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faFileAlt,
  faCheckCircle,
  faRocket,
  faCreditCard,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof ProgressSteps> = {
  title: 'Components/ProgressSteps',
  component: ProgressSteps,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible and customizable progress steps component with multiple variants, sizes, and orientations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Current active step (1-based index)',
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'outlined', 'filled'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the component',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    labelPosition: {
      control: 'select',
      options: ['bottom', 'right', 'hidden'],
      description: 'Position of step labels',
    },
    showCheckmarks: {
      control: 'boolean',
      description: 'Show checkmarks on completed steps',
    },
    showNumbers: {
      control: 'boolean',
      description: 'Show step numbers',
    },
    clickable: {
      control: 'boolean',
      description: 'Enable click on all steps',
    },
    showConnector: {
      control: 'boolean',
      description: 'Show connecting line between steps',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
    showDescription: {
      control: 'boolean',
      description: 'Show step descriptions',
    },
    allowStepNavigation: {
      control: 'boolean',
      description: 'Allow navigation to completed steps only',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps: Step[] = [
  { id: 1, label: 'Personal Info', description: 'Enter your details' },
  { id: 2, label: 'Documents', description: 'Upload files' },
  { id: 3, label: 'Review', description: 'Confirm information' },
  { id: 4, label: 'Complete', description: 'Finish process' },
];

const stepsWithIcons: Step[] = [
  {
    id: 1,
    label: 'Account',
    description: 'Create your account',
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    id: 2,
    label: 'Payment',
    description: 'Add payment method',
    icon: <FontAwesomeIcon icon={faCreditCard} />,
  },
  {
    id: 3,
    label: 'Security',
    description: 'Setup security',
    icon: <FontAwesomeIcon icon={faShieldAlt} />,
  },
  {
    id: 4,
    label: 'Done',
    description: 'All set!',
    icon: <FontAwesomeIcon icon={faRocket} />,
  },
];

// Default variant
export const Default: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    variant: 'default',
    size: 'medium',
    orientation: 'horizontal',
    showCheckmarks: true,
    showNumbers: true,
    animated: true,
  },
};

// Variants
export const Minimal: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    variant: 'minimal',
    size: 'medium',
  },
};

export const Outlined: Story = {
  args: {
    currentStep: 3,
    steps: defaultSteps,
    variant: 'outlined',
    size: 'medium',
  },
};

export const Filled: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    variant: 'filled',
    size: 'medium',
  },
};

// Sizes
export const Small: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    size: 'large',
  },
};

// Orientations
export const Vertical: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    orientation: 'vertical',
    labelPosition: 'right',
  },
};

export const VerticalMinimal: Story = {
  args: {
    currentStep: 3,
    steps: defaultSteps,
    orientation: 'vertical',
    variant: 'minimal',
    labelPosition: 'right',
  },
};

// With custom colors
export const CustomColors: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      completed: '#10b981',
      inactive: '#d1d5db',
      text: '#111827',
      inactiveText: '#9ca3af',
    },
  },
};

export const CustomColorsOutlined: Story = {
  args: {
    currentStep: 3,
    steps: defaultSteps,
    variant: 'outlined',
    colors: {
      primary: '#ef4444',
      completed: '#22c55e',
      inactive: '#e5e7eb',
    },
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    currentStep: 2,
    steps: stepsWithIcons,
    showNumbers: false,
  },
};

export const WithIconsMinimal: Story = {
  args: {
    currentStep: 3,
    steps: stepsWithIcons,
    variant: 'minimal',
    showNumbers: false,
    size: 'large',
  },
};

// With descriptions
export const WithDescriptions: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    showDescription: true,
  },
};

export const VerticalWithDescriptions: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    orientation: 'vertical',
    labelPosition: 'right',
    showDescription: true,
    size: 'large',
  },
};

// Without connector
export const WithoutConnector: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    showConnector: false,
  },
};

// Label positions
export const LabelHidden: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
    labelPosition: 'hidden',
  },
};

// Different step counts
export const ThreeSteps: Story = {
  args: {
    currentStep: 2,
    steps: [
      { id: 1, label: 'Start' },
      { id: 2, label: 'Process' },
      { id: 3, label: 'Finish' },
    ],
  },
};

export const FiveSteps: Story = {
  args: {
    currentStep: 3,
    steps: [
      { id: 1, label: 'Account' },
      { id: 2, label: 'Profile' },
      { id: 3, label: 'Preferences' },
      { id: 4, label: 'Review' },
      { id: 5, label: 'Complete' },
    ],
  },
};

// Completed state
export const AllCompleted: Story = {
  args: {
    currentStep: 4,
    steps: defaultSteps,
  },
};

// Interactive examples
export const Interactive: Story = {
  args: {
    currentStep: 1,
    steps: defaultSteps,
    allowStepNavigation: true,
  },
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(args.currentStep);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
        <ProgressSteps
          {...args}
          currentStep={currentStep}
          onStepClick={(stepId) => setCurrentStep(stepId)}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            style={{
              padding: '10px 20px',
              backgroundColor: currentStep === 1 ? '#d1d5db' : '#1a4da0',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              fontWeight: '500',
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(args.steps.length, prev + 1))}
            disabled={currentStep === args.steps.length}
            style={{
              padding: '10px 20px',
              backgroundColor: currentStep === args.steps.length ? '#d1d5db' : '#1a4da0',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentStep === args.steps.length ? 'not-allowed' : 'pointer',
              fontWeight: '500',
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};

export const InteractiveWithVariants: Story = {
  args: {
    currentStep: 1,
    steps: stepsWithIcons,
    showDescription: true,
  },
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(args.currentStep);
    const [variant, setVariant] = useState<'default' | 'minimal' | 'outlined' | 'filled'>(
      'default'
    );
    const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', marginRight: '8px' }}>
              Variant:
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
              style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            >
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="outlined">Outlined</option>
              <option value="filled">Filled</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', marginRight: '8px' }}>Size:</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as any)}
              style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        <ProgressSteps
          {...args}
          currentStep={currentStep}
          variant={variant}
          size={size}
          onStepClick={(stepId) => setCurrentStep(stepId)}
          allowStepNavigation
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            style={{
              padding: '10px 20px',
              backgroundColor: currentStep === 1 ? '#d1d5db' : '#1a4da0',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              fontWeight: '500',
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(args.steps.length, prev + 1))}
            disabled={currentStep === args.steps.length}
            style={{
              padding: '10px 20px',
              backgroundColor: currentStep === args.steps.length ? '#d1d5db' : '#1a4da0',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentStep === args.steps.length ? 'not-allowed' : 'pointer',
              fontWeight: '500',
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};

// Real-world examples
export const CheckoutFlow: Story = {
  args: {
    currentStep: 2,
    steps: [
      { id: 1, label: 'Cart', description: 'Review items' },
      { id: 2, label: 'Shipping', description: 'Enter address' },
      { id: 3, label: 'Payment', description: 'Payment details' },
      { id: 4, label: 'Confirmation', description: 'Order complete' },
    ],
    variant: 'filled',
    showDescription: true,
    colors: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      completed: '#10b981',
    },
  },
};

export const OnboardingFlow: Story = {
  args: {
    currentStep: 1,
    steps: [
      {
        id: 1,
        label: 'Welcome',
        description: 'Get started',
        icon: <FontAwesomeIcon icon={faRocket} />,
      },
      {
        id: 2,
        label: 'Profile',
        description: 'Setup profile',
        icon: <FontAwesomeIcon icon={faUser} />,
      },
      {
        id: 3,
        label: 'Documents',
        description: 'Upload docs',
        icon: <FontAwesomeIcon icon={faFileAlt} />,
      },
      {
        id: 4,
        label: 'Verified',
        description: 'You\'re ready!',
        icon: <FontAwesomeIcon icon={faCheckCircle} />,
      },
    ],
    variant: 'outlined',
    size: 'large',
    showDescription: true,
    showNumbers: false,
  },
};