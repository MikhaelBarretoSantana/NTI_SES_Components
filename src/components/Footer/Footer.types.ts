import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export interface FooterLogo {
    key?: string;
    image?: string; // URL da imagem
    text?: string; // Texto alternativo se não houver imagem
    alt?: string; // Alt text da imagem
    href?: string; // Link opcional
    target?: string; // Target do link
}

export interface FooterLink {
    key?: string;
    label: string;
    href: string;
    icon?: IconDefinition;
    target?: string;
}

export interface FooterProps {
    // Logos das organizações/parceiros
    logos?: FooterLogo[];
    
    // Links de navegação
    links?: FooterLink[];
    
    // Copyright/texto de rodapé
    copyright?: string | React.ReactNode;
    
    // Estilo visual
    backgroundColor?: 'white' | 'light' | 'dark' | 'primary';
    textColor?: 'dark' | 'light';
    
    // Classes customizáveis
    className?: string;
    
    // Referência
    containerRef?: React.Ref<HTMLElement>;
}