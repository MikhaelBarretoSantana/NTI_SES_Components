export interface Step {
    id: number;
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

export type ProgressStepsVariant = 'default' | 'minimal' | 'outlined' | 'filled';
export type ProgressStepsSize = 'small' | 'medium' | 'large';
export type ProgressStepsOrientation = 'horizontal' | 'vertical';
export type ProgressStepsLabelPosition = 'bottom' | 'right' | 'hidden';

export interface ProgressStepsColors {
    primary?: string;
    secondary?: string;
    completed?: string;
    inactive?: string;
    text?: string;
    inactiveText?: string;
    background?: string;
}

export interface ProgressStepsProps {
    /** Current active step (1-based index) */
    currentStep: number;

    /** Array of steps to display */
    steps: Step[];

    /** Visual variant of the progress steps */
    variant?: ProgressStepsVariant;

    /** Size of the step circles and overall component */
    size?: ProgressStepsSize;

    /** Orientation of the progress steps */
    orientation?: ProgressStepsOrientation;

    /** Position of step labels */
    labelPosition?: ProgressStepsLabelPosition;

    /** Custom color scheme */
    colors?: ProgressStepsColors;

    /** Custom color scheme when all steps are completed */
    completedColors?: ProgressStepsColors;

    /** Show checkmarks on completed steps */
    showCheckmarks?: boolean;

    /** Show step numbers */
    showNumbers?: boolean;

    /** Enable click on steps */
    clickable?: boolean;

    /** Callback when a step is clicked */
    onStepClick?: (stepId: number) => void;

    /** Show connecting line between steps */
    showConnector?: boolean;

    /** Animate transitions */
    animated?: boolean;

    /** Custom class name */
    className?: string;

    /** Custom width (for horizontal orientation) */
    width?: string | number;

    /** Custom height (for vertical orientation) */
    height?: string | number;

    /** Show description below labels */
    showDescription?: boolean;

    /** Allow navigation to completed steps only */
    allowStepNavigation?: boolean;
}