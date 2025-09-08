import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import React, { useState } from 'react';

const meta: Meta<typeof Pagination> = {
    title: 'Components/Pagination',
    component: Pagination,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        variant: {
            control: 'select',
            options: ['default', 'outlined', 'minimal'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// História básica
export const Default: Story = {
    args: {
        currentPage: 1,
        totalPages: 10,
        onPageChange: (page) => console.log('Page changed to:', page),
    },
};

// Paginação simples
export const Simple: Story = {
    args: {
        currentPage: 3,
        totalPages: 5,
        showFirstLast: false,
        showInfo: false,
        onPageChange: (page) => console.log('Page changed to:', page),
    },
};

// Paginação completa com informações
export const WithInfo: Story = {
    args: {
        currentPage: 2,
        totalPages: 8,
        showInfo: true,
        totalItems: 156,
        pageSize: 20,
        onPageChange: (page) => console.log('Page changed to:', page),
    },
};

// Com seletor de itens por página
export const WithPageSize: Story = {
    args: {
        currentPage: 1,
        totalPages: 20,
        showInfo: true,
        totalItems: 500,
        pageSize: 25,
        itemsPerPageOptions: [10, 25, 50, 100],
        onPageChange: (page) => console.log('Page changed to:', page),
        onPageSizeChange: (size) => console.log('Page size changed to:', size),
    },
};

// Com jump to page
export const WithJumper: Story = {
    args: {
        currentPage: 5,
        totalPages: 50,
        showJumper: true,
        showInfo: true,
        totalItems: 1000,
        pageSize: 20,
        onPageChange: (page) => console.log('Page changed to:', page),
    },
};

// Tamanhos diferentes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Small</h4>
                <Pagination
                    currentPage={3}
                    totalPages={8}
                    size="small"
                    onPageChange={(page) => console.log('Small pagination:', page)}
                />
            </div>
            
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Medium (Default)</h4>
                <Pagination
                    currentPage={3}
                    totalPages={8}
                    size="medium"
                    onPageChange={(page) => console.log('Medium pagination:', page)}
                />
            </div>
            
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Large</h4>
                <Pagination
                    currentPage={3}
                    totalPages={8}
                    size="large"
                    onPageChange={(page) => console.log('Large pagination:', page)}
                />
            </div>
        </div>
    ),
};

// Variantes de estilo
export const StyleVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Default</h4>
                <Pagination
                    currentPage={3}
                    totalPages={8}
                    variant="default"
                    onPageChange={(page) => console.log('Default:', page)}
                />
            </div>
            
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Outlined</h4>
                <Pagination
                    currentPage={3}
                    totalPages={8}
                    variant="outlined"
                    onPageChange={(page) => console.log('Outlined:', page)}
                />
            </div>
            
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Minimal</h4>
                <Pagination
                    currentPage={3}
                    totalPages={8}
                    variant="minimal"
                    onPageChange={(page) => console.log('Minimal:', page)}
                />
            </div>
        </div>
    ),
};

// Paginação com muitas páginas
export const ManyPages: Story = {
    args: {
        currentPage: 25,
        totalPages: 100,
        siblingCount: 1,
        boundaryCount: 1,
        showInfo: true,
        totalItems: 2000,
        pageSize: 20,
        onPageChange: (page) => console.log('Many pages:', page),
    },
};

// Casos extremos
export const EdgeCases: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Primeira Página</h4>
                <Pagination
                    currentPage={1}
                    totalPages={10}
                    showInfo={true}
                    totalItems={200}
                    pageSize={20}
                    onPageChange={(page) => console.log('First page:', page)}
                />
            </div>
            
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Última Página</h4>
                <Pagination
                    currentPage={10}
                    totalPages={10}
                    showInfo={true}
                    totalItems={200}
                    pageSize={20}
                    onPageChange={(page) => console.log('Last page:', page)}
                />
            </div>
            
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Apenas Uma Página</h4>
                <Pagination
                    currentPage={1}
                    totalPages={1}
                    showInfo={true}
                    totalItems={15}
                    pageSize={20}
                    onPageChange={(page) => console.log('Single page:', page)}
                />
            </div>
            
            <div>
                <h4 style={{ marginBottom: '1rem' }}>Duas Páginas</h4>
                <Pagination
                    currentPage={1}
                    totalPages={2}
                    onPageChange={(page) => console.log('Two pages:', page)}
                />
            </div>
        </div>
    ),
};

// Estado desabilitado
export const Disabled: Story = {
    args: {
        currentPage: 3,
        totalPages: 8,
        disabled: true,
        showInfo: true,
        totalItems: 160,
        pageSize: 20,
        onPageChange: (page) => console.log('Disabled pagination:', page),
    },
};

// Labels customizados
export const CustomLabels: Story = {
    args: {
        currentPage: 2,
        totalPages: 5,
        showInfo: true,
        showJumper: true,
        totalItems: 98,
        pageSize: 20,
        labels: {
            first: 'Início',
            previous: 'Voltar',
            next: 'Avançar',
            last: 'Fim',
            page: 'Pág.',
            of: 'de',
            items: 'registros',
            showing: 'Exibindo',
            to: 'a',
            jumpTo: 'Ir para página',
            itemsPerPage: 'por página'
        },
        onPageChange: (page) => console.log('Custom labels:', page),
    },
};

// Paginação interativa controlada
export const Interactive: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(20);
        
        const totalItems = 237;
        const totalPages = Math.ceil(totalItems / pageSize);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ 
                    padding: '1rem', 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Controle Interativo</h4>
                    <p style={{ margin: 0, color: '#6b7280' }}>
                        Página atual: {currentPage} | Items por página: {pageSize} | Total de páginas: {totalPages}
                    </p>
                </div>
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    itemsPerPageOptions={[10, 20, 50, 100]}
                    showInfo={true}
                    showJumper={true}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(newSize) => {
                        setPageSize(newSize);
                        setCurrentPage(1); // Reset para primeira página quando mudar o tamanho
                    }}
                />
            </div>
        );
    },
};

// Exemplo real de uso com tabela
export const WithTable: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const pageSize = 5;
        
        // Dados simulados
        const allData = Array.from({ length: 47 }, (_, i) => ({
            id: i + 1,
            name: `Usuário ${i + 1}`,
            email: `usuario${i + 1}@email.com`,
            role: ['Admin', 'User', 'Manager'][i % 3],
            status: ['Ativo', 'Inativo'][i % 2]
        }));
        
        const totalPages = Math.ceil(allData.length / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const currentData = allData.slice(startIndex, startIndex + pageSize);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4>Lista de Usuários</h4>
                
                {/* Tabela simulada */}
                <div style={{ 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Nome</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Função</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((user) => (
                                <tr key={user.id}>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{user.id}</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{user.name}</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{user.email}</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{user.role}</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            backgroundColor: user.status === 'Ativo' ? '#dcfce7' : '#fee2e2',
                                            color: user.status === 'Ativo' ? '#166534' : '#991b1b'
                                        }}>
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginação */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={allData.length}
                    pageSize={pageSize}
                    showInfo={true}
                    onPageChange={setCurrentPage}
                />
            </div>
        );
    },
};

// Responsividade
export const Responsive: Story = {
    args: {
        currentPage: 3,
        totalPages: 15,
        showInfo: true,
        showJumper: true,
        totalItems: 300,
        pageSize: 20,
        itemsPerPageOptions: [10, 20, 50],
        onPageChange: (page) => console.log('Responsive:', page),
        onPageSizeChange: (size) => console.log('Page size:', size),
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

// Configurações avançadas
export const Advanced: Story = {
    args: {
        currentPage: 10,
        totalPages: 50,
        siblingCount: 2, // Mais páginas ao lado da atual
        boundaryCount: 2, // Mais páginas no início e fim
        showInfo: true,
        showJumper: true,
        totalItems: 1000,
        pageSize: 20,
        itemsPerPageOptions: [10, 20, 50, 100],
        onPageChange: (page) => console.log('Advanced:', page),
        onPageSizeChange: (size) => console.log('Advanced page size:', size),
    },
};

// Apenas controles mínimos
export const MinimalControls: Story = {
    args: {
        currentPage: 3,
        totalPages: 8,
        showFirstLast: false,
        showInfo: false,
        showJumper: false,
        variant: 'minimal',
        onPageChange: (page) => console.log('Minimal controls:', page),
    },
};