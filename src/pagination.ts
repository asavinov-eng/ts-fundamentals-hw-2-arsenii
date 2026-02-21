const PER_PAGE = 15;

export default class Pagination {
  private readonly perPage: number;
  private page: number;

  constructor(perPage: number = PER_PAGE) {
    this.perPage = perPage;
    this.page = 1;
  }

  public reset(): void {
    this.page = 1;
  }

  public next(): void {
    this.page += 1;
  }

  public getPage(): number {
    return this.page;
  }

  public getPerPage(): number {
    return this.perPage;
  }
}
