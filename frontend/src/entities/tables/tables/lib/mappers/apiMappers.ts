import type { TableResponseBody } from "@/shared/api/openapi/client";
import type { TableApi } from "../../api";
import type { Table, TableWithColumns } from "../../model/types/tablesType";
import type { Column } from "@/entities/tables/columns";

export function mapApiToTable(tableApi: TableApi): Table {


    return {
        id: tableApi.id,
        title: tableApi.title,
    }
}

export function mapApiToTableWithColumns(tableApi: TableResponseBody): TableWithColumns {

    const columns: Column[] = tableApi.data.columns.map((column) => ({
        id: column.id,
        title: column.title,
        type: column.type,
        enumValues: column.type === 'enum' ? column.enum : undefined,
    }));

    return {
        id: tableApi.data.id,
        title: tableApi.data.title,
        columns
    }
}