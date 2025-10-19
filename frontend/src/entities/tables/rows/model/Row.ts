import type { TableCell } from '../../cells'

export interface TableRow {
	id: number;
	data: TableCell[]
	createdAt: Date;
	createdBy: string;
	deletedAt: Date | null;
	deletedBy: string | null;
}