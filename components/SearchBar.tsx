"use client";

type SearchBarProps = {
  query: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({ query, onSearch }: SearchBarProps) {
  return (
    <div className="mb-6">
      <input
        type="search"
        value={query}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="제목이나 내용으로 검색"
        className="w-full rounded-lg border border-red-500/30 bg-black/60 px-4 py-3 text-sm text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] outline-none transition placeholder:text-neutral-600 focus:border-[#ff1744] focus:ring-2 focus:ring-[#ff1744]/40"
      />
    </div>
  );
}
