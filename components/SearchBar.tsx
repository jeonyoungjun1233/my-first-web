"use client";

type SearchBarProps = {
  query: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({ query, onSearch }: SearchBarProps) {
  return (
    <div className="mb-5">
      <input
        type="search"
        value={query}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="제목이나 내용으로 검색"
        className="w-full rounded-lg border border-rose-200/15 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45"
      />
    </div>
  );
}
