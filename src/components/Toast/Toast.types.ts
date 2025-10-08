export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    /**
     * Variante do toast que define a cor e ícone
     */
    variant: ToastVariant;

    /**
     * Título do toast (opcional)
     */
    title?: string;

    /**
     * Mensagem principal do toast
     */
    message: string;

    /**
     * Se deve mostrar o botão de fechar
     */
    closable?: boolean;

    /**
     * Função chamada quando o toast é fechado
     */
    onClose?: () => void;

    /**
     * Se o toast deve ser fechado automaticamente
     */
    autoClose?: boolean;

    /**
     * Tempo em milissegundos para fechar automaticamente (padrão: 5000)
     */
    autoCloseDelay?: number;

    /**
     * Classes CSS adicionais
     */
    className?: string;

    /**
     * ID único do toast
     */
    id?: string;
}