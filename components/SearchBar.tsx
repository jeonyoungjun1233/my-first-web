"use client";

import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="게시글 검색..."
        className="w-full px-3 py-2 rounded border bg-black/10 text-sm outline-none"
      />
    </div>
  );
}
