import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ProgressStepsProps } from './ProgressSteps.types';
import './ProgressSteps.scss';

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
    currentStep,
    steps,
    variant = 'default',
    size = 'medium',
    orientation = 'horizontal',
    labelPosition = 'bottom',
    colors,
    showCheckmarks = true,
    showNumbers = true,
    clickable = false,
    onStepClick,
    showConnector = true,
    animated = true,
    className = '',
    width,
    height,
    showDescription = false,
    allowStepNavigation = false,
    completedColors,
}) => {
    const calculateProgress = useMemo(() => {
        if (steps.length <= 1) return 0;
        const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
        return Math.min(progress, 100);
    }, [currentStep, steps.length]);

    const isAllCompleted = useMemo(() => {
        return currentStep > steps.length;
    }, [currentStep, steps.length]);

    const handleStepClick = (stepId: number) => {
        if (!clickable && !allowStepNavigation) return;

        if (allowStepNavigation && stepId > currentStep) return;

        onStepClick?.(stepId);
    };

    const getStepStatus = (stepId: number) => {
        if (stepId === currentStep) return 'current';
        if (stepId < currentStep) return 'completed';
        return 'inactive';
    };

    const isStepClickable = (stepId: number) => {
        if (clickable) return true;
        if (allowStepNavigation && stepId <= currentStep) return true;
        return false;
    };

    const containerStyle = useMemo(() => {
        // Usa as cores de conclusão se todos os passos estiverem concluídos
        const activeColors = isAllCompleted && completedColors ? completedColors : colors;

        const style: React.CSSProperties = {
            '--progress-width': `${calculateProgress}%`,
            ...(activeColors?.primary && { '--color-primary': activeColors.primary }),
            ...(activeColors?.secondary && { '--color-secondary': activeColors.secondary }),
            ...(activeColors?.completed && { '--color-completed': activeColors.completed }),
            ...(activeColors?.inactive && { '--color-inactive': activeColors.inactive }),
            ...(activeColors?.text && { '--color-text': activeColors.text }),
            ...(activeColors?.inactiveText && { '--color-inactive-text': activeColors.inactiveText }),
            ...(activeColors?.background && { '--color-background': activeColors.background }),
        } as React.CSSProperties;

        if (orientation === 'horizontal' && width) {
            style.width = typeof width === 'number' ? `${width}px` : width;
        }
        if (orientation === 'vertical' && height) {
            style.height = typeof height === 'number' ? `${height}px` : height;
        }

        return style;
    }, [calculateProgress, colors, completedColors, orientation, width, height, isAllCompleted]);

    const containerClasses = [
        'progress-steps-container',
        `progress-steps-${variant}`,
        `progress-steps-${size}`,
        `progress-steps-${orientation}`,
        `progress-steps-label-${labelPosition}`,
        animated && 'progress-steps-animated',
        !showConnector && 'progress-steps-no-connector',
        isAllCompleted && 'progress-steps-all-completed',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={containerClasses} style={containerStyle}>
            {showConnector && <div className="progress-line" />}

            {steps.map((step) => {
                const status = getStepStatus(step.id);
                const stepClickable = isStepClickable(step.id);

                return (
                    <div
                        key={step.id}
                        className={`step-wrapper step-${status} ${stepClickable ? 'step-clickable' : ''}`}
                        onClick={() => handleStepClick(step.id)}
                        role={stepClickable ? 'button' : undefined}
                        tabIndex={stepClickable ? 0 : undefined}
                        onKeyDown={(e) => {
                            if (stepClickable && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                handleStepClick(step.id);
                            }
                        }}
                    >
                        <div className="step-circle">
                            {step.icon ? (
                                <span className="step-icon">{step.icon}</span>
                            ) : (
                                <>
                                    {status === 'completed' && showCheckmarks ? (
                                        <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                    ) : (
                                        showNumbers && <span className="step-number">{step.id}</span>
                                    )}
                                </>
                            )}
                        </div>

                        {labelPosition !== 'hidden' && (
                            <div className="step-content">
                                <div className="step-label">{step.label}</div>
                                {showDescription && step.description && (
                                    <div className="step-description">{step.description}</div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
