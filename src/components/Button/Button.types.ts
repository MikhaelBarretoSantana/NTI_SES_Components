import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    icon?: IconDefinition;
    iconSide?: IconSide;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

// Enum Para definir Lado do Icone
enum IconSide {
    "Left",
    "Right"
}