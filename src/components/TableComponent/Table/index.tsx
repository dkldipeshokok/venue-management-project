import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@Components/index";

import { useState } from "react";
import { DataTablePagination } from "../data-table-pagination";

interface DataTableProps {
  columns: ColumnDef<any>[];
  data: any[];
  sortingName?: string;
  meta?: TQueryMeta;
}

export type TQueryMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export function DataTables({
  columns,
  data,
  sortingName,
  meta,
}: DataTableProps) {
  const [sorting, setSorting] = useState<
    {
      id: string;
      desc: boolean;
    }[]
  >(sortingName ? [{ id: sortingName, desc: true }] : []);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: meta?.take || 10,
  });

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      pagination,
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  return (
    <div className="w-full">
      {/* Table */}
      <div className="rounded-md border">
        <Table className="w-full">
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        <TableHead className="w-20 px-5 py-4 text-base font-semibold">
          S.N
        </TableHead>

        {headerGroup.headers.map((header) => (
          <TableHead
            key={header.id}
            className="px-5 py-4 text-base font-semibold"
          >
            {header.isPlaceholder
              ? null
              : flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>

  <TableBody>
    {table.getRowModel().rows.length ? (
      table.getRowModel().rows.map((row, index) => (
        <TableRow key={row.id}>
          <TableCell className="w-20 px-5 py-4 text-base">
            {meta
              ? (meta.page - 1) * meta.take + index + 1
              : row.index + 1}
          </TableCell>

          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className="px-5 py-4 text-base"
            >
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext(),
              )}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell
          colSpan={columns.length + 1}
          className="h-24 text-center"
        >
          No results.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
      </div>

      {/* Pagination */}
      <DataTablePagination meta={meta} />
    </div>
  );
}