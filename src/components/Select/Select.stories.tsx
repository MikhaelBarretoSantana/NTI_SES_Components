import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { SelectOption } from './Select.types';
import React, { useState } from 'react';
import {
    faUser,
    faUserTie,
    faUserGraduate,
    faGlobe,
    faFlag,
    faStar,
    faHeart,
    faCode,
    faDesktop,
    faMobile
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Opções de exemplo
const simpleOptions: SelectOption[] = [
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'rs', label: 'Rio Grande do Sul' },
    { value: 'pr', label: 'Paraná' },
];

const optionsWithIcons: SelectOption[] = [
    { value: 'admin', label: 'Administrador', icon: faUserTie },
    { value: 'user', label: 'Usuário', icon: faUser },
    { value: 'student', label: 'Estudante', icon: faUserGraduate },
];

const optionsWithDescriptions: SelectOption[] = [
    {
        value: 'react',
        label: 'React',
        icon: faCode,
        description: 'Biblioteca JavaScript para interfaces'
    },
    {
        value: 'vue',
        label: 'Vue.js',
        icon: faDesktop,
        description: 'Framework progressivo para UI'
    },
    {
        value: 'angular',
        label: 'Angular',
        icon: faMobile,
        description: 'Plataforma para aplicações web'
    },
];

const groupedOptions: SelectOption[] = [
    { value: 'br', label: 'Brasil', icon: faFlag, group: 'América do Sul' },
    { value: 'ar', label: 'Argentina', icon: faFlag, group: 'América do Sul' },
    { value: 'co', label: 'Colômbia', icon: faFlag, group: 'América do Sul' },
    { value: 'us', label: 'Estados Unidos', icon: faFlag, group: 'América do Norte' },
    { value: 'ca', label: 'Canadá', icon: faFlag, group: 'América do Norte' },
    { value: 'mx', label: 'México', icon: faFlag, group: 'América do Norte' },
];

// Stories básicas
export const Default: Story = {
    args: {
        options: simpleOptions,
        placeholder: 'Selecione um estado',
    },
};

export const WithLabel: Story = {
    args: {
        options: simpleOptions,
        label: 'Estado',
        placeholder: 'Escolha seu estado',
    },
};

export const WithIcons: Story = {
    args: {
        options: optionsWithIcons,
        label: 'Tipo de usuário',
        leftIcon: faUser,
    },
};

export const Searchable: Story = {
    args: {
        options: simpleOptions,
        label: 'Estado (com busca)',
        searchable: true,
        placeholder: 'Digite ou selecione',
    },
};

export const Multiple: Story = {
    args: {
        options: optionsWithIcons,
        label: 'Múltiplos usuários',
        multiple: true,
        clearable: true,
    },
};

export const WithDescriptions: Story = {
    args: {
        options: optionsWithDescriptions,
        label: 'Framework favorito',
        placeholder: 'Escolha um framework',
    },
};

export const Grouped: Story = {
    args: {
        options: groupedOptions,
        label: 'País',
        placeholder: 'Selecione um país',
        searchable: true,
    },
};

// Estados
export const WithError: Story = {
    args: {
        options: simpleOptions,
        label: 'Estado',
        error: 'Este campo é obrigatório',
        leftIcon: faFlag,
    },
};

export const Disabled: Story = {
    args: {
        options: simpleOptions,
        label: 'Estado (desabilitado)',
        disabled: true,
        value: 'sp',
    },
};

export const Loading: Story = {
    args: {
        options: [],
        label: 'Carregando...',
        loading: true,
        loadingText: 'Buscando dados...',
    },
};

// Formulário completo
export const CompleteForm: Story = {
    render: () => {
        const [formData, setFormData] = useState({
            estado: '',
            usuario: [],
            framework: '',
            pais: ''
        });

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
                <Select
                    options={simpleOptions}
                    label="Estado"
                    value={formData.estado}
                    onChange={(value) => setFormData(prev => ({ ...prev, estado: value as string }))}
                    leftIcon={faFlag}
                    clearable
                />

                <Select
                    options={optionsWithIcons}
                    label="Tipos de usuário"
                    value={formData.usuario}
                    onChange={(value) => setFormData(prev => ({ ...prev, usuario: value as string[] }))}
                    multiple
                    clearable
                    searchable
                />

                <Select
                    options={optionsWithDescriptions}
                    label="Framework preferido"
                    value={formData.framework}
                    onChange={(value) => setFormData(prev => ({ ...prev, framework: value as string }))}
                    placeholder="Escolha um framework"
                />

                <Select
                    options={groupedOptions}
                    label="País"
                    value={formData.pais}
                    onChange={(value) => setFormData(prev => ({ ...prev, pais: value as string }))}
                    searchable
                    leftIcon={faGlobe}
                />

                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
                    <strong>Valores selecionados:</strong>
                    <pre style={{ marginTop: '0.5rem', fontSize: '12px' }}>
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>
        );
    },
};