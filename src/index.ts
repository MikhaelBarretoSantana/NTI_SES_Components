// Importação De estilização Essencial
import './styles/fonts.scss';
import './styles/_icons.scss';
import './styles/tokens.scss';
import './styles/global.scss';
import './styles/typography.scss';

export { Button } from './components/Button/Button';
export { Input } from './components/Input/Input';
export { Typography } from './components/Typography/Typography';
export { Select } from './components/Select/Select';
export { Dropdown } from './components/Dropdown/Dropdown';
export { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardSubtitle, 
    CardContent, 
    CardFooter, 
    CardAction, 
    CardStatus 
} from "./components/Card/Card";
export { Header } from "./components/Header/Header";
export { Footer } from "./components/Footer/Footer";
export { Pagination } from "./components/Pagination/Pagination";
export { DateRange } from "./components/DateRange/DateRange";

export type { ButtonProps } from './components/Button/Button.types';
export type { InputProps, InputType, InputVariant } from './components/Input/Input.types';
export type { TypographyProps } from './components/Typography/Typography.types';
export type { SelectProps, SelectOption, SelectVariant } from './components/Select/Select.types';
export type { 
    DropdownProps, 
    DropdownItem, 
    DropdownTrigger, 
    DropdownPlacement,
    DropdownVariant
} from './components/Dropdown/Dropdown.types';
export type { 
    CardProps,
    CardHeaderProps,
    CardTitleProps,
    CardSubtitleProps,
    CardContentProps,
    CardFooterProps,
    CardActionProps,
    CardVariant,
    CardSize,
    CardHeaderColor,
    CardDashedColor,
    CardDashedWidth
} from "./components/Card/Card.types";
export type { 
    HeaderProps,
    HeaderLogo,
    HeaderNavigationItem,
    HeaderActionButton
} from "./components/Header/Header.types";
export type { 
    FooterProps,
    FooterLogo,
    FooterLink
} from "./components/Footer/Footer.types";
export type { 
    PaginationProps,
    PaginationLabels
} from "./components/Pagination/Pagination.types";
export type {
    DateRangeProps,
    DateRangeValue,
    DateRangePreset
} from "./components/DateRange/DateRange.types";