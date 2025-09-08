import { ReactNode, MouseEvent } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled' | 'gradient' | 'header-colored' | 'dashed';

export type CardSize = 'small' | 'medium' | 'large';

export type CardHeaderColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | string; // Permite cores customizadas

export type CardDashedColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | string; // Permite cores customizadas

export type CardDashedWidth = 'thin' | 'normal' | 'thick' | number;

export interface CardProps {
    /** Conteúdo do card */
    children: ReactNode;
    /** Variante visual do card */
    variant?: CardVariant;
    /** Tamanho do card */
    size?: CardSize;
    /** Adiciona efeito hover */
    hover?: boolean;
    /** Controla a sombra do card */
    shadow?: boolean;
    /** Controla o padding interno */
    padding?: boolean;
    /** Cor do header superior (apenas para variant header-colored) */
    headerColor?: CardHeaderColor;
    /** Altura do header colorido em pixels */
    headerHeight?: number;
    /** Cor da borda pontilhada (apenas para variant dashed) */
    dashedColor?: CardDashedColor;
    /** Largura da borda pontilhada (apenas para variant dashed) */
    dashedWidth?: CardDashedWidth;
    /** Classes CSS customizadas */
    className?: string;
    /** Handler para clique no card */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    /** Props adicionais do elemento div */
    [key: string]: any;
}

export interface CardSubComponentProps {
    /** Conteúdo do componente */
    children: ReactNode;
    /** Classes CSS customizadas */
    className?: string;
}

export interface CardHeaderProps extends CardSubComponentProps {
    /** Ícone para exibir no header */
    icon?: IconDefinition;
    /** Posição do ícone */
    iconPosition?: 'left' | 'right';
}

export interface CardTitleProps extends CardSubComponentProps {
    /** Ícone para exibir no título */
    icon?: IconDefinition;
    /** Posição do ícone */
    iconPosition?: 'left' | 'right';
}

export interface CardSubtitleProps extends CardSubComponentProps { }

export interface CardContentProps extends CardSubComponentProps { }

export interface CardFooterProps extends CardSubComponentProps { }

export interface CardActionProps {
    /** Texto do botão/link */
    children: ReactNode;
    /** Ícone do botão */
    icon?: IconDefinition;
    /** Posição do ícone */
    iconPosition?: 'left' | 'right';
    /** Variante do botão */
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    /** Tamanho do botão */
    size?: 'small' | 'medium';
    /** Handler de clique */
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /** URL para link */
    href?: string;
    /** Target do link */
    target?: string;
    /** Desabilitar ação */
    disabled?: boolean;
    /** Classes CSS customizadas */
    className?: string;
}