# @nti_ses/ui-components

> Biblioteca de componentes React TypeScript para projetos da NTI com suporte a FontAwesome e fontes customizadas (Outfit, Inter, Gibralt).

[![NPM Version](https://img.shields.io/npm/v/@nti_ses/ui-components)](https://www.npmjs.com/package/@nti_ses/ui-components)
[![NPM Downloads](https://img.shields.io/npm/dm/@nti_ses/ui-components)](https://www.npmjs.com/package/@nti_ses/ui-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Instalação

```bash
npm install @nti_ses/ui-components
```

### Dependências necessárias (FontAwesome):
```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

## 📦 Componentes Disponíveis

- **Button** - Botão com múltiplas variantes e tamanhos
- **Input** - Input avançado com ícones, validação e funcionalidades especiais
- **Typography** - Sistema de tipografia com 3 fontes (Outfit, Inter, Gibralt)

## 🎨 Sistema de Fontes

- **Outfit** - Para títulos e elementos display
- **Inter** - Para corpo de texto e interface
- **Gibralt** - Para acentos e elementos especiais

## 💡 Uso Rápido

```tsx
import React from 'react';
import { Button, Input, Typography } from '@nti_ses/ui-components';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div>
      <Typography variant="h1">Sistema NTI</Typography>
      
      <Input
        label="Nome do usuário"
        leftIcon={faUser}
        placeholder="Digite seu nome"
        clearable
      />
      
      <Input
        label="Email"
        type="email"
        leftIcon={faEnvelope}
        placeholder="seu@email.com"
        required
      />
      
      <Input
        label="Senha"
        type="password"
        leftIcon={faLock}
        showPassword
        placeholder="••••••••"
        required
      />
      
      <Button variant="primary" size="large">
        Entrar no Sistema
      </Button>
    </div>
  );
}

export default App;
```

## 🔧 Componentes

### Button

```tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Clique aqui
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `loading`: boolean
- `disabled`: boolean

### Input

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

### Typography

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

## 🎨 Design Tokens CSS

A biblioteca exporta variáveis CSS que você pode customizar:

```css
:root {
  /* Fontes */
  --font-family-display: 'Outfit', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  --font-family-accent: 'Gibralt', sans-serif;
  
  /* Cores */
  --color-primary: #0066cc;
  --color-danger: #dc3545;
  --color-success: #28a745;
  
  /* Espaçamentos */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  
  /* E muito mais... */
}
```

## 📚 Storybook

Para ver todos os componentes e suas variações:

```bash
git clone https://github.com/nti_ses/ui-components.git
cd ui-components
npm install
npm run storybook
```

## 🛠️ Desenvolvimento

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

## 📋 Roadmap

- [ ] Componente Select/Dropdown
- [ ] Componente Modal
- [ ] Componente Card
- [ ] Componente Table
- [ ] Tema dark/light
- [ ] Mais ícones FontAwesome
- [ ] Animações com Framer Motion

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

MIT © NTI SES

## 📞 Suporte

- NPM: https://www.npmjs.com/package/@nti_ses/ui-components
- Issues: https://github.com/nti_ses/ui-components/issues
- Email: nti@empresa.com