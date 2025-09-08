import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
    Card,
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
    faPaperclip
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
- 7 variantes visuais (default, outlined, elevated, filled, gradient, header-colored, dashed)
- 3 tamanhos diferentes (small, medium, large)
- Suporte completo a ícones FontAwesome
- Efeitos hover opcionais
- Suporte completo a acessibilidade
- Componentes auxiliares para estruturação do conteúdo
- Componentes de ação e status integrados
- Header colorido customizável
- Bordas pontilhadas com cores e larguras configuráveis
        `
            }
        }
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'outlined', 'elevated', 'filled', 'gradient', 'header-colored', 'dashed'],
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
                <CardContent>Card com fundo gradiente</CardContent>
            </Card>

            <Card variant="header-colored" headerColor="primary">
                <CardTitle icon={faTag}>Header Colored</CardTitle>
                <CardContent>Card com header colorido</CardContent>
            </Card>

            <Card variant="dashed" dashedColor="primary">
                <CardTitle icon={faTag}>Dashed</CardTitle>
                <CardContent>Card com borda pontilhada</CardContent>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Diferentes variantes visuais disponíveis para o card.'
            }
        }
    }
};

// Cards com header colorido
export const HeaderColored: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Card variant="header-colored" headerColor="primary" headerHeight={8}>
                <CardTitle>NR1</CardTitle>
                <CardContent>
                    Avaliação da saúde mental dos colaboradores e da gestão organizacional.
                </CardContent>
                <CardFooter>
                    <CardAction variant="primary" icon={faChevronRight} iconPosition="right">
                        Acesse aqui
                    </CardAction>
                </CardFooter>
            </Card>

            <Card variant="header-colored" headerColor="success" headerHeight={6}>
                <CardTitle>Projeto Concluído</CardTitle>
                <CardContent>
                    Todas as tarefas foram finalizadas com sucesso e o projeto está pronto para produção.
                </CardContent>
                <CardFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardStatus variant="success" icon={faCheck}>Completo</CardStatus>
                        <CardAction icon={faEye}>Ver detalhes</CardAction>
                    </div>
                </CardFooter>
            </Card>

            <Card variant="header-colored" headerColor="warning" headerHeight={5}>
                <CardTitle>Atenção Necessária</CardTitle>
                <CardContent>
                    Este item requer revisão antes de prosseguir para a próxima etapa do processo.
                </CardContent>
                <CardFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardStatus variant="warning" icon={faExclamationTriangle}>Pendente</CardStatus>
                        <CardAction variant="primary">Revisar</CardAction>
                    </div>
                </CardFooter>
            </Card>

            <Card variant="header-colored" headerColor="danger" headerHeight={4}>
                <CardTitle>Erro Crítico</CardTitle>
                <CardContent>
                    Foi detectado um problema que precisa ser corrigido imediatamente.
                </CardContent>
                <CardFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardStatus variant="error" icon={faTimes}>Erro</CardStatus>
                        <CardAction variant="primary">Corrigir</CardAction>
                    </div>
                </CardFooter>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Cards com headers coloridos em diferentes cores e alturas.'
            }
        }
    }
};

// Cards com bordas pontilhadas
export const Dashed: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Card variant="dashed" hover onClick={action('upload-clicked')}>
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <FontAwesomeIcon icon={faCloudUpload} style={{ fontSize: '3rem', color: '#9ca3af', marginBottom: '1rem' }} />
                    <CardTitle>Upload de Arquivo</CardTitle>
                    <CardContent>
                        Clique ou arraste um arquivo aqui para fazer upload
                    </CardContent>
                </div>
            </Card>

            <Card variant="dashed" dashedColor="primary" hover>
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1rem' }} />
                    <CardTitle>Adicionar Item</CardTitle>
                    <CardContent>
                        Clique para adicionar um novo item à lista
                    </CardContent>
                </div>
            </Card>

            <Card variant="dashed" dashedColor="success" hover>
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <FontAwesomeIcon icon={faFileAlt} style={{ fontSize: '2rem', color: '#059669', marginBottom: '1rem' }} />
                    <CardTitle>Novo Documento</CardTitle>
                    <CardContent>
                        Criar um novo documento do zero
                    </CardContent>
                </div>
            </Card>

            <Card variant="dashed" dashedColor="warning" dashedWidth="thick" hover>
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <FontAwesomeIcon icon={faImage} style={{ fontSize: '2rem', color: '#d97706', marginBottom: '1rem' }} />
                    <CardTitle>Upload de Imagem</CardTitle>
                    <CardContent>
                        Formatos suportados: JPG, PNG, GIF
                    </CardContent>
                </div>
            </Card>

            <Card variant="dashed" dashedColor="danger" dashedWidth="thin">
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <FontAwesomeIcon icon={faVideo} style={{ fontSize: '2rem', color: '#dc2626', marginBottom: '1rem' }} />
                    <CardTitle>Upload de Vídeo</CardTitle>
                    <CardContent>
                        Formatos suportados: MP4, AVI, MOV
                    </CardContent>
                </div>
                <CardFooter>
                    <CardAction variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Selecionar Arquivo
                    </CardAction>
                </CardFooter>
            </Card>

            <Card variant="dashed" dashedColor="info" hover>
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <FontAwesomeIcon icon={faMusic} style={{ fontSize: '2rem', color: '#0ea5e9', marginBottom: '1rem' }} />
                    <CardTitle>Upload de Áudio</CardTitle>
                    <CardContent>
                        Formatos suportados: MP3, WAV, OGG
                    </CardContent>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Cards com bordas pontilhadas ideais para upload, criação de conteúdo e placeholders.'
            }
        }
    }
};

// Card de produto
export const ProductCard: Story = {
    render: () => (
        <Card variant="outlined" hover style={{ maxWidth: '320px' }}>
            <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '-1.5rem -1.5rem 1rem -1.5rem',
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem'
            }}>
                <FontAwesomeIcon icon={faShoppingCart} />
            </div>

            <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <CardTitle>Smartphone Pro</CardTitle>
                        <CardSubtitle>128GB • Preto</CardSubtitle>
                    </div>
                    <CardStatus variant="success" icon={faCheck}>
                        Em estoque
                    </CardStatus>
                </div>
            </CardHeader>

            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <FontAwesomeIcon icon={faDollarSign} className="card-icon card-icon--primary" />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                        R$ 1.299,90
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FontAwesomeIcon icon={faStar} className="card-icon card-icon--warning" />
                        4.8
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FontAwesomeIcon icon={faEye} />
                        1.2k visualizações
                    </span>
                </div>
            </CardContent>

            <CardFooter className="card-footer--actions">
                <CardAction icon={faHeart} variant="ghost" size="small">
                    Favoritar
                </CardAction>
                <CardAction icon={faShoppingCart} variant="primary">
                    Comprar
                </CardAction>
            </CardFooter>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Exemplo de card de produto com ícones, status e ações.'
            }
        }
    }
};

// Card de post/artigo
export const PostCard: Story = {
    render: () => (
        <Card variant="default" hover style={{ maxWidth: '400px' }}>
            <CardHeader icon={faCalendar} iconPosition="left">
                <CardTitle>Como usar React Hooks</CardTitle>
                <CardSubtitle>Publicado há 2 horas</CardSubtitle>
            </CardHeader>

            <CardContent>
                <p style={{ marginBottom: '1rem' }}>
                    Aprenda as melhores práticas para usar React Hooks em seus projetos e
                    como eles podem simplificar o gerenciamento de estado.
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                        background: '#e0e7ff',
                        color: '#3730a3',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <FontAwesomeIcon icon={faTag} />
                        React
                    </span>
                    <span style={{
                        background: '#f0fdf4',
                        color: '#166534',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <FontAwesomeIcon icon={faTag} />
                        JavaScript
                    </span>
                </div>
            </CardContent>

            <CardFooter className="card-footer--actions card-footer--space-between">
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FontAwesomeIcon icon={faEye} />
                        1.2k
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FontAwesomeIcon icon={faComment} />
                        24
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FontAwesomeIcon icon={faHeart} />
                        89
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <CardAction icon={faBookmark} variant="ghost" size="small" children={undefined} />
                    <CardAction icon={faShare} variant="ghost" size="small" children={undefined} />
                    <CardAction icon={faExternalLinkAlt} variant="primary" size="small">
                        Ler mais
                    </CardAction>
                </div>
            </CardFooter>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Card de post/artigo com métricas de engajamento e ações.'
            }
        }
    }
};

// Card de perfil
export const ProfileCard: Story = {
    render: () => (
        <Card variant="gradient" style={{ maxWidth: '300px' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    margin: '0 auto 1rem auto',
                    border: '4px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                    <FontAwesomeIcon icon={faUser} />
                </div>

                <CardTitle>Maria Silva</CardTitle>
                <CardSubtitle>Desenvolvedora Frontend</CardSubtitle>
            </div>

            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FontAwesomeIcon icon={faMapPin} className="card-icon card-icon--muted" />
                        São Paulo, SP
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FontAwesomeIcon icon={faEnvelope} className="card-icon card-icon--muted" />
                        maria@email.com
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FontAwesomeIcon icon={faGlobe} className="card-icon card-icon--muted" />
                        github.com/maria
                    </div>
                </div>
            </CardContent>

            <CardFooter className="card-footer--actions card-footer--center">
                <CardAction icon={faEnvelope} variant="primary" size="small">
                    Contato
                </CardAction>
                <CardAction icon={faUser} variant="ghost" size="small">
                    Ver perfil
                </CardAction>
            </CardFooter>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Card de perfil com informações de contato e ações.'
            }
        }
    }
};

// Cards com status
export const WithStatus: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <Card variant="outlined">
                <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardTitle icon={faCheck}>Task Concluída</CardTitle>
                        <CardStatus variant="success" icon={faCheck}>Completo</CardStatus>
                    </div>
                </CardHeader>
                <CardContent>
                    A implementação do componente Card foi finalizada com sucesso.
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardTitle icon={faExclamationTriangle}>Atenção Necessária</CardTitle>
                        <CardStatus variant="warning" icon={faExclamationTriangle}>Pendente</CardStatus>
                    </div>
                </CardHeader>
                <CardContent>
                    Esta tarefa requer revisão antes de prosseguir para a próxima etapa.
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardTitle icon={faTimes}>Erro Detectado</CardTitle>
                        <CardStatus variant="error" icon={faTimes}>Falhou</CardStatus>
                    </div>
                </CardHeader>
                <CardContent>
                    Ocorreu um erro durante o processamento que precisa ser corrigido.
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardTitle icon={faInfo}>Informação</CardTitle>
                        <CardStatus variant="info" icon={faInfo}>Novo</CardStatus>
                    </div>
                </CardHeader>
                <CardContent>
                    Nova funcionalidade disponível para uso em produção.
                </CardContent>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Cards demonstrando diferentes tipos de status com ícones e cores.'
            }
        }
    }
};

// Card de evento
export const EventCard: Story = {
    render: () => (
        <Card variant="elevated" hover style={{ maxWidth: '350px' }}>
            <CardHeader icon={faCalendar}>
                <CardTitle>Workshop React Avançado</CardTitle>
                <CardSubtitle>Evento online gratuito</CardSubtitle>
            </CardHeader>

            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FontAwesomeIcon icon={faClock} className="card-icon card-icon--muted" />
                        <span style={{ fontSize: '0.875rem' }}>15 de Março, 2024 • 14:00-18:00</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FontAwesomeIcon icon={faMapPin} className="card-icon card-icon--muted" />
                        <span style={{ fontSize: '0.875rem' }}>Online via Zoom</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FontAwesomeIcon icon={faUser} className="card-icon card-icon--muted" />
                        <span style={{ fontSize: '0.875rem' }}>156 inscritos</span>
                    </div>
                </div>

                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Aprenda técnicas avançadas de React incluindo hooks customizados,
                    otimização de performance e padrões de arquitetura.
                </p>
            </CardContent>

            <CardFooter className="card-footer--actions card-footer--space-between">
                <CardStatus variant="success" icon={faCheck}>
                    Gratuito
                </CardStatus>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <CardAction icon={faShare} variant="ghost" size="small" children={undefined} />
                    <CardAction icon={faPlus} variant="primary">
                        Inscrever-se
                    </CardAction>
                </div>
            </CardFooter>
        </Card>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Card de evento com informações detalhadas e ações de inscrição.'
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