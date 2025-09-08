# @nti_ses/ui-components

> Biblioteca de componentes React TypeScript para projetos da NTI com suporte a FontAwesome e fontes customizadas (Outfit, Inter, Gibralt).

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

## Componentes Disponíveis

- **Button** - Botão com múltiplas variantes, ícones e estados de loading
- **Card** - Sistema completo de cartões com subcomponentes flexíveis
- **Dropdown** - Menu dropdown com múltiplos triggers e posicionamento
- **Footer** - Rodapé com logos, links e informações de copyright
- **Header** - Cabeçalho de navegação responsivo com menu mobile
- **Input** - Input avançado com ícones, validação e funcionalidades especiais
- **Pagination** - Componente de paginação completo com navegação
- **Select** - Seleção avançada com busca e seleção múltipla
- **Typography** - Sistema de tipografia com 3 fontes (Outfit, Inter, Gibralt)

## Sistema de Fontes

- **Outfit** - Para títulos e elementos display
- **Inter** - Para corpo de texto e interface
- **Gibralt** - Para acentos e elementos especiais

## Uso Rápido

```tsx
import React from 'react';
import { 
  Button, Input, Typography, Card, CardHeader, CardTitle, 
  CardContent, Header, Footer 
} from '@nti_ses/ui-components';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function App() {
  const navigation = [
    { key: 'home', label: 'Início', href: '/', active: true },
    { key: 'about', label: 'Sobre', href: '/about' },
  ];

  const footerLinks = [
    { key: '1', label: 'Privacidade', href: '/privacy' },
    { key: '2', label: 'Termos', href: '/terms' },
  ];

  return (
    <div>
      <Header
        logo={{ text: 'Sistema NTI' }}
        navigation={navigation}
        actionButton={{ label: 'Login', variant: 'primary' }}
        sticky
      />
      
      <main className="container mx-auto p-6">
        <Typography variant="h1" family="display">Sistema NTI</Typography>
        
        <Card variant="outlined" size="medium" className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              label="Nome do usuário"
              leftIcon={faUser}
              placeholder="Digite seu nome"
              clearable
              className="mb-4"
            />
            
            <Input
              label="Email"
              type="email"
              leftIcon={faEnvelope}
              placeholder="seu@email.com"
              required
              className="mb-4"
            />
            
            <Input
              label="Senha"
              type="password"
              leftIcon={faLock}
              showPassword
              placeholder="••••••••"
              required
              className="mb-6"
            />
            
            <Button variant="primary" size="large" className="w-full">
              Entrar no Sistema
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer
        links={footerLinks}
        copyright="© 2024 NTI SES. Todos os direitos reservados."
        backgroundColor="dark"
        textColor="light"
      />
    </div>
  );
}

export default App;
```

## Componentes

### Button

Botão versátil com múltiplas variantes e estados.

```tsx
import { faHome } from '@fortawesome/free-regular-svg-icons';

<Button 
  variant="primary" 
  size="medium"
  icon={faHome}
  iconSide="Left"
  loading={false}
  onClick={() => console.log('Clicked!')}
>
  Clique aqui
</Button>
```

**Props principais:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `icon`: FontAwesome IconDefinition
- `iconSide`: 'Left' | 'Right'
- `loading`: boolean
- `disabled`: boolean

### Card

Sistema completo de cartões com subcomponentes flexíveis.

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction } from '@nti_ses/ui-components';

<Card variant="outlined" size="medium" hover shadow>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo do card aqui.
  </CardContent>
  <CardFooter>
    <CardAction variant="primary">Ação Principal</CardAction>
  </CardFooter>
</Card>
```

**Variantes:** `default`, `outlined`, `elevated`, `filled`, `gradient`, `header-colored`, `dashed`  
**Subcomponentes:** `CardHeader`, `CardTitle`, `CardSubtitle`, `CardContent`, `CardFooter`, `CardAction`, `CardStatus`

### Dropdown

Menu dropdown flexível com suporte a diferentes triggers.

```tsx
import { Dropdown } from '@nti_ses/ui-components';

const items = [
  { key: '1', label: 'Editar', onClick: () => console.log('Edit') },
  { key: '2', type: 'divider' },
  { key: '3', label: 'Excluir', danger: true, onClick: () => console.log('Delete') },
];

<Dropdown
  items={items}
  trigger="click"
  placement="bottom-start"
  closeOnSelect={true}
>
  <Button>Ações</Button>
</Dropdown>
```

**Triggers:** `click`, `hover`, `contextMenu`  
**Posicionamento:** `bottom-start`, `bottom-end`, `top-start`, `top-end`, `left`, `right`

### Header

Cabeçalho de navegação responsivo com menu mobile.

```tsx
<Header
  logo={{ text: 'Minha App', href: '/' }}
  navigation={[
    { key: 'home', label: 'Início', href: '/', active: true },
    { key: 'about', label: 'Sobre', href: '/about' },
  ]}
  actionButton={{ label: 'Login', variant: 'primary' }}
  variant="default"
  sticky={true}
  onActionClick={() => console.log('Login clicked')}
/>
```

### Footer

Rodapé com logos, links e informações de copyright.

```tsx
<Footer
  links={[
    { key: '1', label: 'Privacidade', href: '/privacy' },
    { key: '2', label: 'Termos', href: '/terms' },
  ]}
  logos={[
    { key: '1', image: '/logo1.png', alt: 'Partner 1', href: 'https://partner1.com' },
  ]}
  copyright="© 2024 Minha Empresa. Todos os direitos reservados."
  backgroundColor="dark"
  textColor="light"
/>
```

### Input

Input avançado com ícones, validação e funcionalidades especiais.

```tsx
<Input
  label="Email"
  type="email"
  leftIcon={faEnvelope}
  placeholder="seu@email.com"
  error="Email é obrigatório"
  clearable
  showPassword // para type="password"
  counter // mostra contador de caracteres
  maxLength={50}
/>
```

**Props principais:**
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | etc
- `variant`: 'default' | 'filled' | 'outlined' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `leftIcon/rightIcon`: FontAwesome IconDefinition
- `leftAddon/rightAddon`: React.ReactNode (texto como "R$", ".com")
- `error/success/warning`: string | boolean
- `clearable`: boolean
- `showPassword`: boolean (para senhas)
- `counter`: boolean (contador de caracteres)
- `loading`: boolean

### Pagination

Componente de paginação completo com navegação e informações.

```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  totalItems={100}
  pageSize={10}
  itemsPerPageOptions={[10, 25, 50]}
  showInfo={true}
  showJumper={true}
  onPageChange={(page) => console.log('Page:', page)}
  onPageSizeChange={(size) => console.log('Page size:', size)}
/>
```

### Select

Seleção avançada com busca e seleção múltipla.

```tsx
const options = [
  { value: '1', label: 'Opção 1', description: 'Descrição da opção 1' },
  { value: '2', label: 'Opção 2', group: 'Grupo A' },
  { value: '3', label: 'Opção 3', disabled: true },
];

<Select
  label="Selecione uma opção"
  options={options}
  searchable
  clearable
  multiple={false}
  placeholder="Escolha uma opção..."
  onChange={(value) => console.log(value)}
  error={errorMessage}
/>
```

### Typography

Sistema de tipografia com 3 fontes customizadas.

```tsx
<Typography variant="h1" family="display" weight="bold">
  Título Principal
</Typography>

<Typography variant="body1" family="body">
  Texto do parágrafo usando Inter
</Typography>

<Typography family="accent" weight="medium">
  Elemento especial com Gibralt
</Typography>
```

**Props:**
- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'display' | 'accent'
- `family`: 'display' (Outfit) | 'body' (Inter) | 'accent' (Gibralt)
- `weight`: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
- `color`: 'primary' | 'secondary' | 'muted' | 'inverse'

## Design Tokens CSS

A biblioteca exporta variáveis CSS que você pode customizar:

```css
:root {
  /* Fontes */
  --font-family-display: 'Outfit', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  --font-family-accent: 'Gibralt', sans-serif;
  
  /* Cores */
  --color-primary: #0066cc;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  
  /* Espaçamentos */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  
  /* Bordas */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
}
```

## Acessibilidade

Todos os componentes seguem as melhores práticas de acessibilidade:

- **ARIA**: Atributos ARIA apropriados
- **Teclado**: Navegação completa por teclado
- **Screen Readers**: Suporte para leitores de tela
- **Contraste**: Cores com contraste adequado
- **Focus**: Indicadores visuais de foco

## Exemplo Completo - Dashboard

```tsx
import React, { useState } from 'react';
import {
  Header, Footer, Card, CardHeader, CardTitle, CardContent,
  Typography, Pagination, Select, Input, Button, Dropdown
} from '@nti_ses/ui-components';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', href: '/dashboard', active: true },
    { key: 'users', label: 'Usuários', href: '/users' },
    { key: 'reports', label: 'Relatórios', href: '/reports' },
  ];

  const footerLinks = [
    { key: 'privacy', label: 'Privacidade', href: '/privacy' },
    { key: 'terms', label: 'Termos', href: '/terms' },
    { key: 'support', label: 'Suporte', href: '/support' },
  ];

  const dropdownItems = [
    { key: 'edit', label: 'Editar', onClick: () => console.log('Edit') },
    { key: 'divider', type: 'divider' },
    { key: 'delete', label: 'Excluir', danger: true, onClick: () => console.log('Delete') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        logo={{ text: 'Sistema NTI', href: '/dashboard' }}
        navigation={navigationItems}
        actionButton={{ label: 'Perfil', variant: 'ghost' }}
        sticky
      />
      
      <main className="flex-1 container mx-auto p-6">
        <div className="mb-8">
          <Typography variant="h1" family="display" className="mb-2">
            Dashboard
          </Typography>
          <Typography variant="body1" color="muted">
            Visão geral do sistema e métricas principais
          </Typography>
        </div>
        
        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card hover shadow>
            <CardContent className="text-center p-6">
              <Typography variant="h2" family="display" color="primary" className="mb-2">
                1,234
              </Typography>
              <Typography variant="body2" color="muted">
                Usuários Ativos
              </Typography>
            </CardContent>
          </Card>
          
          <Card hover shadow>
            <CardContent className="text-center p-6">
              <Typography variant="h2" family="display" color="primary" className="mb-2">
                567
              </Typography>
              <Typography variant="body2" color="muted">
                Projetos Ativos
              </Typography>
            </CardContent>
          </Card>
          
          <Card hover shadow>
            <CardContent className="text-center p-6">
              <Typography variant="h2" family="display" color="primary" className="mb-2">
                89%
              </Typography>
              <Typography variant="body2" color="muted">
                Taxa de Sucesso
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Seção de filtros e tabela */}
        <Card variant="outlined" className="mb-6">
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Buscar usuários..."
                clearable
                className="flex-1"
              />
              <Select
                options={[
                  { value: 'all', label: 'Todos os Status' },
                  { value: 'active', label: 'Ativos' },
                  { value: 'inactive', label: 'Inativos' },
                ]}
                placeholder="Filtrar por status"
                className="w-48"
              />
              <Dropdown
                items={dropdownItems}
                placement="bottom-end"
              >
                <Button variant="ghost">Ações</Button>
              </Dropdown>
            </div>
            
            {/* Simulação de tabela */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <Typography variant="body1" weight="medium">
                      Usuário {item}
                    </Typography>
                    <Typography variant="body2" color="muted">
                      usuario{item}@empresa.com
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Ativo
                    </span>
                    <Dropdown
                      items={dropdownItems}
                      placement="bottom-end"
                    >
                      <Button variant="ghost" size="small">•••</Button>
                    </Dropdown>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                totalItems={100}
                pageSize={10}
                showInfo
                onPageChange={setCurrentPage}
              />
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer
        links={footerLinks}
        copyright="© 2024 NTI SES. Todos os direitos reservados."
        backgroundColor="light"
        textColor="dark"
      />
    </div>
  );
}

export default Dashboard;
```

## Storybook

Para ver todos os componentes e suas variações:

```bash
git clone https://github.com/nti_ses/ui-components.git
cd ui-components
npm install
npm run storybook
```

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento com watch
npm run dev

# Build de produção
npm run build

# Testes
npm test

# Storybook
npm run storybook
```

## Roadmap

- [x] Componente Button
- [x] Componente Input
- [x] Componente Typography
- [x] Componente Card
- [x] Componente Select
- [x] Componente Dropdown
- [x] Componente Header
- [x] Componente Footer
- [x] Componente Pagination
- [ ] Componente Modal/Dialog
- [ ] Componente Tabs
- [ ] Componente Table/DataTable
- [ ] Componente DatePicker
- [ ] Tema dark/light
- [ ] Animações com Framer Motion

## Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

MIT © NTI SES

## Suporte

- NPM: https://www.npmjs.com/package/@nti_ses/ui-components
- Issues: https://github.com/MikhaelBarretoSantana/NTI_SES_Components/issues
- Email: nti@empresa.com