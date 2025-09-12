# @nti_ses/ui-components

> Biblioteca completa de componentes React TypeScript para projetos da NTI com suporte a FontAwesome e fontes customizadas (Outfit, Inter, Gibralt).

[![NPM Version](https://img.shields.io/npm/v/@nti_ses/ui-components)](https://www.npmjs.com/package/@nti_ses/ui-components)
[![NPM Downloads](https://img.shields.io/npm/dm/@nti_ses/ui-components)](https://www.npmjs.com/package/@nti_ses/ui-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Instalação

```bash
npm install @nti_ses/ui-components
```

### Dependências necessárias (FontAwesome):
```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/react-fontawesome
```

## Sistema de Design

### Fontes Customizadas
- **Outfit** - Família display para títulos e elementos principais
- **Inter** - Família body para texto de interface e conteúdo
- **Gibralt** - Família accent para elementos especiais e destaques

### Variáveis CSS Customizáveis
```css
:root {
  /* Fontes */
  --font-family-display: 'Outfit', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  --font-family-accent: 'Gibralt', sans-serif;
  
  /* Cores Principais */
  --color-primary: #0066cc;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #3b82f6;
  
  /* Espaçamentos */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  
  /* Bordas */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 0.75rem;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## Componentes Disponíveis

### 1. Button - Botão Avançado

Botão versátil com múltiplas variantes, ícones, estados de loading e funcionalidades especiais.

#### Variantes e Tamanhos
```tsx
import { Button } from '@nti_ses/ui-components';
import { faHome, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

// Variantes
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="danger">Perigo</Button>
<Button variant="ghost">Fantasma</Button>

// Tamanhos
<Button size="small">Pequeno</Button>
<Button size="medium">Médio</Button>
<Button size="large">Grande</Button>

// Com ícones
<Button icon={faHome} iconSide="Left">Casa</Button>
<Button icon={faUser} iconSide="Right">Usuário</Button>

// Estados especiais
<Button loading>Carregando...</Button>
<Button disabled>Desabilitado</Button>

// Tipos de botão
<Button type="submit">Enviar</Button>
<Button type="reset">Resetar</Button>
<Button type="button">Botão</Button>
```

#### Props Completas
- **variant**: `'primary'` | `'secondary'` | `'danger'` | `'ghost'`
- **size**: `'small'` | `'medium'` | `'large'`
- **icon**: FontAwesome IconDefinition
- **iconSide**: `'Left'` | `'Right'`
- **loading**: boolean - exibe spinner de carregamento
- **disabled**: boolean
- **type**: `'button'` | `'submit'` | `'reset'`
- **onClick**: (event: React.MouseEvent<HTMLButtonElement>) => void
- **className**: string

---

### 2. Card - Sistema Completo de Cartões

Sistema flexível de cartões com múltiplas variantes e subcomponentes especializados.

#### Variantes Principais
```tsx
import { 
  Card, CardHeader, CardTitle, CardSubtitle, CardContent, 
  CardFooter, CardAction, CardStatus 
} from '@nti_ses/ui-components';

// Variantes básicas
<Card variant="default">Card padrão</Card>
<Card variant="outlined">Card com borda</Card>
<Card variant="elevated">Card elevado</Card>
<Card variant="filled">Card preenchido</Card>
<Card variant="gradient">Card com gradiente</Card>

// Variantes especiais
<Card variant="header-colored" headerColor="primary" headerHeight={6}>
  Card com header colorido
</Card>

<Card variant="dashed" dashedColor="warning" dashedWidth="thick">
  Card com borda pontilhada
</Card>

// Tamanhos e modificadores
<Card size="small" hover shadow>Card pequeno interativo</Card>
<Card size="medium" padding={false}>Card médio sem padding</Card>
<Card size="large" onClick={() => alert('Clicado!')}>Card grande clicável</Card>
```

#### Subcomponentes Completos
```tsx
<Card variant="outlined" hover shadow>
  {/* Header com ícone */}
  <CardHeader icon={faUser} iconPosition="left">
    <CardTitle icon={faHeart} iconPosition="right">
      Perfil do Usuário
    </CardTitle>
    <CardSubtitle>Informações pessoais</CardSubtitle>
  </CardHeader>
  
  {/* Conteúdo principal */}
  <CardContent>
    <p>Conteúdo detalhado do card com informações relevantes.</p>
    
    {/* Status indicators */}
    <CardStatus variant="success" icon={faCheck}>
      Verificado
    </CardStatus>
    <CardStatus variant="warning">
      Pendente
    </CardStatus>
    <CardStatus variant="error">
      Erro
    </CardStatus>
    <CardStatus variant="info">
      Informação
    </CardStatus>
  </CardContent>
  
  {/* Footer com ações */}
  <CardFooter>
    <CardAction 
      variant="primary" 
      size="medium"
      icon={faEdit}
      iconPosition="left"
      onClick={() => console.log('Editar')}
    >
      Editar
    </CardAction>
    
    <CardAction 
      variant="ghost" 
      href="/profile"
      target="_blank"
    >
      Ver Perfil
    </CardAction>
  </CardFooter>
</Card>
```

#### Props Avançadas do Card
- **variant**: `'default'` | `'outlined'` | `'elevated'` | `'filled'` | `'gradient'` | `'header-colored'` | `'dashed'`
- **size**: `'small'` | `'medium'` | `'large'`
- **hover**: boolean - efeito hover
- **shadow**: boolean - sombra do card
- **padding**: boolean - padding interno
- **headerColor**: string | cores predefinidas (`'primary'`, `'secondary'`, `'success'`, `'warning'`, `'danger'`, `'info'`)
- **headerHeight**: number - altura do header em pixels
- **dashedColor**: string | cores predefinidas
- **dashedWidth**: `'thin'` | `'normal'` | `'thick'` | number
- **onClick**: (event: MouseEvent<HTMLDivElement>) => void

---

### 3. Dropdown - Menu Dropdown Avançado

Menu dropdown com múltiplos triggers, posicionamento inteligente e tipos de item.

#### Configurações de Trigger e Posicionamento
```tsx
import { Dropdown } from '@nti_ses/ui-components';

const menuItems = [
  { key: '1', label: 'Editar', icon: faEdit, onClick: () => console.log('Edit') },
  { key: '2', label: 'Compartilhar', description: 'Enviar para outros usuários' },
  { key: '3', type: 'divider' },
  { key: '4', type: 'header', label: 'Ações Perigosas' },
  { key: '5', label: 'Excluir', danger: true, disabled: false },
];

// Diferentes triggers
<Dropdown items={menuItems} trigger="click">Click</Dropdown>
<Dropdown items={menuItems} trigger="hover">Hover</Dropdown>
<Dropdown items={menuItems} trigger="contextMenu">Right Click</Dropdown>
<Dropdown items={menuItems} trigger={['click', 'hover']}>Múltiplos</Dropdown>

// Posicionamentos
<Dropdown items={menuItems} placement="bottom-start">Bottom Start</Dropdown>
<Dropdown items={menuItems} placement="bottom-end">Bottom End</Dropdown>
<Dropdown items={menuItems} placement="top-start">Top Start</Dropdown>
<Dropdown items={menuItems} placement="top-end">Top End</Dropdown>
<Dropdown items={menuItems} placement="left">Left</Dropdown>
<Dropdown items={menuItems} placement="right">Right</Dropdown>
```

#### Configurações Avançadas
```tsx
<Dropdown
  items={menuItems}
  trigger="click"
  placement="bottom-start"
  
  // Aparência
  arrow={true}
  maxHeight={300}
  minWidth={200}
  
  // Comportamento
  closeOnSelect={true}
  closeOnClickOutside={true}
  closeOnEscape={true}
  
  // Estado controlado
  open={isOpen}
  defaultOpen={false}
  onOpenChange={setIsOpen}
  onSelect={(item) => console.log('Selected:', item)}
  
  // Classes customizáveis
  className="custom-trigger"
  dropdownClassName="custom-dropdown"
  itemClassName="custom-item"
>
  <Button>Menu Avançado</Button>
</Dropdown>
```

---

### 4. Footer - Rodapé Completo

Rodapé flexível com suporte a logos, links, copyright e diferentes estilos visuais.

#### Configurações Visuais
```tsx
import { Footer } from '@nti_ses/ui-components';

const logos = [
  { 
    key: '1', 
    image: '/partner1.png', 
    alt: 'Parceiro 1', 
    href: 'https://partner1.com',
    target: '_blank'
  },
  { 
    key: '2', 
    text: 'Parceiro 2', 
    href: 'https://partner2.com' 
  }
];

const links = [
  { key: '1', label: 'Privacidade', href: '/privacy', icon: faShield },
  { key: '2', label: 'Termos', href: '/terms' },
  { key: '3', label: 'Suporte', href: '/support', target: '_blank' },
  { key: '4', label: 'API', href: '/api-docs' }
];

// Diferentes estilos
<Footer
  logos={logos}
  links={links}
  copyright="© 2024 NTI SES. Todos os direitos reservados."
  backgroundColor="white"
  textColor="dark"
/>

<Footer
  logos={logos}
  links={links}
  copyright="© 2024 NTI SES. Todos os direitos reservados."
  backgroundColor="dark"
  textColor="light"
/>

<Footer
  logos={logos}
  links={links}
  copyright="© 2024 NTI SES. Todos os direitos reservados."
  backgroundColor="primary"
  textColor="light"
/>
```

---

### 5. Header - Cabeçalho de Navegação

Cabeçalho responsivo com logo, navegação, botão de ação e menu mobile.

#### Configurações Completas
```tsx
import { Header } from '@nti_ses/ui-components';

const logo = {
  text: 'Sistema NTI',
  icon: faBuilding, // Opcional
  image: '/logo.png', // Opcional
  href: '/dashboard'
};

const navigation = [
  { 
    key: 'dashboard', 
    label: 'Dashboard', 
    icon: faTachometerAlt,
    href: '/dashboard', 
    active: true 
  },
  { 
    key: 'users', 
    label: 'Usuários', 
    href: '/users',
    disabled: false
  },
  { 
    key: 'reports', 
    label: 'Relatórios', 
    icon: faChartBar,
    href: '/reports' 
  }
];

const actionButton = {
  label: 'Login',
  icon: faUser,
  variant: 'primary', // 'primary' | 'secondary' | 'ghost'
  disabled: false
};

// Variantes
<Header
  logo={logo}
  navigation={navigation}
  actionButton={actionButton}
  variant="default" // 'default' | 'transparent'
  sticky={true}
  showMobileMenu={true}
  
  // Callbacks
  onNavigationClick={(item) => console.log('Nav:', item)}
  onActionClick={() => console.log('Action clicked')}
  onLogoClick={() => console.log('Logo clicked')}
/>
```

---

### 6. Input - Campo de Input Avançado

Input com múltiplas funcionalidades, validação, ícones e estados especiais.

#### Tipos e Variantes
```tsx
import { Input } from '@nti_ses/ui-components';
import { faUser, faEnvelope, faLock, faSearch, faPhone } from '@fortawesome/free-solid-svg-icons';

// Tipos diferentes
<Input type="text" label="Nome" placeholder="Digite seu nome" />
<Input type="email" label="Email" placeholder="seu@email.com" />
<Input type="password" label="Senha" showPassword />
<Input type="number" label="Idade" placeholder="25" />
<Input type="tel" label="Telefone" placeholder="(11) 99999-9999" />
<Input type="url" label="Website" placeholder="https://..." />
<Input type="search" label="Buscar" placeholder="Pesquisar..." />
<Input type="date" label="Data de Nascimento" />
<Input type="time" label="Horário" />
<Input type="datetime-local" label="Data e Hora" />

// Variantes visuais
<Input variant="default" label="Padrão" />
<Input variant="filled" label="Preenchido" />
<Input variant="outlined" label="Com Borda" />
<Input variant="ghost" label="Fantasma" />

// Tamanhos
<Input size="small" label="Pequeno" />
<Input size="medium" label="Médio" />
<Input size="large" label="Grande" />
```

#### Funcionalidades Avançadas
```tsx
// Com ícones
<Input 
  label="Usuário"
  leftIcon={faUser}
  placeholder="Nome de usuário"
  clearable
/>

<Input 
  label="Buscar"
  leftIcon={faSearch}
  rightIcon={faFilter}
  onIconClick={(position) => console.log('Icon clicked:', position)}
/>

// Com addons (texto adicional)
<Input 
  label="Website"
  leftAddon="https://"
  rightAddon=".com"
  placeholder="meusite"
/>

<Input 
  label="Preço"
  leftAddon="R$"
  type="number"
  placeholder="0,00"
/>

// Estados de validação
<Input 
  label="Email"
  type="email"
  error="Email é obrigatório"
  required
/>

<Input 
  label="Senha"
  type="password"
  success="Senha forte!"
  showPassword
/>

<Input 
  label="Confirmação"
  warning="Senhas não coincidem"
/>

// Funcionalidades especiais
<Input 
  label="Biografia"
  maxLength={200}
  counter // Mostra contador de caracteres
  helperText="Descreva brevemente sobre você"
/>

<Input 
  label="Carregando dados..."
  loading
  disabled
/>

<Input 
  label="Campo limpo"
  clearable
  onClear={() => console.log('Campo limpo!')}
/>
```

---

### 7. Pagination - Paginação Completa

Componente completo de paginação com navegação, informações e configurações flexíveis.

#### Configurações Básicas
```tsx
import { Pagination } from '@nti_ses/ui-components';

// Configuração básica
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log('Page:', page)}
/>

// Com informações dos dados
<Pagination
  currentPage={2}
  totalPages={20}
  totalItems={500}
  pageSize={25}
  onPageChange={(page) => console.log('Page:', page)}
  showInfo={true}
/>

// Com seletor de itens por página
<Pagination
  currentPage={1}
  totalPages={15}
  totalItems={300}
  pageSize={20}
  itemsPerPageOptions={[10, 20, 50, 100]}
  onPageChange={(page) => console.log('Page:', page)}
  onPageSizeChange={(size) => console.log('Page size:', size)}
  showInfo={true}
/>
```

#### Configurações Avançadas
```tsx
<Pagination
  currentPage={5}
  totalPages={100}
  totalItems={2000}
  pageSize={20}
  
  // Controles de visualização
  showFirstLast={true}
  showPrevNext={true}
  showNumbers={true}
  showInfo={true}
  showJumper={true} // Campo para pular para página específica
  
  // Comportamento
  siblingCount={2} // Páginas ao lado da atual
  boundaryCount={1} // Páginas no início e fim
  
  // Estilo
  size="medium" // 'small' | 'medium' | 'large'
  variant="default" // 'default' | 'outlined' | 'minimal'
  disabled={false}
  
  // Labels customizáveis
  labels={{
    first: 'Primeira',
    previous: 'Anterior',
    next: 'Próxima',
    last: 'Última',
    page: 'Página',
    of: 'de',
    items: 'itens',
    showing: 'Mostrando',
    to: 'até',
    jumpTo: 'Ir para',
    itemsPerPage: 'itens por página'
  }}
  
  onPageChange={(page) => console.log('Page:', page)}
  onPageSizeChange={(size) => console.log('Page size:', size)}
/>
```

---

### 8. Select - Seleção Avançada

Select com busca, seleção múltipla, agrupamento e funcionalidades avançadas.

#### Configurações Básicas
```tsx
import { Select } from '@nti_ses/ui-components';

const basicOptions = [
  { value: '1', label: 'Opção 1' },
  { value: '2', label: 'Opção 2' },
  { value: '3', label: 'Opção 3', disabled: true },
];

// Select básico
<Select
  label="Selecione uma opção"
  options={basicOptions}
  placeholder="Escolha..."
  onChange={(value) => console.log(value)}
/>

// Select múltiplo
<Select
  label="Seleção múltipla"
  options={basicOptions}
  multiple={true}
  maxSelectedDisplay={2}
  onChange={(values) => console.log(values)}
/>
```

#### Funcionalidades Avançadas
```tsx
const advancedOptions = [
  { 
    value: '1', 
    label: 'Usuário Admin', 
    description: 'Acesso total ao sistema',
    icon: faUserShield,
    group: 'Administradores'
  },
  { 
    value: '2', 
    label: 'Usuário Editor', 
    description: 'Pode editar conteúdo',
    icon: faUserEdit,
    group: 'Editores'
  },
  { 
    value: '3', 
    label: 'Usuário Visualizador', 
    description: 'Apenas visualização',
    icon: faUserCheck,
    group: 'Visualizadores'
  }
];

<Select
  label="Tipo de Usuário"
  options={advancedOptions}
  
  // Funcionalidades
  searchable={true}
  clearable={true}
  multiple={false}
  
  // Aparência
  leftIcon={faUsers}
  variant="outlined" // 'default' | 'filled' | 'outlined' | 'ghost'
  size="medium" // 'small' | 'medium' | 'large'
  
  // Comportamento
  maxHeight={250}
  
  // Textos customizáveis
  placeholder="Selecione o tipo de usuário..."
  searchPlaceholder="Buscar tipos..."
  noOptionsText="Nenhum tipo encontrado"
  loadingText="Carregando tipos..."
  
  // Estados
  loading={false}
  disabled={false}
  error="Campo obrigatório"
  // success="Seleção válida"
  // warning="Atenção na seleção"
  
  // Callbacks
  onChange={(value) => console.log('Selected:', value)}
  onSearch={(term) => console.log('Search:', term)}
  onOpen={() => console.log('Opened')}
  onClose={() => console.log('Closed')}
  
  helperText="Selecione o nível de acesso apropriado"
/>
```

---

### 9. Typography - Sistema de Tipografia

Sistema completo de tipografia com 3 fontes customizadas e múltiplas variações.

#### Hierarquia de Títulos
```tsx
import { Typography } from '@nti_ses/ui-components';

// Hierarquia completa
<Typography variant="display" family="display" weight="bold">
  Display Title
</Typography>

<Typography variant="h1" family="display" weight="semibold">
  Título Principal (H1)
</Typography>

<Typography variant="h2" family="display" weight="medium">
  Título Secundário (H2)
</Typography>

<Typography variant="h3" family="display">
  Título Terciário (H3)
</Typography>

<Typography variant="h4">
  Título Quaternário (H4)
</Typography>

<Typography variant="h5">
  Título Quinário (H5)
</Typography>

<Typography variant="h6">
  Título Sênario (H6)
</Typography>
```

#### Texto de Corpo e Especiais
```tsx
// Texto de corpo
<Typography variant="body1" family="body">
  Texto principal do corpo usando Inter. Lorem ipsum dolor sit amet.
</Typography>

<Typography variant="body2" family="body" color="muted">
  Texto secundário menor com cor mais suave.
</Typography>

// Textos especiais
<Typography variant="caption" size="sm" color="muted">
  Legenda ou texto explicativo pequeno
</Typography>

<Typography variant="overline" weight="medium" color="secondary">
  TEXTO SOBRELINHADO PARA CATEGORIAS
</Typography>

<Typography variant="accent" family="accent" weight="bold" color="primary">
  Texto de destaque com fonte Gibralt
</Typography>
```

#### Combinações de Propriedades
```tsx
// Famílias de fonte
<Typography family="display">Outfit para títulos e display</Typography>
<Typography family="body">Inter para corpo e interface</Typography>
<Typography family="accent">Gibralt para acentos especiais</Typography>

// Pesos de fonte
<Typography weight="light">Texto leve</Typography>
<Typography weight="normal">Texto normal</Typography>
<Typography weight="medium">Texto médio</Typography>
<Typography weight="semibold">Texto semi-negrito</Typography>
<Typography weight="bold">Texto negrito</Typography>
<Typography weight="extrabold">Texto extra-negrito</Typography>

// Tamanhos customizados
<Typography size="xs">Texto extra pequeno</Typography>
<Typography size="sm">Texto pequeno</Typography>
<Typography size="md">Texto médio</Typography>
<Typography size="lg">Texto grande</Typography>
<Typography size="xl">Texto extra grande</Typography>
<Typography size="2xl">Texto 2x grande</Typography>
<Typography size="3xl">Texto 3x grande</Typography>
<Typography size="4xl">Texto 4x grande</Typography>
<Typography size="5xl">Texto 5x grande</Typography>

// Cores semânticas
<Typography color="primary">Cor primária</Typography>
<Typography color="secondary">Cor secundária</Typography>
<Typography color="muted">Cor suavizada</Typography>
<Typography color="inverse">Cor inversa</Typography>
<Typography color="inherit">Cor herdada</Typography>

// Alinhamentos
<Typography align="left">Alinhado à esquerda</Typography>
<Typography align="center">Centralizado</Typography>
<Typography align="right">Alinhado à direita</Typography>
<Typography align="justify">Justificado</Typography>

// Componente customizado
<Typography 
  variant="h2" 
  component="span" 
  family="accent" 
  weight="bold" 
  color="primary"
>
  Título renderizado como span
</Typography>
```

---

## Exemplos Práticos Completos

### Dashboard Administrativo
```tsx
import React, { useState } from 'react';
import {
  Header, Footer, Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction,
  Typography, Pagination, Select, Input, Button, Dropdown
} from '@nti_ses/ui-components';
import {
  faUser, faChartBar, faCog, faSearch, faFilter, faEllipsisV,
  faEdit, faTrash, faEye, faPlus
} from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: faChartBar, href: '/dashboard', active: true },
    { key: 'users', label: 'Usuários', icon: faUser, href: '/users' },
    { key: 'settings', label: 'Configurações', icon: faCog, href: '/settings' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'active', label: 'Ativos' },
    { value: 'inactive', label: 'Inativos' },
    { value: 'pending', label: 'Pendentes' },
  ];

  const actionMenuItems = [
    { key: 'view', label: 'Visualizar', icon: faEye },
    { key: 'edit', label: 'Editar', icon: faEdit },
    { key: 'divider', type: 'divider' },
    { key: 'delete', label: 'Excluir', icon: faTrash, danger: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        logo={{ text: 'Admin Panel', icon: faCog }}
        navigation={navigationItems}
        actionButton={{ label: 'Perfil', variant: 'ghost', icon: faUser }}
        sticky
        variant="default"
      />
      
      <main className="flex-1 container mx-auto p-6">
        {/* Header da página */}
        <div className="mb-8">
          <Typography variant="h1" family="display" weight="bold" className="mb-2">
            Dashboard Administrativo
          </Typography>
          <Typography variant="body1" color="muted">
            Gerencie usuários, monitore atividades e configure o sistema
          </Typography>
        </div>
        
        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card variant="filled" hover className="bg-blue-50">
            <CardContent className="text-center p-6">
              <Typography variant="h2" family="display" color="primary" weight="bold" className="mb-2">
                1,234
              </Typography>
              <Typography variant="body2" color="muted">
                Usuários Totais
              </Typography>
            </CardContent>
          </Card>
          
          <Card variant="filled" hover className="bg-green-50">
            <CardContent className="text-center p-6">
              <Typography variant="h2" family="display" weight="bold" className="mb-2 text-green-600">
                987
              </Typography>
              <Typography variant="body2" color="muted">
                Usuários Ativos
              </Typography>
            </CardContent>
          </Card>
          
          <Card variant="filled" hover className="bg-orange-50">
            <CardContent className="text-center p-6">
              <Typography variant="h2" family="display" weight="bold" className="mb-2 text-orange-600">
                45
              </Typography>
              <Typography variant="body2" color="muted">
                Pendentes
              </Typography>
            </CardContent>
          </Card>
          
          <Card variant="filled" hover className="bg-purple-50">
            <CardContent className="text-center p-6">
              <Typography variant="h2" family="display" weight="bold" className="mb-2 text-purple-600">
                89%
              </Typography>
              <Typography variant="body2" color="muted">
                Taxa de Ativação
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Seção de gerenciamento */}
        <Card variant="outlined" className="mb-6">
          <CardHeader>
            <CardTitle icon={faUser} iconPosition="left">
              Gerenciamento de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filtros e ações */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Input
                leftIcon={faSearch}
                placeholder="Buscar usuários..."
                clearable
                className="flex-1 min-w-64"
              />
              
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                leftIcon={faFilter}
                placeholder="Filtrar status"
                className="w-48"
              />
              
              <Button variant="primary" icon={faPlus} iconSide="Left">
                Novo Usuário
              </Button>
              
              <Dropdown
                items={actionMenuItems}
                placement="bottom-end"
                onSelect={(item) => console.log('Bulk action:', item)}
              >
                <Button variant="ghost" icon={faEllipsisV} />
              </Dropdown>
            </div>
            
            {/* Lista de usuários */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <Card key={item} variant="outlined" hover className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Typography weight="medium">U{item}</Typography>
                      </div>
                      <div>
                        <Typography variant="body1" weight="medium">
                          Usuário {item}
                        </Typography>
                        <Typography variant="body2" color="muted">
                          usuario{item}@empresa.com
                        </Typography>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item % 2 === 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item % 2 === 0 ? 'Ativo' : 'Pendente'}
                      </span>
                      
                      <Typography variant="caption" color="muted">
                        Último acesso: há {item} dia{item > 1 ? 's' : ''}
                      </Typography>
                      
                      <Dropdown
                        items={actionMenuItems}
                        placement="bottom-end"
                        onSelect={(action) => console.log('User action:', action, 'for user', item)}
                      >
                        <Button variant="ghost" size="small" icon={faEllipsisV} />
                      </Dropdown>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Paginação */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={25}
                totalItems={250}
                pageSize={pageSize}
                itemsPerPageOptions={[10, 25, 50, 100]}
                showInfo={true}
                showJumper={true}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                labels={{
                  showing: 'Mostrando',
                  to: 'até',
                  of: 'de',
                  items: 'usuários',
                  itemsPerPage: 'por página'
                }}
              />
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer
        links={[
          { key: 'docs', label: 'Documentação', href: '/docs' },
          { key: 'api', label: 'API', href: '/api' },
          { key: 'support', label: 'Suporte', href: '/support' },
        ]}
        copyright="© 2024 NTI SES. Todos os direitos reservados."
        backgroundColor="white"
        textColor="dark"
      />
    </div>
  );
}
```

### Formulário de Cadastro Avançado
```tsx
import React, { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  Input, Select, Button, Typography
} from '@nti_ses/ui-components';
import {
  faUser, faEnvelope, faLock, faPhone, faMapMarkerAlt,
  faBuilding, faCalendarAlt, faEye
} from '@fortawesome/free-solid-svg-icons';

function AdvancedRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    address: '',
    company: '',
    role: '',
    department: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: 'admin', label: 'Administrador', description: 'Acesso total ao sistema' },
    { value: 'manager', label: 'Gerente', description: 'Gerenciamento de equipe' },
    { value: 'employee', label: 'Funcionário', description: 'Acesso básico' },
    { value: 'intern', label: 'Estagiário', description: 'Acesso limitado' }
  ];

  const departmentOptions = [
    { value: 'it', label: 'Tecnologia da Informação', group: 'Técnico' },
    { value: 'dev', label: 'Desenvolvimento', group: 'Técnico' },
    { value: 'design', label: 'Design', group: 'Criativo' },
    { value: 'marketing', label: 'Marketing', group: 'Criativo' },
    { value: 'sales', label: 'Vendas', group: 'Comercial' },
    { value: 'support', label: 'Suporte', group: 'Comercial' },
    { value: 'hr', label: 'Recursos Humanos', group: 'Administrativo' },
    { value: 'finance', label: 'Financeiro', group: 'Administrativo' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setLoading(false);
      console.log('Form submitted:', formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Typography variant="h1" family="display" weight="bold" className="mb-4">
              Cadastro de Usuário
            </Typography>
            <Typography variant="body1" color="muted">
              Preencha as informações abaixo para criar sua conta
            </Typography>
          </div>

          <Card variant="outlined" shadow>
            <CardHeader>
              <CardTitle icon={faUser} iconPosition="left">
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nome"
                    leftIcon={faUser}
                    placeholder="João"
                    required
                    error={errors.firstName}
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                  
                  <Input
                    label="Sobrenome"
                    placeholder="Silva"
                    required
                    error={errors.lastName}
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>

                {/* Email e Telefone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    leftIcon={faEnvelope}
                    placeholder="joao@empresa.com"
                    required
                    error={errors.email}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    helperText="Será usado para login"
                  />
                  
                  <Input
                    label="Telefone"
                    type="tel"
                    leftIcon={faPhone}
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                {/* Senhas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Senha"
                    type="password"
                    leftIcon={faLock}
                    showPassword
                    required
                    error={errors.password}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    helperText="Mínimo 8 caracteres"
                  />
                  
                  <Input
                    label="Confirmar Senha"
                    type="password"
                    leftIcon={faLock}
                    showPassword
                    required
                    error={errors.confirmPassword}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>

                {/* Data de nascimento e Endereço */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Data de Nascimento"
                    type="date"
                    leftIcon={faCalendarAlt}
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  />
                  
                  <Input
                    label="Endereço"
                    leftIcon={faMapMarkerAlt}
                    placeholder="Rua, número, bairro"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                {/* Informações profissionais */}
                <div className="border-t pt-6">
                  <Typography variant="h3" weight="medium" className="mb-4">
                    Informações Profissionais
                  </Typography>
                  
                  <div className="space-y-4">
                    <Input
                      label="Empresa"
                      leftIcon={faBuilding}
                      placeholder="Nome da empresa"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Cargo/Função"
                        options={roleOptions}
                        placeholder="Selecione seu cargo"
                        searchable
                        value={formData.role}
                        onChange={(value) => setFormData({...formData, role: value})}
                        error={errors.role}
                      />
                      
                      <Select
                        label="Departamento"
                        options={departmentOptions}
                        placeholder="Selecione o departamento"
                        searchable
                        value={formData.department}
                        onChange={(value) => setFormData({...formData, department: value})}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="ghost">
                Cancelar
              </Button>
              
              <Button 
                variant="primary" 
                loading={loading}
                onClick={handleSubmit}
                disabled={!formData.firstName || !formData.email || !formData.password}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

### Sistema de Comentários
```tsx
import React, { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  Typography, Input, Button, Dropdown
} from '@nti_ses/ui-components';
import {
  faHeart, faReply, faFlag, faEllipsisV, faThumbsUp,
  faShare, faEdit, faTrash
} from '@fortawesome/free-solid-svg-icons';

function CommentSystem() {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  const commentActions = [
    { key: 'edit', label: 'Editar', icon: faEdit },
    { key: 'divider', type: 'divider' },
    { key: 'report', label: 'Reportar', icon: faFlag },
    { key: 'delete', label: 'Excluir', icon: faTrash, danger: true },
  ];

  const comments = [
    {
      id: 1,
      author: 'Ana Silva',
      avatar: '/avatar1.jpg',
      content: 'Excelente artigo! As informações sobre componentes React foram muito úteis.',
      timestamp: '2 horas atrás',
      likes: 12,
      replies: 3,
      liked: true
    },
    {
      id: 2,
      author: 'Carlos Santos',
      avatar: '/avatar2.jpg',
      content: 'Concordo com a Ana. Gostaria de ver mais exemplos práticos de implementação.',
      timestamp: '1 hora atrás',
      likes: 5,
      replies: 0,
      liked: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Typography variant="h2" family="display" weight="bold">
        Comentários ({comments.length})
      </Typography>

      {/* Novo comentário */}
      <Card variant="outlined">
        <CardContent>
          <Input
            placeholder="Deixe seu comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            rows={3}
            className="mb-4"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Typography variant="caption" color="muted">
            {newComment.length}/500 caracteres
          </Typography>
          <div className="space-x-2">
            <Button variant="ghost" size="small">
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              size="small"
              disabled={!newComment.trim()}
            >
              Comentar
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Lista de comentários */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} variant="outlined" hover>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Typography variant="caption" weight="bold">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </Typography>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Typography variant="body1" weight="medium">
                        {comment.author}
                      </Typography>
                      <Typography variant="caption" color="muted">
                        {comment.timestamp}
                      </Typography>
                    </div>
                    
                    <Dropdown
                      items={commentActions}
                      placement="bottom-end"
                      trigger="click"
                    >
                      <Button variant="ghost" size="small" icon={faEllipsisV} />
                    </Dropdown>
                  </div>
                  
                  <Typography variant="body1" className="mb-3">
                    {comment.content}
                  </Typography>
                  
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="small" 
                      icon={faThumbsUp}
                      className={comment.liked ? 'text-blue-600' : ''}
                    >
                      {comment.likes}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="small" 
                      icon={faReply}
                      onClick={() => setReplyTo(comment.id)}
                    >
                      Responder
                    </Button>
                    
                    <Button variant="ghost" size="small" icon={faShare}>
                      Compartilhar
                    </Button>
                    
                    {comment.replies > 0 && (
                      <Typography variant="caption" color="muted">
                        {comment.replies} resposta{comment.replies > 1 ? 's' : ''}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Formulário de resposta */}
              {replyTo === comment.id && (
                <div className="mt-4 ml-14 border-l-2 border-gray-200 pl-4">
                  <Input
                    placeholder={`Respondendo para ${comment.author}...`}
                    multiline
                    rows={2}
                    className="mb-3"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="small"
                      onClick={() => setReplyTo(null)}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary" size="small">
                      Responder
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

---

## Guia de Acessibilidade

### Navegação por Teclado
Todos os componentes suportam navegação completa por teclado:

```tsx
// Exemplos de teclas suportadas
<Button>Tab para focar, Enter/Space para ativar</Button>
<Select>Arrow keys para navegar opções, Enter para selecionar</Select>
<Dropdown>Esc para fechar, Arrow keys para navegação</Dropdown>
<Pagination>Tab entre controles, Enter para navegar</Pagination>
<Input>Tab para focar, teclas normais para inserir texto</Input>
```

### Screen Reader Support
```tsx
// Exemplos com ARIA labels apropriados
<Button aria-label="Fechar modal">×</Button>
<Input aria-describedby="help-text" aria-invalid={hasError} />
<Select aria-expanded={isOpen} aria-haspopup="listbox" />
<Pagination aria-label="Navegação de páginas" />
```

### Contraste e Cores
```tsx
// Componentes seguem WCAG 2.1 AA
<Typography color="primary">Contraste 4.5:1+</Typography>
<Button variant="danger">Cores acessíveis</Button>
<Input error="Indicação clara de erro" />
```

---

## Testes e Qualidade

### Testes Automatizados
```bash
# Executar todos os testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch

# Testes E2E
npm run test:e2e
```

### Linting e Formatação
```bash
# ESLint
npm run lint

# Prettier
npm run format

# TypeScript check
npm run type-check
```

---

## Personalização Avançada

### Temas Customizados
```css
/* Tema customizado */
.my-app {
  --color-primary: #8b5cf6;
  --color-secondary: #06b6d4;
  --font-family-display: 'Custom Display Font', sans-serif;
  --border-radius-md: 0.75rem;
}
```

### Classes CSS Customizadas
```tsx
// Sobrescrevendo estilos específicos
<Button className="custom-button bg-gradient-to-r from-purple-500 to-pink-500">
  Botão Gradiente
</Button>

<Card className="custom-card shadow-2xl border-2 border-purple-200">
  Card Personalizado
</Card>
```

---

## Performance e Otimização

### Bundle Size
- **Tree-shaking**: Importe apenas os componentes necessários
- **Lazy loading**: Componentes carregados sob demanda
- **CSS otimizado**: Estilos minificados e comprimidos

```tsx
// Import otimizado
import { Button, Input } from '@nti_ses/ui-components';

// Evite imports genéricos
// import * from '@nti_ses/ui-components';
```

### Memoização
```tsx
import React, { memo } from 'react';
import { Button } from '@nti_ses/ui-components';

const OptimizedComponent = memo(({ data }) => (
  <div>
    {data.map(item => (
      <Button key={item.id}>{item.label}</Button>
    ))}
  </div>
));
```

---

## Roadmap e Próximas Funcionalidades

### Q1 2025 (Em Desenvolvimento)
- [x] Componentes básicos (Button, Input, Card, etc.)
- [x] Sistema de tipografia com 3 fontes (Outfit, Inter, Gibralt)
- [x] Temas e variáveis CSS customizáveis
- [x] Sistema de paginação avançado
- [x] Header e Footer responsivos
- [ ] **Modal/Dialog** - Sistema completo de modais com backdrop, animações e acessibilidade
- [ ] **Toast/Notification** - Sistema de notificações com posicionamento e auto-dismiss
- [ ] **DateRange/Period** - Seletor de período com data início/fim e presets configuráveis
- [ ] **Testes Jest** - Implementação completa de testes unitários para todos os componentes

### Q2 2025
- [ ] **Table/DataTable** - Tabela avançada com ordenação, filtros, paginação e seleção múltipla
- [ ] **Tabs** - Sistema de abas com orientação horizontal/vertical e lazy loading
- [ ] **Upload/FileInput** - Upload de arquivos com drag-and-drop, preview e validação
- [ ] **Breadcrumb** - Navegação breadcrumb com separadores customizáveis
- [ ] **Skeleton** - Loading states com skeleton screens animados
- [ ] **Progress** - Indicadores de progresso (linear e circular) com animações

### Q3 2025
- [ ] **Theme System** - Tema dark/light automático com transições suaves
- [ ] **Animations** - Micro-interações e animações com Framer Motion
- [ ] **Chart/Graph** - Componentes de gráficos básicos (line, bar, pie)
- [ ] **Form Builder** - Formulários dinâmicos com validação e schema
- [ ] **Autocomplete** - Input com sugestões, busca e seleção múltipla
- [ ] **Badge** - Indicadores, labels e status badges

### Q4 2025
- [ ] **Calendar** - Calendário completo com eventos, agenda e diferentes visualizações
- [ ] **RichText Editor** - Editor de texto rico com formatação e plugins
- [ ] **Map Integration** - Componente de mapas com markers e interações
- [ ] **Data Visualization** - Dashboards e métricas com gráficos avançados
- [ ] **Advanced Search** - Componente de busca com filtros e facetas
- [ ] **A11y Audit** - Auditoria completa de acessibilidade WCAG 2.1

### 2026 - Futuro
- [ ] **Mobile Components** - Adaptações específicas para mobile e touch
- [ ] **Advanced Layouts** - Layouts complexos (Split, Resizable, Dock)
- [ ] **Virtualization** - Listas e tabelas virtualizadas para grandes datasets
- [ ] **Internationalization** - Suporte completo i18n com RTL
- [ ] **PWA Support** - Funcionalidades específicas para Progressive Web Apps
- [ ] **AI Integration** - Componentes com integração de IA (autocomplete, suggestions)

---

## Contribuição e Desenvolvimento

### Setup Local
```bash
git clone https://github.com/nti_ses/ui-components.git
cd ui-components
npm install
npm run dev
```

### Estrutura do Projeto
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   ├── Button.scss
│   │   └── Button.stories.tsx
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.types.ts
│   │   ├── Card.scss
│   │   └── Card.stories.tsx
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.types.ts
│   │   ├── Input.scss
│   │   └── Input.stories.tsx
│   └── ...
└── styles/
    ├── fonts/
        ├── gibralt/
        ├── Inter/
        ├── Outfit/
    ├── fonts.scss
    ├── global.scss
    ├── tokens.scss
    └── typography.scss
```

### Criando Novos Componentes
```bash
# Script para gerar novo componente
npm run generate:component MyComponent

# Cria:
# - src/components/MyComponent/MyComponent.tsx
# - src/components/MyComponent/MyComponent.types.ts
# - src/components/MyComponent/MyComponent.scss
# - src/components/MyComponent/MyComponent.stories.tsx
# - src/components/MyComponent/index.ts
```

### Padrões de Código
- **TypeScript**: Tipagem estrita obrigatória
- **SCSS Modules**: Estilos componentizados
- **Storybook**: Documentação visual
- **Jest + Testing Library**: Testes unitários
- **ESLint + Prettier**: Padronização de código

---

## Suporte e Comunidade

### Documentação
- **Storybook**: [https://ui-components.nti-ses.com](https://ui-components.nti-ses.com)
- **API Docs**: [https://docs.nti-ses.com/ui-components](https://docs.nti-ses.com/ui-components)
- **GitHub**: [https://github.com/nti_ses/ui-components](https://github.com/nti_ses/ui-components)

### Suporte
- **Issues**: Reporte bugs e solicite features
- **Discussions**: Perguntas e discussões da comunidade  
- **Email**: nti@empresa.com
- **Slack**: #ui-components

### Licença
MIT © 2024 NTI SES - Todos os direitos reservados.

---

*Esta biblioteca está em desenvolvimento ativo. Para atualizações e novas funcionalidades, acompanhe o [changelog](CHANGELOG.md) e as [releases](https://github.com/nti_ses/ui-components/releases).*