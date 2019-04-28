interface Query {
  authorId?: string;
}

interface Paginate {
  page?: number;
  limit?: number;
}

export interface ListRequest {
  query?: Query;
  paginate?: Paginate;
}
