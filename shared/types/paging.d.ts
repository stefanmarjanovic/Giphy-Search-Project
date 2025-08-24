export interface Page<T> {
  data?: T[];
  pagination: {
    limit: number;
    totalPages: number;
    nextFrom?: number;
    pages: number;
    currentPage: number;
  };
  onPageChange: (page:number) => void;
}