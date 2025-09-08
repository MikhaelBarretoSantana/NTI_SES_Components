import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faTwitter,
    faLinkedin,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';
import {
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
    faGavel,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Footer> = {
    title: 'Layout/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: {
            control: 'select',
            options: ['white', 'light', 'dark', 'primary'],
        },
        textColor: {
            control: 'select',
            options: ['dark', 'light'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Footer governamental baseado na imagem
export const Governmental: Story = {
    args: {
        logos: [
            {
                key: 'secretaria-saude',
                image: 'https://via.placeholder.com/200x80/2563eb/ffffff?text=SECRETARIA+DE+ESTADO+DA+SAÚDE',
                alt: 'Secretaria de Estado da Saúde',
                href: '#'
            },
            {
                key: 'governo-sergipe',
                image: 'https://via.placeholder.com/200x80/1d4ed8/ffffff?text=GOVERNO+SERGIPE',
                alt: 'Governo de Sergipe',
                href: '#'
            },
            {
                key: 'nti',
                image: 'https://via.placeholder.com/120x80/374151/ffffff?text=NTI',
                alt: 'Núcleo de Tecnologia da Informação',
                href: '#'
            }
        ],
        backgroundColor: 'white',
        textColor: 'dark'
    },
};

// Footer corporativo simples
export const Corporate: Story = {
    args: {
        logos: [
            {
                key: 'company',
                text: 'MinhEmpresa',
                href: '/'
            }
        ],
        links: [
            { key: 'about', label: 'Sobre Nós', href: '/sobre' },
            { key: 'contact', label: 'Contato', href: '/contato' },
            { key: 'privacy', label: 'Privacidade', href: '/privacidade', icon: faShieldAlt },
            { key: 'terms', label: 'Termos de Uso', href: '/termos', icon: faGavel },
        ],
        copyright: '© 2024 MinhaEmpresa. Todos os direitos reservados.',
        backgroundColor: 'light',
        textColor: 'dark'
    },
};

// Footer com redes sociais
export const WithSocialMedia: Story = {
    args: {
        logos: [
            {
                key: 'brand',
                text: 'MinhaMarca',
                href: '/'
            }
        ],
        links: [
            { key: 'github', label: 'GitHub', href: 'https://github.com', icon: faGithub, target: '_blank' },
            { key: 'twitter', label: 'Twitter', href: 'https://twitter.com', icon: faTwitter, target: '_blank' },
            { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com', icon: faLinkedin, target: '_blank' },
            { key: 'instagram', label: 'Instagram', href: 'https://instagram.com', icon: faInstagram, target: '_blank' },
        ],
        copyright: '© 2024 MinhaMarca. Construído com ❤️',
        backgroundColor: 'dark',
        textColor: 'light'
    },
};

// Footer estilo startup
export const Startup: Story = {
    args: {
        logos: [
            {
                key: 'startup',
                image: 'https://via.placeholder.com/150x60/10b981/ffffff?text=STARTUP',
                alt: 'Startup Logo',
                href: '/'
            }
        ],
        links: [
            { key: 'blog', label: 'Blog', href: '/blog' },
            { key: 'careers', label: 'Carreiras', href: '/carreiras' },
            { key: 'support', label: 'Suporte', href: '/suporte', icon: faEnvelope },
        ],
        copyright: (
            <span>
                © 2024 Startup. Feito em São Paulo, Brasil 🇧🇷
            </span>
        ),
        backgroundColor: 'primary',
        textColor: 'light'
    },
};

// Footer com contato
export const WithContact: Story = {
    args: {
        logos: [
            {
                key: 'company',
                text: 'Contato Corp',
                href: '/'
            }
        ],
        links: [
            { key: 'phone', label: '(11) 99999-9999', href: 'tel:+5511999999999', icon: faPhone },
            { key: 'email', label: 'contato@empresa.com', href: 'mailto:contato@empresa.com', icon: faEnvelope },
            { key: 'address', label: 'São Paulo, SP', href: '#', icon: faMapMarkerAlt },
        ],
        copyright: '© 2024 Contato Corp. CNPJ: 00.000.000/0001-00',
        backgroundColor: 'light',
        textColor: 'dark'
    },
};

// Footer apenas com logos (igual à sua imagem)
export const LogosOnly: Story = {
    args: {
        logos: [
            {
                key: 'partner1',
                image: 'https://via.placeholder.com/180x70/2563eb/ffffff?text=PARCEIRO+1',
                alt: 'Parceiro 1',
                href: '#'
            },
            {
                key: 'partner2',
                image: 'https://via.placeholder.com/180x70/059669/ffffff?text=PARCEIRO+2',
                alt: 'Parceiro 2',
                href: '#'
            },
            {
                key: 'partner3',
                image: 'https://via.placeholder.com/180x70/dc2626/ffffff?text=PARCEIRO+3',
                alt: 'Parceiro 3',
                href: '#'
            },
            {
                key: 'partner4',
                image: 'https://via.placeholder.com/120x70/6b7280/ffffff?text=ORG',
                alt: 'Organização',
                href: '#'
            }
        ],
        backgroundColor: 'white',
        textColor: 'dark',
        className: 'ui-footer--logos-only'
    },
};

// Footer minimalista
export const Minimal: Story = {
    args: {
        copyright: '© 2024 Simples. Todos os direitos reservados.',
        backgroundColor: 'white',
        textColor: 'dark'
    },
};

// Footer completo
export const Complete: Story = {
    args: {
        logos: [
            {
                key: 'main-brand',
                image: 'https://via.placeholder.com/200x80/2563eb/ffffff?text=MINHA+EMPRESA',
                alt: 'Minha Empresa',
                href: '/'
            },
            {
                key: 'partner1',
                image: 'https://via.placeholder.com/150x60/10b981/ffffff?text=PARCEIRO',
                alt: 'Parceiro',
                href: '#'
            }
        ],
        links: [
            { key: 'about', label: 'Sobre', href: '/sobre' },
            { key: 'services', label: 'Serviços', href: '/servicos' },
            { key: 'contact', label: 'Contato', href: '/contato', icon: faEnvelope },
            { key: 'privacy', label: 'Privacidade', href: '/privacidade', icon: faShieldAlt },
            { key: 'github', label: 'GitHub', href: 'https://github.com', icon: faGithub, target: '_blank' },
        ],
        copyright: (
            <div>
                © 2024 Minha Empresa. Todos os direitos reservados.<br />
                CNPJ: 00.000.000/0001-00 | Desenvolvido com React
            </div>
        ),
        backgroundColor: 'light',
        textColor: 'dark'
    },
};

// Footer responsivo para demonstração
export const ResponsiveDemo: Story = {
    args: {
        logos: [
            {
                key: 'gov1',
                image: 'https://via.placeholder.com/200x80/1e40af/ffffff?text=GOVERNO+FEDERAL',
                alt: 'Governo Federal',
                href: '#'
            },
            {
                key: 'gov2',
                image: 'https://via.placeholder.com/200x80/059669/ffffff?text=MINISTÉRIO+SAÚDE',
                alt: 'Ministério da Saúde',
                href: '#'
            },
            {
                key: 'gov3',
                image: 'https://via.placeholder.com/180x80/dc2626/ffffff?text=ESTADO+SP',
                alt: 'Governo do Estado de SP',
                href: '#'
            },
            {
                key: 'org',
                image: 'https://via.placeholder.com/120x70/374151/ffffff?text=ORG',
                alt: 'Organização',
                href: '#'
            }
        ],
        links: [
            { key: 'accessibility', label: 'Acessibilidade', href: '/acessibilidade' },
            { key: 'transparency', label: 'Transparência', href: '/transparencia' },
            { key: 'contact', label: 'Fale Conosco', href: '/contato', icon: faEnvelope },
        ],
        copyright: '© 2024 Portal do Governo. Todos os direitos reservados.',
        backgroundColor: 'white',
        textColor: 'dark'
    },
    decorators: [
        (Story) => (
            <div>
                <div style={{
                    minHeight: '80vh',
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f8f9fa'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Conteúdo da Página</h1>
                        <p>O footer aparece na parte inferior. Redimensione a janela para ver a responsividade!</p>
                    </div>
                </div>
                <Story />
            </div>
        ),
    ],
};