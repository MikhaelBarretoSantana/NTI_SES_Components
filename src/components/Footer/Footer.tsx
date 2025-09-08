import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FooterProps } from './Footer.types';
import './Footer.scss';

export const Footer: React.FC<FooterProps> = ({
    logos = [],
    links = [],
    copyright,
    backgroundColor = 'white',
    textColor = 'dark',
    className = '',
    containerRef
}) => {
    const footerClasses = [
        'ui-footer',
        `ui-footer--bg-${backgroundColor}`,
        `ui-footer--text-${textColor}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <footer
            ref={containerRef}
            className={footerClasses}
        >
            <div className="ui-footer__container">
                {/* Logos Section */}
                {logos.length > 0 && (
                    <div className="ui-footer__logos">
                        {logos.map((logo, index) => (
                            <div key={logo.key || index} className="ui-footer__logo">
                                {logo.href ? (
                                    <a
                                        href={logo.href}
                                        target={logo.target || '_self'}
                                        className="ui-footer__logo-link"
                                        aria-label={logo.alt || logo.text}
                                    >
                                        {logo.image && (
                                            <img
                                                src={logo.image}
                                                alt={logo.alt || logo.text || 'Logo'}
                                                className="ui-footer__logo-image"
                                            />
                                        )}
                                        {logo.text && !logo.image && (
                                            <span className="ui-footer__logo-text">
                                                {logo.text}
                                            </span>
                                        )}
                                    </a>
                                ) : (
                                    <>
                                        {logo.image && (
                                            <img
                                                src={logo.image}
                                                alt={logo.alt || logo.text || 'Logo'}
                                                className="ui-footer__logo-image"
                                            />
                                        )}
                                        {logo.text && !logo.image && (
                                            <span className="ui-footer__logo-text">
                                                {logo.text}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Links Section */}
                {links.length > 0 && (
                    <div className="ui-footer__links">
                        {links.map((link, index) => (
                            <a
                                key={link.key || index}
                                href={link.href}
                                target={link.target || '_self'}
                                className="ui-footer__link"
                            >
                                {link.icon && (
                                    <FontAwesomeIcon 
                                        icon={link.icon} 
                                        className="ui-footer__link-icon"
                                    />
                                )}
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

                {/* Copyright Section */}
                {copyright && (
                    <div className="ui-footer__copyright">
                        {copyright}
                    </div>
                )}
            </div>
        </footer>
    );
};

Footer.displayName = 'Footer';