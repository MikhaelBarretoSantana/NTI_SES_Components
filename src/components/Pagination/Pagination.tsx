import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChevronLeft, 
    faChevronRight,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { PaginationProps } from './Pagination.types';
import './Pagination.scss';

export const Pagination: React.FC<PaginationProps> = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    
    // Configurações de visualização
    showFirstLast = false, // Mudado para false por padrão para design mais compacto
    showPrevNext = true,
    showNumbers = true,
    showInfo = false,
    showJumper = false,
    
    // Configurações de comportamento
    siblingCount = 1,
    boundaryCount = 1,
    
    // Informações dos dados
    totalItems,
    pageSize,
    itemsPerPageOptions,
    onPageSizeChange,
    
    // Personalização
    size = 'medium',
    variant = 'default',
    disabled = false,
    
    // Labels customizáveis
    labels = {
        first: 'Primeira',
        previous: 'Anterior',
        next: 'Próxima',
        last: 'Última',
        page: 'Página',
        of: 'de',
        items: 'itens',
        showing: 'Mostrando',
        to: 'até',
        jumpTo: 'Página',
        itemsPerPage: 'itens por página'
    },
    
    // Classes e referência
    className = '',
    containerRef
}) => {
    // Calcular páginas visíveis - Lógica mais simples para design compacto
    const visiblePages = useMemo(() => {
        const range = (start: number, end: number) => {
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        };

        // Para design compacto, mostrar no máximo 7 elementos (incluindo dots)
        const maxVisible = 7;
        
        if (totalPages <= maxVisible) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            return [...range(1, leftItemCount), 'dots', totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            return [1, 'dots', ...range(totalPages - rightItemCount + 1, totalPages)];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            return [1, 'dots', ...range(leftSiblingIndex, rightSiblingIndex), 'dots', totalPages];
        }

        return range(1, totalPages);
    }, [currentPage, totalPages, siblingCount]);

    // Calcular informações dos itens
    const itemInfo = useMemo(() => {
        if (!totalItems || !pageSize) return null;
        
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalItems);
        
        return { start, end, total: totalItems };
    }, [currentPage, pageSize, totalItems]);

    // Handlers
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage && !disabled) {
            onPageChange?.(page);
        }
    };

    const handleJumperSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const page = parseInt(formData.get('page') as string);
        if (page && page >= 1 && page <= totalPages) {
            handlePageChange(page);
        }
        e.currentTarget.reset();
    };

    // Classes CSS
    const paginationClasses = [
        'ui-pagination',
        `ui-pagination--${size}`,
        `ui-pagination--${variant}`,
        disabled && 'ui-pagination--disabled',
        className
    ].filter(Boolean).join(' ');

    const buttonClass = (page: number, type: 'page' | 'nav' = 'page') => [
        'ui-pagination__button',
        `ui-pagination__button--${type}`,
        page === currentPage && type === 'page' && 'ui-pagination__button--active'
    ].filter(Boolean).join(' ');

    return (
        <div className={paginationClasses} ref={containerRef}>
            {/* Informações dos itens */}
            {showInfo && itemInfo && (
                <div className="ui-pagination__info">
                    {labels.showing} {itemInfo.start} {labels.to} {itemInfo.end} {labels.of} {itemInfo.total} {labels.items}
                </div>
            )}

            {/* Seletor de itens por página */}
            {itemsPerPageOptions && itemsPerPageOptions.length > 0 && (
                <div className="ui-pagination__page-size">
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))}
                        className="ui-pagination__page-size-select"
                        disabled={disabled}
                    >
                        {itemsPerPageOptions.map(option => (
                            <option key={option} value={option}>
                                {option} {labels.itemsPerPage}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Controles de paginação - Design compacto */}
            <div className="ui-pagination__controls">
                {/* Página anterior */}
                {showPrevNext && (
                    <button
                        className={buttonClass(currentPage - 1, 'nav')}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || disabled}
                        aria-label={labels.previous}
                        title={labels.previous}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}

                {/* Números das páginas */}
                {showNumbers && visiblePages.map((page, index) => {
                    if (page === 'dots') {
                        return (
                            <span key={`dots-${index}`} className="ui-pagination__dots">
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            className={buttonClass(page as number)}
                            onClick={() => handlePageChange(page as number)}
                            disabled={disabled}
                            aria-label={`${labels.page} ${page}`}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Próxima página */}
                {showPrevNext && (
                    <button
                        className={buttonClass(currentPage + 1, 'nav')}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || disabled}
                        aria-label={labels.next}
                        title={labels.next}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                )}
            </div>

            {/* Jump to page - Design compacto como dropdown */}
            {showJumper && (
                <div className="ui-pagination__jumper">
                    <span className="ui-pagination__jumper-label">{labels.jumpTo}</span>
                    <form onSubmit={handleJumperSubmit} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <input
                            name="page"
                            type="number"
                            min="1"
                            max={totalPages}
                            placeholder={currentPage.toString()}
                            className="ui-pagination__jumper-input"
                            disabled={disabled}
                        />
                    </form>
                    <span className="ui-pagination__jumper-label">{labels.of} {totalPages}</span>
                </div>
            )}
        </div>
    );
};

Pagination.displayName = 'Pagination';