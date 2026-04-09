import type { ChecklistItem } from "../lib/posts";

type ChecklistPanelProps = {
  title: string;
  items: readonly ChecklistItem[];
  compact?: boolean;
};

export default function ChecklistPanel({
  title,
  items,
  compact = false,
}: ChecklistPanelProps) {
  return (
    <section
      className={`neon-panel scan-lines rounded-[28px] ${
        compact ? "p-4 md:p-5" : "p-5 md:p-6"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-rose-200/65">
            Checklist
          </p>
          <h3 className="display-font mt-2 text-lg font-semibold text-white md:text-xl">
            {title}
          </h3>
        </div>
        <span className="neon-pill rounded-full px-3 py-1 text-xs font-semibold text-rose-100">
          {items.filter((item) => item.checked).length}/{items.length} done
        </span>
      </div>

      <ul className={compact ? "space-y-2.5" : "space-y-3"}>
        {items.map((item) => (
          <li
            key={item.id}
            className="neon-outline flex items-start gap-3 rounded-2xl px-3 py-3 text-sm text-rose-50/88 md:text-[0.95rem]"
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
                item.checked
                  ? "border-rose-300/70 bg-rose-400 text-[#27040d] shadow-[0_0_18px_rgba(251,113,133,0.45)]"
                  : "border-white/15 bg-white/5 text-white/50"
              }`}
            >
              {item.checked ? "v" : ""}
            </span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
