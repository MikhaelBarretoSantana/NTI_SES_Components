import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    CardProps,
    CardHeaderProps,
    CardTitleProps,
    CardSubtitleProps,
    CardContentProps,
    CardFooterProps,
    CardActionProps,
    CardIconProps
} from './Card.types';
import './Card.scss';

/**
 * Componente Card principal
 */
const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    size = 'medium',
    hover = false,
    shadow = true,
    padding = true,
    borderColor,
    borderWidth,
    borderRadius,
    shadowColor,
    shadowIntensity,
    backgroundColor,
    headerColor,
    headerHeight = 4,
    dashedColor,
    dashedWidth = 'normal',
    className = '',
    onClick,
    style = {},
    ...props
}) => {
    // Constrói as classes CSS
    const getCardClasses = (): string => {
        const classes = ['card'];

        // Variante
        classes.push(`card--${variant}`);

        // Tamanho
        classes.push(`card--${size}`);

        // Modificadores
        if (hover) classes.push('card--hover');
        if (shadow && variant !== 'elevated') classes.push('card--shadow');
        if (padding) classes.push('card--padding');
        if (onClick) classes.push('card--clickable');

        // Header colorido
        if (variant === 'header-colored' && headerColor) {
            // Se for uma cor predefinida, adiciona a classe correspondente
            const predefinedColors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
            if (predefinedColors.includes(headerColor)) {
                classes.push(`card--header-${headerColor}`);
            }
        }

        // Borda pontilhada
        if (variant === 'dashed') {
            if (dashedColor) {
                const predefinedColors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
                if (predefinedColors.includes(dashedColor)) {
                    classes.push(`card--dashed-${dashedColor}`);
                } else {
                    // Cor customizada
                    classes.push('card--dashed-custom');
                }
            }
            
            // Largura da borda
            if (typeof dashedWidth === 'string' && dashedWidth !== 'normal') {
                classes.push(`card--dashed-${dashedWidth}`);
            }
        }

        // Classe customizada
        if (className) classes.push(className);

        return classes.join(' ');
    };

    // Constrói o estilo customizado
    const getCardStyle = (): React.CSSProperties & Record<string, string | number> => {
        const cardStyle: React.CSSProperties & Record<string, string | number> = { ...style };

        // Customizações de borda
        if (borderColor) {
            const predefinedColors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'gray'];
            if (predefinedColors.includes(borderColor)) {
                cardStyle['--border-color'] = `var(--card-border-${borderColor}, ${getBorderColorValue(borderColor)})`;
            } else {
                cardStyle['--border-color'] = borderColor;
            }
        }

        if (borderWidth) {
            if (typeof borderWidth === 'number') {
                cardStyle['--border-width'] = `${borderWidth}px`;
            } else {
                cardStyle['--border-width'] = getBorderWidthValue(borderWidth);
            }
        }

        if (borderRadius) {
            cardStyle.borderRadius = `${borderRadius}px`;
        }

        // Customizações de sombra
        if (shadowColor) {
            const intensity = shadowIntensity ?? 100;
            cardStyle['--shadow-color'] = shadowColor;
            cardStyle['--shadow-intensity'] = `${intensity}%`;
        }

        // Cor de fundo customizada
        if (backgroundColor) {
            cardStyle.backgroundColor = backgroundColor;
        }

        // Para variant header-colored, define variáveis CSS customizadas
        if (variant === 'header-colored') {
            cardStyle['--header-height'] = `${headerHeight}px`;
            
            // Se a cor não for predefinida, aplica como cor customizada
            if (headerColor && !['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(headerColor)) {
                cardStyle['--header-color'] = headerColor;
            }
        }

        // Para variant dashed, define variáveis CSS customizadas
        if (variant === 'dashed') {
            // Cor customizada
            if (dashedColor && !['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(dashedColor)) {
                cardStyle['--dashed-color'] = dashedColor;
            }
            
            // Largura customizada (número)
            if (typeof dashedWidth === 'number') {
                cardStyle['--dashed-width'] = `${dashedWidth}px`;
            }
        }

        return cardStyle;
    };

    // Funções auxiliares para mapear valores predefinidos
    const getBorderColorValue = (color: string): string => {
        const colorMap: Record<string, string> = {
            'primary': '#3b82f6',
            'secondary': '#6b7280',
            'success': '#059669',
            'warning': '#d97706',
            'danger': '#dc2626',
            'info': '#0ea5e9',
            'gray': '#e5e7eb'
        };
        return colorMap[color] || color;
    };

    const getBorderWidthValue = (width: string): string => {
        const widthMap: Record<string, string> = {
            'thin': '1px',
            'normal': '2px',
            'thick': '3px'
        };
        return widthMap[width] || '2px';
    };

    return (
        <div
            className={getCardClasses()}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            style={getCardStyle()}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : -1}
            onKeyDown={onClick ? (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(e as any as React.MouseEvent<HTMLDivElement>);
                }
            } : undefined}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Componente CardIcon - Ícone destacado para cards de feature
 */
const CardIcon: React.FC<CardIconProps> = ({
    icon,
    variant = 'primary',
    backgroundColor,
    iconColor = '#ffffff',
    className = ''
}) => {
    const iconClasses = [
        'card-icon-container',
        `card-icon-container--${variant}`,
        className
    ].filter(Boolean).join(' ');

    // Usa variáveis CSS para aplicar cores customizadas
    const getIconStyle = (): React.CSSProperties & Record<string, string> => {
        const style: React.CSSProperties & Record<string, string> = {};
        
        if (backgroundColor) {
            style['--icon-bg-color' as any] = backgroundColor;
        }
        
        if (iconColor !== '#ffffff') {
            style['--icon-color' as any] = iconColor;
        }
        
        return style;
    };

    return (
        <div className={iconClasses} style={getIconStyle()}>
            <FontAwesomeIcon 
                icon={icon} 
                className="card-icon-container__icon" 
            />
        </div>
    );
};

/**
 * Componente CardHeader
 */
const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    className = '',
    icon,
    iconPosition = 'left'
}) => {
    const hasIcon = !!icon;
    const headerClasses = [
        'card-header',
        hasIcon && 'card-header--with-icon',
        hasIcon && iconPosition === 'right' && 'card-header--icon-right',
        className
    ].filter(Boolean).join(' ');

    if (hasIcon) {
        return (
            <div className={headerClasses}>
                {iconPosition === 'left' && (
                    <FontAwesomeIcon icon={icon} className="card-header__icon" />
                )}
                <div className="card-header__content">
                    {children}
                </div>
                {iconPosition === 'right' && (
                    <FontAwesomeIcon icon={icon} className="card-header__icon" />
                )}
            </div>
        );
    }

    return (
        <div className={headerClasses}>
            {children}
        </div>
    );
};

/**
 * Componente CardTitle
 */
const CardTitle: React.FC<CardTitleProps> = ({
    children,
    className = '',
    icon,
    iconPosition = 'left'
}) => {
    const hasIcon = !!icon;
    const titleClasses = [
        'card-title',
        hasIcon && 'card-title--with-icon',
        hasIcon && iconPosition === 'right' && 'card-title--icon-right',
        className
    ].filter(Boolean).join(' ');

    if (hasIcon) {
        return (
            <h3 className={titleClasses}>
                {iconPosition === 'left' && (
                    <FontAwesomeIcon icon={icon} className="card-title__icon" />
                )}
                <span className="card-title__content">
                    {children}
                </span>
                {iconPosition === 'right' && (
                    <FontAwesomeIcon icon={icon} className="card-title__icon" />
                )}
            </h3>
        );
    }

    return (
        <h3 className={titleClasses}>
            {children}
        </h3>
    );
};

/**
 * Componente CardSubtitle
 */
const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className = '' }) => (
    <p className={`card-subtitle ${className}`}>
        {children}
    </p>
);

/**
 * Componente CardContent
 */
const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
    <div className={`card-content ${className}`}>
        {children}
    </div>
);

/**
 * Componente CardFooter
 */
const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
    <div className={`card-footer ${className}`}>
        {children}
    </div>
);

/**
 * Componente CardAction - Botão/Link para uso em footers
 */
const CardAction: React.FC<CardActionProps> = ({
    children,
    icon,
    iconPosition = 'left',
    variant = 'ghost',
    size = 'medium',
    onClick,
    href,
    target,
    disabled = false,
    className = '',
    ...props
}) => {
    const actionClasses = [
        'card-action',
        `card-action--${variant}`,
        `card-action--${size}`,
        className
    ].filter(Boolean).join(' ');

    const content = (
        <>
            {icon && iconPosition === 'left' && (
                <FontAwesomeIcon icon={icon} className="card-action__icon" />
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <FontAwesomeIcon icon={icon} className="card-action__icon" />
            )}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target={target}
                className={actionClasses}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            className={actionClasses}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {content}
        </button>
    );
};

/**
 * Componente CardStatus - Para exibir status com ícones
 */
interface CardStatusProps {
    children: React.ReactNode;
    variant: 'success' | 'warning' | 'error' | 'info';
    icon?: React.ComponentProps<typeof FontAwesomeIcon>['icon'];
    className?: string;
}

const CardStatus: React.FC<CardStatusProps> = ({
    children,
    variant,
    icon,
    className = ''
}) => {
    const statusClasses = [
        'card-status',
        `card-status--${variant}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={statusClasses}>
            {icon && <FontAwesomeIcon icon={icon} className="card-status__icon" />}
            {children}
        </span>
    );
};

// Exportações
export {
    Card,
    CardIcon,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardContent,
    CardFooter,
    CardAction,
    CardStatus
};
export default Card;
export type {
    CardProps,
    CardIconProps,
    CardHeaderProps,
    CardTitleProps,
    CardSubtitleProps,
    CardContentProps,
    CardFooterProps,
    CardActionProps
};