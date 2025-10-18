import type { Table } from "@/shared/api/openapi/client";
import { useTableStore } from "./model/TableStore";
import { useGetAllTables } from "./api";

export type {
    Table
}

export {
    useTableStore,
    useGetAllTables
}