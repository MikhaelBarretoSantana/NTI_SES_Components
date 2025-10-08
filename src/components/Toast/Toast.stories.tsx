import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Toast from './Toast';
import { ToastProps } from './Toast.types';
import React from 'react';

const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Componente Toast para exibir notificações temporárias ao usuário.'
            }
        }
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['success', 'error', 'warning', 'info'],
            description: 'Variante do toast que define a cor e ícone'
        },
        title: {
            control: 'text',
            description: 'Título do toast (opcional)'
        },
        message: {
            control: 'text',
            description: 'Mensagem principal do toast'
        },
        closable: {
            control: 'boolean',
            description: 'Se deve mostrar o botão de fechar'
        },
        autoClose: {
            control: 'boolean',
            description: 'Se o toast deve ser fechado automaticamente'
        },
        autoCloseDelay: {
            control: 'number',
            description: 'Tempo em milissegundos para fechar automaticamente'
        },
        onClose: {
            action: 'closed',
            description: 'Função chamada quando o toast é fechado'
        }
    },
    args: {
        onClose: action('toast-closed')
    }
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Story principal
export const Default: Story = {
    args: {
        variant: 'success',
        message: 'Sua solicitação foi concluída.'
    }
};

// Stories por variante
export const Success: Story = {
    args: {
        variant: 'success',
        message: 'Sua solicitação foi concluída com sucesso!'
    }
};

export const Error: Story = {
    args: {
        variant: 'error',
        message: 'Por favor, preencha o campo corretamente.'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        message: 'Atenção: Esta ação não pode ser desfeita.'
    }
};

export const Info: Story = {
    args: {
        variant: 'info',
        message: 'Nova atualização disponível.'
    }
};

// Stories com títulos customizados
export const WithCustomTitle: Story = {
    args: {
        variant: 'success',
        title: 'Operação Concluída',
        message: 'Os dados foram salvos no sistema.'
    }
};

// Stories sem botão de fechar
export const NotClosable: Story = {
    args: {
        variant: 'info',
        message: 'Esta notificação não pode ser fechada manualmente.',
        closable: false
    }
};

// Stories com auto-close
export const AutoClose: Story = {
    args: {
        variant: 'success',
        message: 'Esta notificação se fechará automaticamente em 3 segundos.',
        autoClose: true,
        autoCloseDelay: 3000
    }
};

// Story com mensagem longa
export const LongMessage: Story = {
    args: {
        variant: 'warning',
        message: 'Esta é uma mensagem muito longa para demonstrar como o componente se comporta com textos extensos. O toast deve manter sua estrutura e ser legível mesmo com conteúdo maior.'
    }
};

// Story sem título (usando título padrão)
export const WithoutCustomTitle: Story = {
    args: {
        variant: 'error',
        message: 'Erro ao processar a solicitação.'
    }
};

// Playground para testes interativos
export const Playground: Story = {
    args: {
        variant: 'success',
        title: '',
        message: 'Mensagem de exemplo',
        closable: true,
        autoClose: false,
        autoCloseDelay: 5000
    }
};

// Story mostrando múltiplos toasts
export const MultipleToasts: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
            <Toast
                variant="success"
                message="Operação realizada com sucesso!"
                onClose={action('success-closed')}
            />
            <Toast
                variant="error"
                message="Erro ao processar a solicitação."
                onClose={action('error-closed')}
            />
            <Toast
                variant="warning"
                message="Atenção: Verifique os dados antes de continuar."
                onClose={action('warning-closed')}
            />
            <Toast
                variant="info"
                message="Nova funcionalidade disponível."
                onClose={action('info-closed')}
            />
        </div>
    )
};

// Story simulando container de toasts
export const ToastContainer: Story = {
    render: () => (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                background: '#f3f4f6'
            }}
        >
            <div className="toast-container">
                <Toast
                    variant="success"
                    message="Toast em container posicionado!"
                    onClose={action('container-toast-closed')}
                />
            </div>
        </div>
    )
};