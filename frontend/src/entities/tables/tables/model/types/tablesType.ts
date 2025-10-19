import type { Column } from "@/entities/tables/columns"

export interface Table {
    id: number
    title: string
}

export interface TableWithColumns extends Table {
    columns: Column[]
}