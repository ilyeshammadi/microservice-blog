interface Query {
  authorId?: string;
}

interface Paginator {
  page?: number;
  limit?: number;
}

export interface ListRequest {
  query?: Query;
  paginator?: Paginator;
}
