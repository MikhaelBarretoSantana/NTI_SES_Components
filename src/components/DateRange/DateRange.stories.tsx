import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRange } from './DateRange';
import { DateRangeValue, DateRangePreset } from './DateRange.types';
import { faCalendarAlt, faFilter, faChartLine } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof DateRange> = {
    title: 'Components/DateRange',
    component: DateRange,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Componente para seleção de períodos com data início e fim no mesmo input, incluindo presets configuráveis.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'filled', 'outlined', 'ghost']
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large']
        },
        dateFormat: {
            control: 'text'
        },
        locale: {
            control: 'text'
        }
    }
};

export default meta;
type Story = StoryObj<typeof DateRange>;

// Presets customizados para exemplos
const customPresets: DateRangePreset[] = [
    {
        key: 'today',
        label: 'Hoje',
        getValue: () => {
            const today = new Date().toISOString().split('T')[0];
            return { startDate: today, endDate: today };
        }
    },
    {
        key: 'thisWeek',
        label: 'Esta Semana',
        description: 'Segunda a Domingo',
        getValue: () => {
            const now = new Date();
            const monday = new Date(now);
            monday.setDate(now.getDate() - now.getDay() + 1);
            const sunday = new Date(monday);
            sunday.setDate(monday.getDate() + 6);

            return {
                startDate: monday.toISOString().split('T')[0],
                endDate: sunday.toISOString().split('T')[0]
            };
        }
    },
    {
        key: 'lastQuarter',
        label: 'Último Trimestre',
        description: '3 meses atrás',
        getValue: () => {
            const end = new Date();
            end.setDate(end.getDate() - 1);
            const start = new Date(end);
            start.setMonth(start.getMonth() - 3);

            return {
                startDate: start.toISOString().split('T')[0],
                endDate: end.toISOString().split('T')[0]
            };
        }
    }
];

// Componente wrapper para stories com estado
const DateRangeWithState = (args: any) => {
    const [value, setValue] = useState<DateRangeValue | null>(args.value || null);

    return (
        <div style={{ width: '400px' }}>
            <DateRange
                {...args}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    console.log('DateRange changed:', newValue);
                }}
            />
        </div>
    );
};

export const Default: Story = {
    render: DateRangeWithState,
    args: {
        label: 'Período',
        placeholder: 'Selecione o período...'
    }
};

export const WithPresets: Story = {
    render: DateRangeWithState,
    args: {
        label: 'Período do Relatório',
        placeholder: 'Escolha as datas...',
        showPresets: true,
        helperText: 'Selecione um período ou use um dos presets disponíveis'
    }
};

export const CustomPresets: Story = {
    render: DateRangeWithState,
    args: {
        label: 'Análise de Dados',
        leftIcon: faChartLine,
        presets: customPresets,
        presetsTitle: 'Períodos de Análise',
        helperText: 'Presets personalizados para análise de dados'
    }
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
            <DateRangeWithState
                variant="default"
                label="Default"
                placeholder="Variante padrão"
            />
            <DateRangeWithState
                variant="filled"
                label="Filled"
                placeholder="Variante preenchida"
            />
            <DateRangeWithState
                variant="outlined"
                label="Outlined"
                placeholder="Variante com borda"
            />
            <DateRangeWithState
                variant="ghost"
                label="Ghost"
                placeholder="Variante fantasma"
            />
        </div>
    )
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
            <DateRangeWithState
                size="small"
                label="Pequeno"
                placeholder="Tamanho pequeno"
            />
            <DateRangeWithState
                size="medium"
                label="Médio"
                placeholder="Tamanho médio (padrão)"
            />
            <DateRangeWithState
                size="large"
                label="Grande"
                placeholder="Tamanho grande"
            />
        </div>
    )
};

export const ValidationStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
            <DateRangeWithState
                label="Período Válido"
                success="Período selecionado corretamente"
                value={{ startDate: '2024-01-01', endDate: '2024-01-31' }}
            />
            <DateRangeWithState
                label="Período com Erro"
                error="Data de fim deve ser posterior à data de início"
                value={{ startDate: '2024-01-31', endDate: '2024-01-01' }}
            />
            <DateRangeWithState
                label="Período com Aviso"
                warning="Período muito longo pode afetar a performance"
                value={{ startDate: '2024-01-01', endDate: '2024-12-31' }}
            />
        </div>
    )
};

export const WithValidation: Story = {
    render: DateRangeWithState,
    args: {
        label: 'Período com Validação',
        minDate: '2024-01-01',
        maxDate: '2024-12-31',
        maxRange: 30,
        helperText: 'Período máximo de 30 dias, apenas 2024',
        error: undefined
    }
};

export const CustomIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
            <DateRangeWithState
                label="Com Ícone Personalizado"
                leftIcon={faFilter}
                placeholder="Filtrar por período"
            />
            <DateRangeWithState
                label="Sem Presets"
                leftIcon={faCalendarAlt}
                showPresets={false}
                placeholder="Apenas seleção manual"
            />
        </div>
    )
};

export const Loading: Story = {
    render: DateRangeWithState,
    args: {
        label: 'Carregando Dados',
        loading: true,
        placeholder: 'Carregando períodos disponíveis...'
    }
};

export const Disabled: Story = {
    render: DateRangeWithState,
    args: {
        label: 'Campo Desabilitado',
        disabled: true,
        placeholder: 'Campo não disponível',
        value: { startDate: '2024-01-01', endDate: '2024-01-31' }
    }
};

export const WithoutClear: Story = {
    render: DateRangeWithState,
    args: {
        label: 'Sem Botão Limpar',
        clearable: false,
        value: { startDate: '2024-01-01', endDate: '2024-01-31' },
        helperText: 'Este campo não pode ser limpo'
    }
};

export const CustomSeparator: Story = {
    render: DateRangeWithState,
    args: {
        label: 'Separador Customizado',
        separator: ' até ',
        value: { startDate: '2024-01-01', endDate: '2024-01-31' },
        helperText: 'Usando "até" como separador'
    }
};

export const Interactive: Story = {
    render: () => {
        const [value, setValue] = useState<DateRangeValue | null>(null);
        const [logs, setLogs] = useState<string[]>([]);

        const addLog = (message: string) => {
            setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
        };

        return (
            <div style={{ width: '500px' }}>
                <DateRange
                    label="Período Interativo"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        addLog(`Período alterado: ${JSON.stringify(newValue)}`);
                    }}
                    onClear={() => addLog('Período limpo')}
                    onPresetSelect={(preset) => addLog(`Preset selecionado: ${preset.label}`)}
                    helperText="Interaja com o componente para ver os logs"
                />

                {logs.length > 0 && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#f3f4f6',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                    }}>
                        <strong>Logs de Eventos:</strong>
                        {logs.map((log, index) => (
                            <div key={index} style={{ margin: '0.25rem 0' }}>
                                {log}
                            </div>
                        ))}
                    </div>
                )}

                {value && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#ecfdf5',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                    }}>
                        <strong>Valor Atual:</strong>
                        <pre style={{ margin: '0.5rem 0 0 0' }}>
                            {JSON.stringify(value, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        );
    }
};