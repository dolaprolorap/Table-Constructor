import { useGetAllTables } from "./services/useGetAllTables";
import { useCreateTable } from "./services/useCreateTable";

export { useGetAllTables, useCreateTable }

export type {
    Table as TableApi,
    TableWithColumns as TableWithColumnsApi
} from '@/shared/api/openapi/client'