import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { 
    faRocket, 
    faHome, 
    faInfo, 
    faEnvelope, 
    faUser,
    faShoppingCart,
    faCog,
    faSearch,
    faBell
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Header> = {
    title: 'Layout/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Componente Header responsivo com suporte a posicionamento flexível da logo em desktop e mobile.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'transparent'],
            description: 'Variante visual do header',
        },
        sticky: {
            control: 'boolean',
            description: 'Define se o header fica fixo ao fazer scroll',
        },
        showMobileMenu: {
            control: 'boolean',
            description: 'Mostra/esconde o menu mobile',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Dados reutilizáveis
const defaultNavigation = [
    { key: 'home', label: 'Home', icon: faHome, active: true },
    { key: 'about', label: 'Sobre', icon: faInfo },
    { key: 'services', label: 'Serviços' },
    { key: 'contact', label: 'Contato', icon: faEnvelope },
];

const extendedNavigation = [
    { key: 'home', label: 'Home', icon: faHome, active: true },
    { key: 'products', label: 'Produtos', icon: faShoppingCart },
    { key: 'about', label: 'Sobre', icon: faInfo },
    { key: 'services', label: 'Serviços' },
    { key: 'blog', label: 'Blog' },
    { key: 'contact', label: 'Contato', icon: faEnvelope },
];

const minimalNavigation = [
    { key: 'home', label: 'Home', active: true },
    { key: 'about', label: 'Sobre' },
];

// =============================================================================
// EXEMPLOS BÁSICOS
// =============================================================================

export const Default: Story = {
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

export const LogoComImagem: Story = {
    args: {
        logo: {
            text: 'MeuApp',
            image: 'https://via.placeholder.com/120x40/2563eb/ffffff?text=Logo',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Entrar',
            variant: 'primary',
        },
    },
};

export const SomenteTexto: Story = {
    args: {
        logo: {
            text: 'Minha Empresa',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Cadastrar',
            variant: 'primary',
        },
    },
};

export const Transparent: Story = {
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'ghost',
        },
        variant: 'transparent',
    },
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export const Sticky: Story = {
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
        sticky: true,
    },
    decorators: [
        (Story) => (
            <div>
                <Story />
                <div style={{ height: '200vh', padding: '2rem', background: 'linear-gradient(180deg, #f0f0f0 0%, #ffffff 100%)' }}>
                    <h2>Role a página para ver o header sticky</h2>
                    <p>O header permanecerá fixo no topo da página ao fazer scroll.</p>
                </div>
            </div>
        ),
    ],
};

// =============================================================================
// POSICIONAMENTO DA LOGO - DESKTOP
// =============================================================================

export const LogoEsquerdaDesktop: Story = {
    name: '🖥️ Desktop: Logo à Esquerda',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'left',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

export const LogoCentroDesktop: Story = {
    name: '🖥️ Desktop: Logo Centralizada',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'center',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

export const LogoDireitaDesktop: Story = {
    name: '🖥️ Desktop: Logo à Direita',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'right',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

// =============================================================================
// POSICIONAMENTO DA LOGO - MOBILE
// =============================================================================

export const LogoEsquerdaMobile: Story = {
    name: '📱 Mobile: Logo à Esquerda',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            mobilePosition: 'left',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const LogoCentroMobile: Story = {
    name: '📱 Mobile: Logo Centralizada',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            mobilePosition: 'center',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const LogoDireitaMobile: Story = {
    name: '📱 Mobile: Logo à Direita',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            mobilePosition: 'right',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

// =============================================================================
// ALINHAMENTO DOS ITENS DO MENU MOBILE
// =============================================================================

export const MenuMobileEsquerda: Story = {
    name: '📱 Menu Mobile: Itens à Esquerda',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            mobilePosition: 'center',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
        mobileMenuAlign: 'left',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const MenuMobileCentro: Story = {
    name: '📱 Menu Mobile: Itens Centralizados',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            mobilePosition: 'center',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
        mobileMenuAlign: 'center',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const MenuMobileDireita: Story = {
    name: '📱 Menu Mobile: Itens à Direita',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            mobilePosition: 'center',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
        mobileMenuAlign: 'right',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

// =============================================================================
// ALINHAMENTO DA NAVEGAÇÃO DESKTOP
// =============================================================================

export const NavDesktopEsquerda: Story = {
    name: '🖥️ Desktop Nav: Itens à Esquerda',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'left',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
        desktopNavAlign: 'left',
    },
};

export const NavDesktopCentro: Story = {
    name: '🖥️ Desktop Nav: Itens Centralizados',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'left',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
        desktopNavAlign: 'center',
    },
};

export const NavDesktopDireita: Story = {
    name: '🖥️ Desktop Nav: Itens à Direita',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'left',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
        desktopNavAlign: 'right',
    },
};

// =============================================================================
// COMBINAÇÕES DESKTOP + MOBILE
// =============================================================================

export const CentroDesktopEsquerdaMobile: Story = {
    name: '🔄 Centro (Desktop) + Esquerda (Mobile)',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'center',
            mobilePosition: 'left',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

export const EsquerdaDesktopCentroMobile: Story = {
    name: '🔄 Esquerda (Desktop) + Centro (Mobile)',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'left',
            mobilePosition: 'center',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

export const DireitaDesktopCentroMobile: Story = {
    name: '🔄 Direita (Desktop) + Centro (Mobile)',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            position: 'right',
            mobilePosition: 'center',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

// =============================================================================
// VARIAÇÕES DE BOTÕES DE AÇÃO
// =============================================================================

export const BotaoPrimary: Story = {
    name: '🎨 Action Button: Primary',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            icon: faUser,
            variant: 'primary',
        },
    },
};

export const BotaoSecondary: Story = {
    name: '🎨 Action Button: Secondary',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Configurações',
            icon: faCog,
            variant: 'secondary',
        },
    },
};

export const BotaoGhost: Story = {
    name: '🎨 Action Button: Ghost',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Buscar',
            icon: faSearch,
            variant: 'ghost',
        },
    },
};

export const SemBotaoAcao: Story = {
    name: '🎨 Sem Action Button',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: defaultNavigation,
        actionButton: null,
    },
};

// =============================================================================
// VARIAÇÕES DE NAVEGAÇÃO
// =============================================================================

export const NavegacaoMinima: Story = {
    name: '📋 Navegação Mínima',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: minimalNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

export const NavegacaoExtensa: Story = {
    name: '📋 Navegação Extensa',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: extendedNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

export const NavegacaoComIcones: Story = {
    name: '📋 Todos os Itens com Ícones',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: [
            { key: 'home', label: 'Home', icon: faHome, active: true },
            { key: 'products', label: 'Produtos', icon: faShoppingCart },
            { key: 'notifications', label: 'Notificações', icon: faBell },
            { key: 'settings', label: 'Configurações', icon: faCog },
        ],
        actionButton: {
            label: 'Perfil',
            icon: faUser,
            variant: 'primary',
        },
    },
};

export const SemNavegacao: Story = {
    name: '📋 Sem Navegação',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: [],
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

// =============================================================================
// CASOS DE USO REAIS
// =============================================================================

export const SiteCorporativo: Story = {
    name: '💼 Caso: Site Corporativo',
    args: {
        logo: {
            text: 'Empresa Corp',
            image: 'https://via.placeholder.com/140x40/1e3a8a/ffffff?text=EmpresaCorp',
            position: 'left',
            mobilePosition: 'center',
        },
        navigation: [
            { key: 'home', label: 'Início', active: true },
            { key: 'solutions', label: 'Soluções' },
            { key: 'about', label: 'Sobre Nós' },
            { key: 'careers', label: 'Carreiras' },
            { key: 'contact', label: 'Contato' },
        ],
        actionButton: {
            label: 'Portal do Cliente',
            variant: 'primary',
        },
        sticky: true,
    },
};

export const Ecommerce: Story = {
    name: '🛒 Caso: E-commerce',
    args: {
        logo: {
            text: 'ShopStore',
            icon: faShoppingCart,
            position: 'left',
            mobilePosition: 'left',
        },
        navigation: [
            { key: 'home', label: 'Início', active: true },
            { key: 'products', label: 'Produtos', icon: faShoppingCart },
            { key: 'deals', label: 'Ofertas' },
            { key: 'support', label: 'Suporte' },
        ],
        actionButton: {
            label: 'Minha Conta',
            icon: faUser,
            variant: 'secondary',
        },
    },
};

export const AppSaas: Story = {
    name: '⚡ Caso: SaaS App',
    args: {
        logo: {
            text: 'CloudApp',
            icon: faRocket,
            position: 'center',
            mobilePosition: 'center',
        },
        navigation: [
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'features', label: 'Recursos' },
            { key: 'pricing', label: 'Planos' },
        ],
        actionButton: {
            label: 'Começar Grátis',
            variant: 'primary',
        },
        variant: 'transparent',
    },
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export const BlogPessoal: Story = {
    name: '📝 Caso: Blog Pessoal',
    args: {
        logo: {
            text: 'Meu Blog',
            position: 'center',
            mobilePosition: 'center',
        },
        navigation: [
            { key: 'home', label: 'Início', active: true },
            { key: 'articles', label: 'Artigos' },
            { key: 'about', label: 'Sobre' },
        ],
        actionButton: {
            label: 'Newsletter',
            icon: faEnvelope,
            variant: 'ghost',
        },
        mobileMenuAlign: 'center',
    },
};

// =============================================================================
// ESTADOS E INTERAÇÕES
// =============================================================================

export const ItemDesabilitado: Story = {
    name: '🚫 Item de Navegação Desabilitado',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: [
            { key: 'home', label: 'Home', active: true },
            { key: 'about', label: 'Sobre' },
            { key: 'premium', label: 'Premium', disabled: true },
            { key: 'contact', label: 'Contato' },
        ],
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
    },
};

export const BotaoDesabilitado: Story = {
    name: '🚫 Action Button Desabilitado',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Em Manutenção',
            variant: 'primary',
            disabled: true,
        },
    },
};

export const ComCallbacks: Story = {
    name: '🎯 Com Callbacks de Interação',
    args: {
        logo: {
            text: 'MeuApp',
            icon: faRocket,
            href: '/',
        },
        navigation: defaultNavigation,
        actionButton: {
            label: 'Login',
            variant: 'primary',
        },
        onLogoClick: () => alert('Logo clicada!'),
        onNavigationClick: (item) => alert(`Navegação clicada: ${item.label}`),
        onActionClick: () => alert('Action button clicado!'),
    },
};

// =============================================================================
// COMPARAÇÃO LADO A LADO
// =============================================================================

export const ComparacaoCompleta: Story = {
    name: '📊 Comparação: Todas as Posições',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
            <div>
                <h3 style={{ marginBottom: '1rem' }}>Desktop - Logo à Esquerda</h3>
                <Header
                    logo={{ text: 'MeuApp', icon: faRocket, position: 'left' }}
                    navigation={defaultNavigation}
                    actionButton={{ label: 'Login', variant: 'primary' }}
                />
            </div>
            
            <div>
                <h3 style={{ marginBottom: '1rem' }}>Desktop - Logo Centralizada</h3>
                <Header
                    logo={{ text: 'MeuApp', icon: faRocket, position: 'center' }}
                    navigation={defaultNavigation}
                    actionButton={{ label: 'Login', variant: 'primary' }}
                />
            </div>
            
            <div>
                <h3 style={{ marginBottom: '1rem' }}>Desktop - Logo à Direita</h3>
                <Header
                    logo={{ text: 'MeuApp', icon: faRocket, position: 'right' }}
                    navigation={defaultNavigation}
                    actionButton={{ label: 'Login', variant: 'primary' }}
                />
            </div>
        </div>
    ),
};