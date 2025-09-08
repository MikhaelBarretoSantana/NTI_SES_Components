import React from 'react';

export interface PaginationLabels {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
    page?: string;
    of?: string;
    items?: string;
    showing?: string;
    to?: string;
    jumpTo?: string;
    itemsPerPage?: string;
}

export interface PaginationProps {
    // Dados principais
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    
    // Configurações de visualização
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    showNumbers?: boolean;
    showInfo?: boolean;
    showJumper?: boolean;
    
    // Configurações de comportamento
    siblingCount?: number; // Quantas páginas mostrar ao lado da atual
    boundaryCount?: number; // Quantas páginas mostrar no início e fim
    
    // Informações dos dados
    totalItems?: number;
    pageSize?: number;
    itemsPerPageOptions?: number[];
    onPageSizeChange?: (pageSize: number) => void;
    
    // Personalização
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'outlined' | 'minimal';
    disabled?: boolean;
    
    // Labels customizáveis
    labels?: PaginationLabels;
    
    // Classes e referência
    className?: string;
    containerRef?: React.Ref<HTMLDivElement>;
}