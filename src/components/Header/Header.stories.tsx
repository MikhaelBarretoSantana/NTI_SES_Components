import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { HeaderNavigationItem } from './Header.types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faFileAlt,
    faUser,
    faSignInAlt,
    faCog,
    faQuestionCircle,
    faPlus,
    faChartBar,
    faUsers,
    faBox,
    faBell
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Header> = {
    title: 'Layout/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'transparent'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Navigation items genéricos
const basicNavigation: HeaderNavigationItem[] = [
    { key: 'home', label: 'Início', icon: faHome, href: '/', active: true },
    { key: 'products', label: 'Produtos', href: '/products' },
    { key: 'about', label: 'Sobre', href: '/about' },
    { key: 'contact', label: 'Contato', href: '/contact' },
];

const dashboardNavigation: HeaderNavigationItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: faChartBar, href: '/dashboard', active: true },
    { key: 'users', label: 'Usuários', icon: faUsers, href: '/users' },
    { key: 'products', label: 'Produtos', icon: faBox, href: '/products' },
    { key: 'settings', label: 'Configurações', icon: faCog, href: '/settings' },
];

// Header básico genérico
export const Default: Story = {
    args: {
        logo: {
            text: 'MeuApp',
            icon: faBox
        },
        navigation: [
            { key: 'home', label: 'Início', icon: faHome, href: '/' }
        ],
        actionButton: {
            label: 'Entrar',
            variant: 'primary'
        }
    },
};

// Header completo para landing page
export const LandingPage: Story = {
    args: {
        logo: {
            text: 'MinhaMarca',
            icon: faBox
        },
        navigation: basicNavigation,
        actionButton: {
            label: 'Começar Agora',
            variant: 'primary'
        }
    },
};

// Header para dashboard/admin
export const Dashboard: Story = {
    args: {
        logo: {
            text: 'Admin Panel'
        },
        navigation: dashboardNavigation,
        actionButton: {
            label: 'João Silva',
            variant: 'secondary',
            icon: faUser
        }
    },
};

// Header com logo de imagem
export const WithImageLogo: Story = {
    args: {
        logo: {
            image: 'https://via.placeholder.com/120x32/2563eb/ffffff?text=LOGO',
            text: 'Fallback Text',
            href: '/'
        },
        navigation: basicNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
            icon: faSignInAlt
        }
    },
};

// Header SaaS
export const SaaSApp: Story = {
    args: {
        logo: {
            text: 'DataFlow',
            icon: faChartBar
        },
        navigation: [
            { key: 'dashboard', label: 'Dashboard', icon: faHome, active: true },
            { key: 'analytics', label: 'Analytics', icon: faChartBar },
            { key: 'team', label: 'Equipe', icon: faUsers },
            { key: 'settings', label: 'Configurações', icon: faCog },
        ],
        actionButton: {
            label: 'Upgrade',
            variant: 'primary'
        }
    },
};

// Header e-commerce
export const ECommerce: Story = {
    args: {
        logo: {
            text: 'ShopCenter',
            icon: faBox
        },
        navigation: [
            { key: 'home', label: 'Home', href: '/' },
            { key: 'products', label: 'Produtos', href: '/products' },
            { key: 'categories', label: 'Categorias', href: '/categories' },
            { key: 'deals', label: 'Ofertas', href: '/deals' },
        ],
        actionButton: {
            label: 'Minha Conta',
            variant: 'ghost',
            icon: faUser
        }
    },
};

// Header transparente para hero sections
export const Transparent: Story = {
    args: {
        logo: {
            text: 'StartupName',
            icon: faBox
        },
        navigation: [
            { key: 'home', label: 'Home', href: '/' },
            { key: 'features', label: 'Recursos', href: '/features' },
            { key: 'pricing', label: 'Preços', href: '/pricing' },
            { key: 'contact', label: 'Contato', href: '/contact' },
        ],
        actionButton: {
            label: 'Teste Grátis',
            variant: 'primary'
        },
        variant: 'transparent'
    },
    decorators: [
        (Story) => (
            <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '100vh',
                color: 'white'
            }}>
                <Story />
                <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <h1 style={{ margin: '2rem 0', color: 'white', fontSize: '3rem' }}>
                        Bem-vindo ao Futuro
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem' }}>
                        Header transparente funcionando perfeitamente sobre backgrounds
                    </p>
                </div>
            </div>
        ),
    ],
};

// Header minimalista
export const Minimal: Story = {
    args: {
        logo: {
            text: 'Simple'
        },
        navigation: [
            { key: 'work', label: 'Trabalhos' },
            { key: 'about', label: 'Sobre' },
            { key: 'contact', label: 'Contato' },
        ],
        actionButton: null
    },
};

// Header sticky para demonstrar scroll
export const Sticky: Story = {
    args: {
        logo: {
            text: 'StickyApp',
            icon: faBox
        },
        navigation: dashboardNavigation,
        actionButton: {
            label: 'Perfil',
            variant: 'secondary',
            icon: faUser
        },
        sticky: true
    },
    decorators: [
        (Story) => (
            <div>
                <Story />
                <div style={{ height: '200vh', padding: '2rem' }}>
                    <h2>Conteúdo da página</h2>
                    <p><strong>Role para baixo para ver o header sticky funcionando!</strong></p>
                    {Array.from({ length: 100 }, (_, i) => (
                        <p key={i}>
                            Linha {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    ))}
                </div>
            </div>
        ),
    ],
};

// Demonstração do menu mobile
export const MobileMenu: Story = {
    args: {
        logo: {
            text: 'MobileApp',
            icon: faBox
        },
        navigation: [
            { key: 'home', label: 'Início', icon: faHome, active: true },
            { key: 'products', label: 'Produtos', icon: faBox },
            { key: 'users', label: 'Usuários', icon: faUsers },
            { key: 'analytics', label: 'Relatórios', icon: faChartBar },
            { key: 'settings', label: 'Configurações', icon: faCog },
            { key: 'help', label: 'Ajuda', icon: faQuestionCircle },
        ],
        actionButton: {
            label: 'Perfil',
            variant: 'primary',
            icon: faUser
        }
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

// Demonstração específica para tablet
export const TabletView: Story = {
    args: {
        logo: {
            text: 'TabletApp',
            icon: faBox
        },
        navigation: [
            { key: 'dashboard', label: 'Dashboard', icon: faHome, active: true },
            { key: 'projects', label: 'Projetos', icon: faBox },
            { key: 'team', label: 'Equipe', icon: faUsers },
            { key: 'reports', label: 'Relatórios', icon: faChartBar },
            { key: 'settings', label: 'Configurações', icon: faCog },
        ],
        actionButton: {
            label: 'João Silva',
            variant: 'secondary',
            icon: faUser
        }
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
};

// Demonstração específica para tablet em portrait
export const TabletPortrait: Story = {
    args: {
        logo: {
            text: 'PortraitApp',
            icon: faBox
        },
        navigation: [
            { key: 'home', label: 'Início', icon: faHome, active: true },
            { key: 'products', label: 'Produtos', icon: faBox },
            { key: 'users', label: 'Usuários', icon: faUsers },
            { key: 'analytics', label: 'Analytics', icon: faChartBar },
            { key: 'notifications', label: 'Notificações', icon: faBell },
            { key: 'settings', label: 'Configurações', icon: faCog },
        ],
        actionButton: {
            label: 'João S.',
            variant: 'primary',
            icon: faUser
        }
    },
    parameters: {
        viewport: {
            defaultViewport: 'ipad',
        },
    },
};

// Header sem menu mobile (para casos específicos)
export const NoMobileMenu: Story = {
    args: {
        logo: {
            text: 'SimpleApp'
        },
        navigation: [
            { key: 'home', label: 'Home' },
            { key: 'about', label: 'Sobre' },
        ],
        actionButton: {
            label: 'Contato',
            variant: 'ghost'
        },
        showMobileMenu: false
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

// Header com interações completas
export const Interactive: Story = {
    render: () => {
        const handleNavigationClick = (item: HeaderNavigationItem) => {
            alert(`Navegando para: ${item.label}`);
        };

        const handleActionClick = () => {
            alert('Botão de ação clicado!');
        };

        const handleLogoClick = () => {
            alert('Logo clicado - voltando ao início');
        };

        return (
            <Header
                logo={{
                    text: 'InteractiveApp',
                    icon: faBox
                }}
                navigation={[
                    { key: 'dashboard', label: 'Dashboard', icon: faHome },
                    { key: 'projects', label: 'Projetos', icon: faBox },
                    { key: 'team', label: 'Equipe', icon: faUsers },
                    { key: 'notifications', label: 'Notificações', icon: faBell },
                ]}
                actionButton={{
                    label: 'Meu Perfil',
                    variant: 'secondary',
                    icon: faUser
                }}
                onNavigationClick={handleNavigationClick}
                onActionClick={handleActionClick}
                onLogoClick={handleLogoClick}
            />
        );
    },
};

// Showcase de diferentes variantes
export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h3 style={{ marginBottom: '1rem', padding: '0 1rem' }}>Header Padrão</h3>
                <Header
                    logo={{ text: 'Padrão', icon: faBox }}
                    navigation={[{ key: 'home', label: 'Início', icon: faHome }]}
                    actionButton={{ label: 'Primário', variant: 'primary' }}
                />
            </div>
            
            <div>
                <h3 style={{ marginBottom: '1rem', padding: '0 1rem' }}>Com Botão Secundário</h3>
                <Header
                    logo={{ text: 'Secundário', icon: faUsers }}
                    navigation={[{ key: 'dashboard', label: 'Dashboard', icon: faChartBar }]}
                    actionButton={{ label: 'Secundário', variant: 'secondary', icon: faUser }}
                />
            </div>
            
            <div>
                <h3 style={{ marginBottom: '1rem', padding: '0 1rem' }}>Com Botão Ghost</h3>
                <Header
                    logo={{ text: 'Ghost', icon: faCog }}
                    navigation={[{ key: 'settings', label: 'Configurações', icon: faCog }]}
                    actionButton={{ label: 'Ghost', variant: 'ghost', icon: faQuestionCircle }}
                />
            </div>
            
            <div>
                <h3 style={{ marginBottom: '1rem', padding: '0 1rem' }}>Sem Botão de Ação</h3>
                <Header
                    logo={{ text: 'Minimalista' }}
                    navigation={[
                        { key: 'home', label: 'Home' },
                        { key: 'about', label: 'Sobre' }
                    ]}
                    actionButton={null}
                />
            </div>
        </div>
    ),
};

// Exemplo real de uso - FormsSaúde
export const FormsSaudeExample: Story = {
    args: {
        logo: {
            text: 'FormsSaúde',
            icon: faFileAlt,
            href: '/'
        },
        navigation: [
            { key: 'home', label: 'Início', icon: faHome, href: '/', active: true }
        ],
        actionButton: {
            label: 'Efetuar Login',
            variant: 'primary'
        }
    },
};

// Exemplo completo de aplicação
export const CompleteApplication: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = React.useState('dashboard');

        const appNavigation = [
            { key: 'dashboard', label: 'Dashboard', icon: faHome, active: currentPage === 'dashboard' },
            { key: 'users', label: 'Usuários', icon: faUsers, active: currentPage === 'users' },
            { key: 'products', label: 'Produtos', icon: faBox, active: currentPage === 'products' },
            { key: 'analytics', label: 'Relatórios', icon: faChartBar, active: currentPage === 'analytics' },
            { key: 'settings', label: 'Configurações', icon: faCog, active: currentPage === 'settings' },
        ];

        return (
            <div>
                <Header
                    logo={{
                        text: 'MyApp',
                        icon: faBox,
                        href: '/'
                    }}
                    navigation={appNavigation}
                    actionButton={{
                        label: 'João Silva',
                        variant: 'secondary',
                        icon: faUser
                    }}
                    onNavigationClick={(item) => {
                        setCurrentPage(item.key);
                        console.log(`Navegando para: ${item.label}`);
                    }}
                    onActionClick={() => alert('Menu do usuário clicado!')}
                    onLogoClick={() => {
                        setCurrentPage('dashboard');
                        console.log('Voltando ao início');
                    }}
                    sticky
                />
                
                <div style={{ padding: '2rem', minHeight: '100vh', background: '#f8f9fa' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h1 style={{ marginBottom: '1rem' }}>
                            {appNavigation.find(nav => nav.active)?.label || 'Página'}
                        </h1>
                        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                            Esta é a página {appNavigation.find(nav => nav.active)?.label.toLowerCase()}. 
                            Use a navegação no header para trocar de página.
                        </p>
                        
                        <div style={{ 
                            background: 'white', 
                            padding: '2rem', 
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb'
                        }}>
                            <h2>Conteúdo da página</h2>
                            <p>
                                O header funciona perfeitamente com navegação dinâmica e 
                                menu mobile responsivo. Teste redimensionando a janela!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};