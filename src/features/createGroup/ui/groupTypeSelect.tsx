"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type GroupType = "closed" | "open";

type Option = {
  value: GroupType;
  title: string;
  description: string;
};

const options: Option[] = [
  {
    value: "closed",
    title: "Закрытая",
    description: "В закрытую группу можно попасть только по приглашению или пригласительной ссылке",
  },
  {
    value: "open",
    title: "Открытая",
    description:
      "Открытую группу можно найти через поиск. Присоединиться к ней может любой пользователь",
  },
];

type Props = {
  value: GroupType;
  onChange: (value: GroupType) => void;
  label?: string;
};

export const GroupTypeSelect = ({ value, onChange, label = "Тип группы" }: Props) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (open && !rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const selected = useMemo(() => options.find((o) => o.value === value)!, [value]);

  return (
    <div ref={rootRef} className="relative">
      <div className="text-gray mb-2 text-sm">{label}</div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-full items-center justify-between rounded-2xl bg-white px-5"
      >
        <span className="text-base">{selected.title}</span>
        <span className={open ? "rotate-180 transition-transform" : "transition-transform"}>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#747474" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="mt-2 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            {options.map((opt) => {
              const checked = opt.value === value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="flex w-full items-start gap-4 text-left"
                >
                  <span
                    className={[
                      "mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                      checked ? "border-primary border-2" : "border-muted border",
                    ].join(" ")}
                  >
                    {checked && <span className="bg-primary h-3 w-3 rounded-full" />}
                  </span>

                  <span className="flex flex-col">
                    <span className="text-base">{opt.title}</span>
                    <span className="text-muted-foreground text-sm leading-snug">
                      {opt.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
