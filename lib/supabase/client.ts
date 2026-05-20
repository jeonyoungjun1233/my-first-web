type QueryError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

type QueryResult<T> = {
  data: T | null;
  error: QueryError | null;
};

type QueryMethod = "GET" | "POST" | "PATCH" | "DELETE";

class RestQuery<T = unknown> implements PromiseLike<QueryResult<T>> {
  private method: QueryMethod = "GET";
  private body: unknown;
  private wantsSingle = false;
  private params = new URLSearchParams();

  constructor(
    private readonly table: string,
    private readonly url: string | undefined,
    private readonly anonKey: string | undefined,
  ) {}

  select(columns = "*") {
    this.params.set("select", columns);
    return this;
  }

  insert(values: unknown) {
    this.method = "POST";
    this.body = values;
    return this;
  }

  update(values: unknown) {
    this.method = "PATCH";
    this.body = values;
    return this;
  }

  delete() {
    this.method = "DELETE";
    return this;
  }

  eq(column: string, value: string | number) {
    this.params.set(column, `eq.${value}`);
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.params.set("order", `${column}.${options?.ascending ? "asc" : "desc"}`);
    return this;
  }

  range(from: number, to: number) {
    this.params.set("offset", String(from));
    this.params.set("limit", String(to - from + 1));
    return this;
  }

  single() {
    this.wantsSingle = true;
    return this;
  }

  async execute(): Promise<QueryResult<T>> {
    if (!this.url || !this.anonKey) {
      return {
        data: null,
        error: {
          message:
            "Supabase 환경 변수가 없습니다. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해주세요.",
        },
      };
    }

    const endpoint = `${this.url.replace(/\/$/, "")}/rest/v1/${this.table}?${this.params.toString()}`;
    const headers: Record<string, string> = {
      apikey: this.anonKey,
      Authorization: `Bearer ${this.anonKey}`,
      "Content-Type": "application/json",
      Prefer: this.method === "DELETE" ? "return=minimal" : "return=representation",
    };

    if (this.wantsSingle) {
      headers.Accept = "application/vnd.pgrst.object+json";
    }

    const response = await fetch(endpoint, {
      method: this.method,
      headers,
      body: this.body === undefined ? undefined : JSON.stringify(this.body),
      cache: "no-store",
    });

    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: payload?.message ?? "Supabase 요청에 실패했습니다.",
          details: payload?.details,
          hint: payload?.hint,
          code: payload?.code,
        },
      };
    }

    return { data: payload as T, error: null };
  }

  then<TResult1 = QueryResult<T>, TResult2 = never>(
    onfulfilled?: ((value: QueryResult<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return {
    from<T = unknown>(table: string) {
      return new RestQuery<T>(table, url, anonKey);
    },
  };
}
