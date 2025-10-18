export interface PageNumberPagination {
  disabled?: boolean;
  active?: boolean;
  paginationTitle: string;
  goToPage?: () => void;
}