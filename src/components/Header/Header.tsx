import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HeaderProps } from './Header.types';
import './Header.scss';

export const Header: React.FC<HeaderProps> = ({
    logo,
    navigation = [],
    actionButton,
    className = '',
    variant = 'default',
    sticky = false,
    showMobileMenu = true,
    mobileMenuAlign = 'left',
    desktopNavAlign = 'left',
    onNavigationClick,
    onActionClick,
    onLogoClick,
    containerRef
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavigationClick = (navItem: any) => {
        if (navItem.href) {
            window.location.href = navItem.href;
        }
        onNavigationClick?.(navItem);
        // Fechar menu mobile após clique
        setIsMobileMenuOpen(false);
    };

    const handleLogoClick = () => {
        if (logo?.href) {
            window.location.href = logo.href;
        }
        onLogoClick?.();
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Determinar posição da logo (padrão: left)
    const logoPosition = logo?.position || 'left';
    const logoMobilePosition = logo?.mobilePosition || 'left';
    
    // Determinar se o X deve estar à esquerda (quando logo está à direita)
    const closeButtonAtLeft = logoMobilePosition === 'right';

    const headerClasses = [
        'ui-header',
        `ui-header--${variant}`,
        sticky && 'ui-header--sticky',
        isMobileMenuOpen && 'ui-header--mobile-open',
        `ui-header--logo-${logoPosition}`,
        `ui-header--logo-mobile-${logoMobilePosition}`,
        `ui-header--menu-align-${mobileMenuAlign}`,
        `ui-header--desktop-nav-align-${desktopNavAlign}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <header
            ref={containerRef}
            className={headerClasses}
        >
            <div className="ui-header__container">
                {/* Logo */}
                {logo && (
                    <div 
                        className="ui-header__logo"
                        onClick={handleLogoClick}
                        style={{ cursor: logo.href || onLogoClick ? 'pointer' : 'default' }}
                    >
                        {logo.icon && (
                            <FontAwesomeIcon 
                                icon={logo.icon} 
                                className="ui-header__logo-icon"
                            />
                        )}
                        {logo.image && (
                            <img 
                                src={logo.image} 
                                alt={logo.text || 'Logo'} 
                                className="ui-header__logo-image"
                            />
                        )}
                        {logo.text && (
                            <span className="ui-header__logo-text">
                                {logo.text}
                            </span>
                        )}
                    </div>
                )}

                {/* Navigation Desktop */}
                {navigation.length > 0 && (
                    <nav className="ui-header__nav ui-header__nav--desktop">
                        {navigation.map((item) => (
                            <button
                                key={item.key}
                                className={`ui-header__nav-item ${item.active ? 'ui-header__nav-item--active' : ''}`}
                                onClick={() => handleNavigationClick(item)}
                                disabled={item.disabled}
                            >
                                {item.icon && (
                                    <FontAwesomeIcon 
                                        icon={item.icon} 
                                        className="ui-header__nav-icon"
                                    />
                                )}
                                {item.label}
                            </button>
                        ))}
                    </nav>
                )}

                {/* Actions */}
                <div className="ui-header__actions">
                    {/* Action Button */}
                    {actionButton && (
                        <button
                            className={`ui-header__action-btn ui-header__action-btn--${actionButton.variant || 'primary'}`}
                            onClick={onActionClick}
                            disabled={actionButton.disabled}
                        >
                            {actionButton.icon && (
                                <FontAwesomeIcon 
                                    icon={actionButton.icon} 
                                    className="ui-header__action-icon"
                                />
                            )}
                            <span className="ui-header__action-text">
                                {actionButton.label}
                            </span>
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    {navigation.length > 0 && showMobileMenu && (
                        <button
                            className="ui-header__mobile-toggle"
                            onClick={toggleMobileMenu}
                            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                        >
                            <FontAwesomeIcon 
                                icon={isMobileMenuOpen ? faTimes : faBars} 
                            />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && showMobileMenu && (
                <div 
                    className="ui-header__mobile-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Navigation */}
            {navigation.length > 0 && showMobileMenu && (
                <nav className={`ui-header__nav ui-header__nav--mobile ${isMobileMenuOpen ? 'ui-header__nav--mobile-open' : ''}`}>
                    {/* Header do Menu Mobile com botão de fechar na posição correta */}
                    <div className="ui-header__nav-mobile-header">
                        {/* Botão X à esquerda quando closeButtonAtLeft é true */}
                        {closeButtonAtLeft && (
                            <button
                                className="ui-header__mobile-close"
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Fechar menu"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        )}
                        
                        {/* Logo sempre no meio */}
                        {logo && (
                            <div className="ui-header__logo">
                                {logo.icon && (
                                    <FontAwesomeIcon 
                                        icon={logo.icon} 
                                        className="ui-header__logo-icon"
                                    />
                                )}
                                {logo.image && (
                                    <img 
                                        src={logo.image} 
                                        alt={logo.text || 'Logo'} 
                                        className="ui-header__logo-image"
                                    />
                                )}
                                {logo.text && (
                                    <span className="ui-header__logo-text">
                                        {logo.text}
                                    </span>
                                )}
                            </div>
                        )}
                        
                        {/* Botão X à direita quando closeButtonAtLeft é false */}
                        {!closeButtonAtLeft && (
                            <button
                                className="ui-header__mobile-close"
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Fechar menu"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        )}
                    </div>

                    <div className="ui-header__nav-mobile-content">
                        {navigation.map((item) => (
                            <button
                                key={item.key}
                                className={`ui-header__nav-item ui-header__nav-item--mobile ${item.active ? 'ui-header__nav-item--active' : ''}`}
                                onClick={() => handleNavigationClick(item)}
                                disabled={item.disabled}
                            >
                                {item.icon && (
                                    <FontAwesomeIcon 
                                        icon={item.icon} 
                                        className="ui-header__nav-icon"
                                    />
                                )}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
};

Header.displayName = 'Header';