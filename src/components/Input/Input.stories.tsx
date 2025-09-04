// src/components/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import React, { useState } from 'react';
import { faCreditCard, faEnvelope, faGlobe, faLock, faMapPin, faMobile, faPaperPlane, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
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
            options: ['default', 'filled', 'outlined', 'ghost'],
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'color', 'file', 'range'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Exemplos básicos
export const Default: Story = {
    args: {
        placeholder: 'Digite algo...',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Nome completo',
        placeholder: 'Digite seu nome',
    },
};

export const Required: Story = {
    args: {
        label: 'Email',
        placeholder: 'Digite seu email',
        type: 'email',
        required: true,
    },
};

// Estados
export const WithError: Story = {
    args: {
        label: 'Password',
        placeholder: 'Digite sua senha',
        type: 'password',
        error: 'A senha deve ter pelo menos 8 caracteres',
    },
};

export const WithSuccess: Story = {
    args: {
        label: 'Email',
        placeholder: 'Digite seu email',
        type: 'email',
        value: 'user@example.com',
        success: 'Email válido!',
    },
};

export const WithWarning: Story = {
    args: {
        label: 'Username',
        placeholder: 'Digite seu username',
        value: 'user123',
        warning: 'Este username já existe, mas você pode continuar',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Campo desabilitado',
        placeholder: 'Não é possível editar',
        value: 'Valor fixo',
        disabled: true,
    },
};

export const Loading: Story = {
    args: {
        label: 'Carregando dados...',
        placeholder: 'Aguarde...',
        loading: true,
    },
};

// Variantes
export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input variant="default" label="Default" placeholder="Variant padrão" />
            <Input variant="filled" label="Filled" placeholder="Fundo preenchido" />
            <Input variant="outlined" label="Outlined" placeholder="Borda mais grossa" />
            <Input variant="ghost" label="Ghost" placeholder="Apenas linha inferior" />
        </div>
    ),
};

// Tamanhos
export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input size="small" label="Small" placeholder="Tamanho pequeno" />
            <Input size="medium" label="Medium" placeholder="Tamanho médio" />
            <Input size="large" label="Large" placeholder="Tamanho grande" />
        </div>
    ),
};

// Com ícones
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
                label="Buscar"
                placeholder="Digite para buscar..."
                leftIcon={faSearch}
            />
            <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                rightIcon={faEnvelope}
            />
            <Input
                label="Website"
                type="url"
                placeholder="https://..."
                leftIcon={faGlobe}
                rightIcon={faPaperPlane}
            />
        </div>
    ),
};

// Com addons
export const WithAddons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
                label="Preço"
                type="number"
                placeholder="0,00"
                leftAddon="R$"
            />
            <Input
                label="Website"
                type="url"
                placeholder="meusite"
                rightAddon=".com.br"
            />
            <Input
                label="Código do produto"
                placeholder="ABC123"
                leftAddon="PRD-"
                rightAddon="-2024"
            />
        </div>
    ),
};

// Funcionalidades especiais
export const SpecialFeatures: Story = {
    render: () => {
        const [clearableValue, setClearableValue] = useState('Texto que pode ser limpo');
        const [passwordValue, setPasswordValue] = useState('minhasenha123');

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input
                    label="Campo com clear"
                    value={clearableValue}
                    onChange={(e) => setClearableValue(e.target.value)}
                    clearable
                    onClear={() => setClearableValue('')}
                    placeholder="Digite algo..."
                />

                <Input
                    label="Senha com toggle"
                    type="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    showPassword
                    placeholder="Digite sua senha"
                />

                <Input
                    label="Texto com contador"
                    maxLength={50}
                    counter
                    placeholder="Máximo 50 caracteres"
                    helperText="Use este campo para uma breve descrição"
                />
            </div>
        );
    },
};

// Tipos de input diferentes
export const InputTypes: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <Input type="text" label="Texto" placeholder="Texto normal" />
            <Input type="email" label="Email" placeholder="user@example.com" />
            <Input type="password" label="Senha" placeholder="••••••••" showPassword />
            <Input type="number" label="Número" placeholder="123" />
            <Input type="tel" label="Telefone" placeholder="(11) 99999-9999" />
            <Input type="url" label="URL" placeholder="https://example.com" />
            <Input type="search" label="Busca" placeholder="Procurar..." />
            <Input type="date" label="Data" />
            <Input type="time" label="Hora" />
            <Input type="datetime-local" label="Data e Hora" />
            <Input type="month" label="Mês" />
            <Input type="week" label="Semana" />
            <Input type="color" label="Cor" />
            <Input type="file" label="Arquivo" />
            <Input type="range" label="Range" min="0" max="100" />
        </div>
    ),
};

// Formulário completo
export const CompleteForm: Story = {
    render: () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            website: '',
            age: '',
            bio: ''
        });

        const [errors, setErrors] = useState({});

        const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({
                ...prev,
                [field]: e.target.value
            }));

            // Limpar erro quando usuário começar a digitar
            if (errors[field]) {
                setErrors(prev => ({
                    ...prev,
                    [field]: ''
                }));
            }
        };

        return (
            <form style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Input
                        label="Nome completo"
                        value={formData.name}
                        onChange={handleChange('name')}
                        required
                        placeholder="Digite seu nome"
                        leftIcon={faUser}
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        required
                        placeholder="seu@email.com"
                        leftIcon={faEnvelope}
                    />

                    <Input
                        label="Senha"
                        type="password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        required
                        showPassword
                        placeholder="Mínimo 8 caracteres"
                        helperText="Use ao menos 8 caracteres com letras e números"
                    />

                    <Input
                        label="Confirmar senha"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        required
                        error={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'As senhas não coincidem' : ''}
                        placeholder="Digite a senha novamente"
                    />

                    <Input
                        label="Telefone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        placeholder="(11) 99999-9999"
                        leftIcon={faMobile}
                    />

                    <Input
                        label="Website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange('website')}
                        placeholder="meusite"
                        leftAddon="https://"
                        rightAddon=".com"
                        helperText="Opcional - seu site pessoal ou profissional"
                    />

                    <Input
                        label="Idade"
                        type="number"
                        value={formData.age}
                        onChange={handleChange('age')}
                        min="18"
                        max="120"
                        placeholder="25"
                        rightAddon="anos"
                    />

                    <Input
                        label="Bio"
                        value={formData.bio}
                        onChange={handleChange('bio')}
                        placeholder="Conte um pouco sobre você..."
                        maxLength={200}
                        counter
                        helperText="Uma breve descrição sobre você"
                    />

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: '#0066cc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Cadastrar
                        </button>
                        <button
                            type="reset"
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: 'transparent',
                                color: '#666',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Limpar
                        </button>
                    </div>
                </div>
            </form>
        );
    },
};

// Casos de uso reais
export const RealWorldExamples: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Login Form */}
            <div>
                <h3>Formulário de Login</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
                    <Input
                        label="Email ou Username"
                        placeholder="Digite seu email"
                        leftIcon={faUser}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        showPassword
                        leftIcon={faLock}
                    />
                </div>
            </div>

            {/* Search */}
            <div>
                <h3>Busca</h3>
                <Input
                    variant="ghost"
                    size="large"
                    placeholder="Pesquisar produtos, marcas, categorias..."
                    leftIcon={faSearch}
                    clearable
                />
            </div>

            {/* E-commerce */}
            <div>
                <h3>E-commerce</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <Input
                        label="CEP"
                        placeholder="00000-000"
                        rightIcon={faMapPin}
                    />
                    <Input
                        label="Cupom de desconto"
                        placeholder="DESCONTO10"
                        leftAddon="#"
                        rightIcon={faCreditCard}
                    />
                </div>
            </div>

            {/* Settings */}
            <div>
                <h3>Configurações</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                    <Input
                        variant="filled"
                        label="Nome da empresa"
                        placeholder="Minha Empresa Ltda"
                        helperText="Este nome aparecerá nas faturas"
                    />
                    <Input
                        variant="filled"
                        label="Limite de usuários"
                        type="number"
                        min="1"
                        max="1000"
                        rightAddon="usuários"
                    />
                </div>
            </div>
        </div>
    ),
};