import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
    Card,
    CardIcon,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardContent,
    CardFooter,
    CardAction,
    CardStatus
} from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faCog,
    faDownload,
    faShare,
    faHeart,
    faBookmark,
    faEye,
    faComment,
    faCalendar,
    faClock,
    faMapPin,
    faEdit,
    faTrash,
    faPlus,
    faChevronRight,
    faExternalLinkAlt,
    faCheck,
    faExclamationTriangle,
    faTimes,
    faInfo,
    faStar,
    faShoppingCart,
    faTag,
    faDollarSign,
    faEnvelope,
    faPhone,
    faGlobe,
    faUpload,
    faCloudUpload,
    faFileAlt,
    faImage,
    faVideo,
    faMusic,
    faPaperclip,
    faFolder,
    faChartBar,
    faBell,
    faDatabase,
    faRocket
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
O componente Card é um container versátil para exibir conteúdo relacionado de forma agrupada. 
Oferece diferentes variações visuais, tamanhos e suporte completo a ícones FontAwesome.

## Características
- 8 variantes visuais (default, outlined, elevated, filled, gradient, header-colored, dashed, feature)
- 3 tamanhos diferentes (small, medium, large)
- Suporte completo a ícones FontAwesome
- Efeitos hover opcionais
- Suporte completo a acessibilidade
- Componentes auxiliares para estruturação do conteúdo
- Componentes de ação e status integrados
- Header colorido customizável
- Bordas pontilhadas com cores e larguras configuráveis
- CardIcon para ícones destacados em cards de feature
        `
            }
        }
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'outlined', 'elevated', 'filled', 'gradient', 'header-colored', 'dashed', 'feature'],
            description: 'Variante visual do card'
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: 'Tamanho do card'
        },
        hover: {
            control: 'boolean',
            description: 'Adiciona efeito hover'
        },
        shadow: {
            control: 'boolean',
            description: 'Controla a sombra do card'
        },
        padding: {
            control: 'boolean',
            description: 'Controla o padding interno'
        },
        headerColor: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
            description: 'Cor do header (apenas para variant header-colored)',
            if: { arg: 'variant', eq: 'header-colored' }
        },
        headerHeight: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Altura do header em pixels (apenas para variant header-colored)',
            if: { arg: 'variant', eq: 'header-colored' }
        },
        dashedColor: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
            description: 'Cor da borda pontilhada (apenas para variant dashed)',
            if: { arg: 'variant', eq: 'dashed' }
        },
        dashedWidth: {
            control: { type: 'select' },
            options: ['thin', 'normal', 'thick'],
            description: 'Largura da borda pontilhada (apenas para variant dashed)',
            if: { arg: 'variant', eq: 'dashed' }
        },
        onClick: {
            description: 'Handler para clique no card'
        },
        className: {
            control: 'text',
            description: 'Classes CSS customizadas'
        }
    },
    args: {
        variant: 'default',
        size: 'medium',
        hover: false,
        shadow: true,
        padding: true,
        headerHeight: 4,
        dashedWidth: 'normal'
    }
};

export default meta;
type Story = StoryObj<typeof Card>;

// Story básica
export const Default: Story = {
    args: {},
    render: (args) => (
        <Card {...args}>
            <CardHeader>
                <CardTitle>Card Padrão</CardTitle>
                <CardSubtitle>Este é um exemplo de card básico</CardSubtitle>
            </CardHeader>
            <CardContent>
                Conteúdo principal do card com texto de exemplo para demonstrar como o componente se comporta.
            </CardContent>
        </Card>
    )
};

// Nova Story: Feature Cards
export const FeatureCards: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <Card variant="feature" hover style={{ maxWidth: '350px' }}>
                <CardHeader>
                    <CardIcon icon={faFolder} variant="primary" />
                    <CardTitle>Relatórios</CardTitle>
                    <CardSubtitle>
                        Acompanhe as informações gerando relatórios para otimizar a gestão e gerenciar os atendimentos feitos.
                    </CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary" size="large">
                        Acesse aqui
                    </CardAction>
                </CardFooter>
            </Card>

            <Card variant="feature" hover style={{ maxWidth: '350px' }}>
                <CardHeader>
                    <CardIcon icon={faChartBar} variant="success" />
                    <CardTitle>Análises</CardTitle>
                    <CardSubtitle>
                        Visualize métricas detalhadas e insights sobre seu negócio em tempo real.
                    </CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary" size="large">
                        Ver análises
                    </CardAction>
                </CardFooter>
            </Card>

            <Card variant="feature" hover style={{ maxWidth: '350px' }}>
                <CardHeader>
                    <CardIcon icon={faBell} variant="warning" />
                    <CardTitle>Notificações</CardTitle>
                    <CardSubtitle>
                        Mantenha-se atualizado com alertas e notificações importantes do sistema.
                    </CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary" size="large">
                        Configurar
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Cards de feature com ícones destacados, ideal para páginas de destino e dashboards.'
            }
        }
    }
};

// Feature Card com cor customizada
export const FeatureCardCustomColors: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <Card variant="feature" hover style={{ maxWidth: '350px' }}>
                <CardHeader>
                    <CardIcon 
                        icon={faDatabase} 
                        backgroundColor="#8b5cf6" 
                        iconColor="#ffffff"
                    />
                    <CardTitle>Backup Automático</CardTitle>
                    <CardSubtitle>
                        Seus dados estão sempre seguros com backups automáticos diários.
                    </CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary" size="large">
                        Ativar agora
                    </CardAction>
                </CardFooter>
            </Card>

            <Card variant="feature" hover style={{ maxWidth: '350px' }}>
                <CardHeader>
                    <CardIcon 
                        icon={faRocket} 
                        backgroundColor="#ec4899" 
                        iconColor="#ffffff"
                    />
                    <CardTitle>Modo Turbo</CardTitle>
                    <CardSubtitle>
                        Acelere seu trabalho com nossa nova funcionalidade de alta performance.
                    </CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary" size="large">
                        Experimentar
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Feature cards com cores customizadas no ícone usando backgroundColor e iconColor.'
            }
        }
    }
};

// Feature Cards em diferentes tamanhos
export const FeatureCardSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Card variant="feature" size="small" hover style={{ maxWidth: '280px' }}>
                <CardHeader>
                    <CardIcon icon={faUser} variant="primary" />
                    <CardTitle>Pequeno</CardTitle>
                    <CardSubtitle>Card de feature em tamanho pequeno</CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary" size="small">
                        Acessar
                    </CardAction>
                </CardFooter>
            </Card>

            <Card variant="feature" size="medium" hover style={{ maxWidth: '320px' }}>
                <CardHeader>
                    <CardIcon icon={faUser} variant="primary" />
                    <CardTitle>Médio</CardTitle>
                    <CardSubtitle>Card de feature em tamanho médio (padrão)</CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary" size="medium">
                        Acessar
                    </CardAction>
                </CardFooter>
            </Card>

            <Card variant="feature" size="large" hover style={{ maxWidth: '380px' }}>
                <CardHeader>
                    <CardIcon icon={faUser} variant="primary" />
                    <CardTitle>Grande</CardTitle>
                    <CardSubtitle>Card de feature em tamanho grande para destaque extra</CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary" size="large">
                        Acessar
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Feature cards em diferentes tamanhos (small, medium, large).'
            }
        }
    }
};

// Cards com ícones
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Card variant="outlined">
                <CardHeader icon={faUser}>
                    <CardTitle>Perfil do Usuário</CardTitle>
                    <CardSubtitle>Informações pessoais</CardSubtitle>
                </CardHeader>
                <CardContent>
                    Gerencie suas informações pessoais e preferências de conta.
                </CardContent>
                <CardFooter>
                    <CardAction icon={faEdit} variant="primary">
                        Editar Perfil
                    </CardAction>
                </CardFooter>
            </Card>

            <Card variant="elevated">
                <CardTitle icon={faCog} iconPosition="right">
                    Configurações
                </CardTitle>
                <CardContent>
                    Ajuste as configurações do sistema conforme suas necessidades.
                </CardContent>
                <CardFooter>
                    <CardAction icon={faChevronRight} iconPosition="right" variant="ghost">
                        Acessar
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Cards demonstrando o uso de ícones em headers, títulos e ações.'
            }
        }
    }
};

// Variantes visuais
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Card variant="default">
                <CardTitle icon={faTag}>Default</CardTitle>
                <CardContent>Card com estilo padrão</CardContent>
            </Card>

            <Card variant="outlined">
                <CardTitle icon={faTag}>Outlined</CardTitle>
                <CardContent>Card com borda destacada</CardContent>
            </Card>

            <Card variant="elevated">
                <CardTitle icon={faTag}>Elevated</CardTitle>
                <CardContent>Card com sombra elevada</CardContent>
            </Card>

            <Card variant="filled">
                <CardTitle icon={faTag}>Filled</CardTitle>
                <CardContent>Card com fundo preenchido</CardContent>
            </Card>

            <Card variant="gradient">
                <CardTitle icon={faTag}>Gradient</CardTitle>
                <CardContent>Card com gradiente</CardContent>
            </Card>

            <Card variant="header-colored" headerColor="primary">
                <CardTitle icon={faTag}>Header Colored</CardTitle>
                <CardContent>Card com header colorido</CardContent>
            </Card>

            <Card variant="dashed" dashedColor="primary">
                <CardTitle icon={faTag}>Dashed</CardTitle>
                <CardContent>Card com borda pontilhada</CardContent>
            </Card>

            <Card variant="feature">
                <CardHeader>
                    <CardIcon icon={faTag} variant="primary" />
                    <CardTitle>Feature</CardTitle>
                    <CardSubtitle>Card focado em ação</CardSubtitle>
                </CardHeader>
                <CardFooter>
                    <CardAction variant="primary">Ver mais</CardAction>
                </CardFooter>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Todas as variantes visuais disponíveis do componente Card.'
            }
        }
    }
};

// Grid de cards
export const Grid: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
                { icon: faUser, title: 'Usuários', value: '1,234', color: '#3b82f6' },
                { icon: faShoppingCart, title: 'Vendas', value: '567', color: '#059669' },
                { icon: faDollarSign, title: 'Receita', value: 'R$ 89k', color: '#d97706' },
                { icon: faEye, title: 'Visualizações', value: '12.3k', color: '#dc2626' },
                { icon: faHeart, title: 'Curtidas', value: '890', color: '#ec4899' },
                { icon: faDownload, title: 'Downloads', value: '456', color: '#8b5cf6' },
            ].map((item, index) => (
                <Card key={index} hover variant={index % 2 === 0 ? 'outlined' : 'default'}>
                    <CardHeader>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CardTitle>{item.title}</CardTitle>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                background: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: item.color }}>
                            {item.value}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                            <FontAwesomeIcon icon={faChevronRight} style={{ marginRight: '0.25rem' }} />
                            Ver detalhes
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Grid de cards com ícones, métricas e cores temáticas.'
            }
        }
    }
};

// Card interativo completo
export const Interactive: Story = {
    render: () => (
        <Card
            variant="outlined"
            hover
            onClick={action('card-clicked')}
            style={{ maxWidth: '400px' }}
        >
            <CardHeader icon={faDownload} iconPosition="right">
                <CardTitle>Relatório Mensal</CardTitle>
                <CardSubtitle>Dados de vendas - Fevereiro 2024</CardSubtitle>
            </CardHeader>

            <CardContent>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                            <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '0.25rem' }} />
                            R$ 45.2k
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Receita</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '0.25rem' }} />
                            1,234
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Vendas</div>
                    </div>
                </div>

                <CardStatus variant="success" icon={faCheck}>
                    Todos os dados foram verificados
                </CardStatus>
            </CardContent>

            <CardFooter className="card-footer--actions card-footer--end">
                <CardAction icon={faShare} variant="ghost" size="small">
                    Compartilhar
                </CardAction>
                <CardAction icon={faDownload} variant="primary">
                    Download PDF
                </CardAction>
            </CardFooter>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Card interativo completo com clique, ícones, status e ações.'
            }
        }
    }
};

// Story para playground do Storybook
export const Playground: Story = {
    args: {
        variant: 'default',
        size: 'medium',
        hover: false,
        shadow: true,
        padding: true,
        headerColor: 'primary',
        headerHeight: 4,
        dashedColor: 'primary',
        dashedWidth: 'normal'
    },
    render: (args) => (
        <Card {...args} style={{ maxWidth: '400px' }}>
            <CardHeader>
                <CardTitle>Card Customizável</CardTitle>
                <CardSubtitle>Use os controles para testar diferentes configurações</CardSubtitle>
            </CardHeader>
            <CardContent>
                Este card permite testar todas as props disponíveis através dos controles do Storybook.
                Experimente diferentes variantes, cores e configurações para ver como o componente se comporta.
            </CardContent>
            <CardFooter>
                <CardAction variant="primary">
                    Ação Principal
                </CardAction>
            </CardFooter>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Playground para testar todas as configurações do componente Card.'
            }
        }
    }
};