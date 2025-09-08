import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { DropdownItem } from './Dropdown.types';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faCog,
    faSignOutAlt,
    faEdit,
    faCopy,
    faTrash,
    faEllipsisV,
    faPlus,
    faDownload,
    faShare,
    faBookmark,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Dropdown> = {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        trigger: {
            control: 'select',
            options: ['click', 'hover', 'contextMenu'],
        },
        placement: {
            control: 'select',
            options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left', 'right'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Items de exemplo
const userMenuItems: DropdownItem[] = [
    { key: 'profile', label: 'Meu Perfil', icon: faUser },
    { key: 'settings', label: 'Configurações', icon: faCog },
    { key: 'divider-1', type: 'divider' }, // Sem label
    { key: 'logout', label: 'Sair', icon: faSignOutAlt, danger: true },
];

const contextMenuItems: DropdownItem[] = [
    { key: 'edit', label: 'Editar', icon: faEdit },
    { key: 'copy', label: 'Copiar', icon: faCopy },
    { key: 'divider-1', type: 'divider' }, // Sem label
    { key: 'delete', label: 'Excluir', icon: faTrash, danger: true },
];

const actionMenuItems: DropdownItem[] = [
    { key: 'header-1', type: 'header', label: 'Ações' },
    { key: 'download', label: 'Baixar', icon: faDownload, description: 'Salvar arquivo localmente' },
    { key: 'share', label: 'Compartilhar', icon: faShare, description: 'Enviar para outros usuários' },
    { key: 'bookmark', label: 'Favoritar', icon: faBookmark, description: 'Adicionar aos favoritos' },
    { key: 'divider-1', type: 'divider' }, // Sem label
    { key: 'delete', label: 'Excluir', icon: faTrash, danger: true, description: 'Remover permanentemente' },
];

// Stories básicas
export const Default: Story = {
    args: {
        items: userMenuItems,
        children: (
            <Button variant="primary">
                Clique aqui
            </Button>
        ),
    },
};

export const UserMenu: Story = {
    render: () => (
        <Dropdown
            items={userMenuItems}
            onSelect={(item) => console.log('Selected:', item)}
        >
            <Button variant="ghost">
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                João Silva
                <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: '8px' }} />
            </Button>
        </Dropdown>
    ),
};

export const ActionMenu: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                flex: 1,
                minWidth: '200px'
            }}>
                <Typography variant="h4" style={{ margin: '0 0 0.5rem 0' }}>
                    Documento.pdf
                </Typography>
                <Typography variant="caption" color="secondary">
                    Atualizado há 2 horas
                </Typography>
            </div>

            <Dropdown
                items={actionMenuItems}
                placement="bottom-end"
                onSelect={(item) => alert(`Ação: ${item.label}`)}
            >
                <Button variant="ghost" size="small">
                    <FontAwesomeIcon icon={faEllipsisV} />
                </Button>
            </Dropdown>
        </div>
    ),
};

export const ContextMenu: Story = {
    render: () => (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                Clique com o botão direito no card abaixo para ver o menu de contexto
            </Typography>

            <Dropdown
                items={contextMenuItems}
                trigger="contextMenu"
                onSelect={(item) => alert(`Ação: ${item.label}`)}
            >
                <div style={{
                    padding: '2rem',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    border: '2px dashed #ccc',
                    cursor: 'context-menu',
                    userSelect: 'none'
                }}>
                    <Typography variant="h3" style={{ margin: '0 0 0.5rem 0' }}>
                        Card de Exemplo
                    </Typography>
                    <Typography variant="body2">
                        Este é um card com menu de contexto. Clique com o botão direito!
                    </Typography>
                </div>
            </Dropdown>
        </div>
    ),
};

export const HoverMenu: Story = {
    render: () => (
        <Dropdown
            items={actionMenuItems}
            trigger="hover"
            placement="bottom-end"
            onSelect={(item) => console.log('Hover selected:', item)}
        >
            <Button variant="secondary">
                Passe o mouse aqui
                <FontAwesomeIcon icon={faEllipsisV} style={{ marginLeft: '8px' }} />
            </Button>
        </Dropdown>
    ),
};

export const MultiTrigger: Story = {
    render: () => (
        <Dropdown
            items={userMenuItems}
            trigger={['click', 'hover']}
            onSelect={(item) => console.log('Multi trigger:', item)}
        >
            <Button variant="primary">
                Clique OU passe o mouse
            </Button>
        </Dropdown>
    ),
};

export const ControlledDropdown: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedItem, setSelectedItem] = useState<string | null>(null);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Button
                        variant="secondary"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? 'Fechar Menu' : 'Abrir Menu'}
                    </Button>

                    <Dropdown
                        items={userMenuItems}
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        onSelect={(item) => {
                            setSelectedItem(item.label || '');
                            console.log('Controlled selected:', item);
                        }}
                    >
                        <Button variant="primary">
                            <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                            Menu Controlado
                        </Button>
                    </Dropdown>
                </div>

                {selectedItem && (
                    <div style={{
                        padding: '0.75rem',
                        backgroundColor: '#e7f5e7',
                        borderRadius: '4px',
                        border: '1px solid #28a745'
                    }}>
                        <Typography variant="caption">
                            Último item selecionado: <strong>{selectedItem}</strong>
                        </Typography>
                    </div>
                )}
            </div>
        );
    },
};

export const AllPlacements: Story = {
    render: () => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            padding: '4rem',
            textAlign: 'center',
            minHeight: '400px'
        }}>
            {/* Linha superior */}
            <Dropdown items={contextMenuItems} placement="top-start">
                <Button variant="ghost" size="small">Top Start</Button>
            </Dropdown>

            <div></div>

            <Dropdown items={contextMenuItems} placement="top-end">
                <Button variant="ghost" size="small">Top End</Button>
            </Dropdown>

            {/* Linha do meio */}
            <Dropdown items={contextMenuItems} placement="left">
                <Button variant="ghost" size="small">Left</Button>
            </Dropdown>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                <Typography variant="body2" color="secondary">
                    Diferentes posicionamentos
                </Typography>

                <Dropdown items={contextMenuItems} placement="bottom-start">
                    <Button variant="primary">Bottom Start</Button>
                </Dropdown>

                <Dropdown items={contextMenuItems} placement="bottom-end">
                    <Button variant="primary">Bottom End</Button>
                </Dropdown>
            </div>

            <Dropdown items={contextMenuItems} placement="right">
                <Button variant="ghost" size="small">Right</Button>
            </Dropdown>
        </div>
    ),
};

export const WithLinks: Story = {
    render: () => {
        const linkItems: DropdownItem[] = [
            { key: 'internal', label: 'Link Interno', onClick: () => alert('Link interno clicado') },
            { key: 'external', label: 'Site Externo', href: 'https://www.google.com', target: '_blank' },
            { key: 'divider-1', type: 'divider' }, // Sem label
            { key: 'same-tab', label: 'Mesma Aba', href: 'https://www.github.com' },
        ];

        return (
            <Dropdown
                items={linkItems}
                onSelect={(item) => console.log('Link selected:', item)}
            >
                <Button variant="secondary">
                    Menu com Links
                    <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: '8px' }} />
                </Button>
            </Dropdown>
        );
    },
};

export const DisabledItems: Story = {
    render: () => {
        const mixedItems: DropdownItem[] = [
            { key: 'available', label: 'Disponível', icon: faDownload },
            { key: 'disabled1', label: 'Indisponível', icon: faEdit, disabled: true },
            { key: 'available2', label: 'Também Disponível', icon: faShare },
            { key: 'divider-1', type: 'divider' }, // Sem label
            { key: 'disabled2', label: 'Ação Bloqueada', icon: faTrash, disabled: true, danger: true },
        ];

        return (
            <Dropdown
                items={mixedItems}
                onSelect={(item) => alert(`Selecionado: ${item.label}`)}
            >
                <Button variant="ghost">
                    Menu com Itens Desabilitados
                </Button>
            </Dropdown>
        );
    },
};

export const LongList: Story = {
    render: () => {
        const longItems: DropdownItem[] = [
            { key: 'header-1', type: 'header', label: 'Frutas' },
            { key: 'apple', label: 'Maçã' },
            { key: 'banana', label: 'Banana' },
            { key: 'orange', label: 'Laranja' },
            { key: 'grape', label: 'Uva' },
            { key: 'strawberry', label: 'Morango' },
            { key: 'divider-1', type: 'divider' }, // Sem label
            { key: 'header-2', type: 'header', label: 'Vegetais' },
            { key: 'carrot', label: 'Cenoura' },
            { key: 'broccoli', label: 'Brócolis' },
            { key: 'spinach', label: 'Espinafre' },
            { key: 'tomato', label: 'Tomate' },
            { key: 'lettuce', label: 'Alface' },
            { key: 'divider-2', type: 'divider' }, // Sem label
            { key: 'header-3', type: 'header', label: 'Grãos' },
            { key: 'rice', label: 'Arroz' },
            { key: 'beans', label: 'Feijão' },
            { key: 'quinoa', label: 'Quinoa' },
        ];

        return (
            <Dropdown
                items={longItems}
                maxHeight={250}
                onSelect={(item) => console.log('Selected food:', item)}
            >
                <Button variant="primary">
                    Lista Longa (com scroll)
                </Button>
            </Dropdown>
        );
    },
};

export const RealWorldExample: Story = {
    render: () => {
        const [notifications, setNotifications] = useState(3);

        const profileItems: DropdownItem[] = [
            { key: 'profile', label: 'Ver Perfil', icon: faUser },
            { key: 'settings', label: 'Configurações', icon: faCog },
            { key: 'divider-1', type: 'divider' }, // Sem label
            {
                key: 'logout',
                label: 'Sair da Conta',
                icon: faSignOutAlt,
                danger: true,
                onClick: () => {
                    if (confirm('Tem certeza que deseja sair?')) {
                        alert('Logout realizado!');
                    }
                }
            },
        ];

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
            }}>
                <Typography variant="h4">
                    Dashboard NTI
                </Typography>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Button variant="ghost" size="small">
                        🔔 {notifications}
                    </Button>

                    <Dropdown
                        items={profileItems}
                        placement="bottom-end"
                        onSelect={(item) => console.log('Profile action:', item)}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            background: 'white',
                            border: '1px solid #ddd',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#0066cc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}>
                                JS
                            </div>
                            <Typography variant="body2">João Silva</Typography>
                            <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '12px', color: '#666' }} />
                        </div>
                    </Dropdown>
                </div>
            </div>
        );
    },
}