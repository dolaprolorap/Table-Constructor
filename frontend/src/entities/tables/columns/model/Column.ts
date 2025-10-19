export interface Column {
    id: number;
    title: string;
    type: 'string' | 'number' | 'timestamp' | 'enum';
    enumValues?: string[];
}