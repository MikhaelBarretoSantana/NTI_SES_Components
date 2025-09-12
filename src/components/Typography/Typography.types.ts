export interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline' | 'display' | 'accent';
    component?: keyof JSX.IntrinsicElements;
    family?: 'display' | 'body' | 'accent'; // Outfit, Inter, Gibralt
    weight?: 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'inherit';
    align?: 'left' | 'center' | 'right' | 'justify';
    children: React.ReactNode;
    className?: string;
}