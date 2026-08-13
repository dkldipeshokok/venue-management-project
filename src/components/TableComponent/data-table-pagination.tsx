import { Button } from "@Components/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@Components/index";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export type TQueryMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

interface DataTablePaginationProps {
  meta?: TQueryMeta;
}

export function DataTablePagination({
  meta,
}: DataTablePaginationProps) {
  const [searchParam, setSearchParams] = useSearchParams();

  if (!meta) {
    return null;
  }

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParam);

    params.set("page", String(page));

    setSearchParams(params);
  };

  const changePageSize = (take: number) => {
    const params = new URLSearchParams(searchParam);

    params.set("take", String(take));
    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <div
      className={`flex items-center justify-end px-2 mt-6 ${
        meta.itemCount <= 0 ? "hidden" : ""
      }`}
    >
      <div className="flex items-center space-x-6 lg:space-x-8">

        {/* Total rows */}
        <p className="text-sm font-medium">
          Total rows: {meta.itemCount}
        </p>

        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            Rows per page
          </p>

          <Select
            value={String(meta.take)}
            onValueChange={(value) =>
              changePageSize(Number(value))
            }
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={String(pageSize)}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Jump to page */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            Jump to page
          </p>

          <Select
            value={String(meta.page)}
            onValueChange={(value) =>
              changePage(Number(value))
            }
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent side="top">
              {Array.from(
                { length: meta.pageCount },
                (_, i) => (
                  <SelectItem
                    key={i + 1}
                    value={String(i + 1)}
                  >
                    {i + 1}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Page information */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {meta.page} of {meta.pageCount}
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-2">

          {/* First page */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => changePage(1)}
            disabled={!meta.hasPreviousPage}
          >
            <span className="sr-only">
              Go to first page
            </span>
            {"<<"}
          </Button>

          {/* Previous */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              changePage(Math.max(1, meta.page - 1))
            }
            disabled={!meta.hasPreviousPage}
          >
            <span className="sr-only">
              Go to previous page
            </span>

            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {/* Next */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              changePage(
                Math.min(meta.pageCount, meta.page + 1),
              )
            }
            disabled={!meta.hasNextPage}
          >
            <span className="sr-only">
              Go to next page
            </span>

            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => changePage(meta.pageCount)}
            disabled={!meta.hasNextPage}
          >
            <span className="sr-only">
              Go to last page
            </span>
            {">>"}
          </Button>

        </div>
      </div>
    </div>
  );
}