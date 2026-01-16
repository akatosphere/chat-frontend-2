"use client";

import { Control, Controller } from "react-hook-form";
import z from "zod";

import { Label } from "@/shared/shadcn/ui/label";
import { Select } from "@/shared/ui/select/select";

import { DAYS, MONTHS, YEARS } from "../lib/constants";
import { changeProfileSchema } from "../model/schema";

type BirthdaySelectProps = {
  control: Control<z.infer<typeof changeProfileSchema>>;
};

export const BirthdaySelect: React.FC<BirthdaySelectProps> = ({ control }) => (
  <div className="flex flex-col gap-1">
    <Label>Введите дату своего рождения</Label>
    <div className="flex gap-1">
      <Controller
        name="birthday.day"
        control={control}
        render={({ field }) => (
          <Select
            options={DAYS}
            value={field.value}
            onChange={field.onChange}
            placeholder="День"
            className="w-[80px] max-w-[80px] min-w-[80px]"
          />
        )}
      />
      <Controller
        name="birthday.month"
        control={control}
        render={({ field }) => (
          <Select
            options={MONTHS}
            value={field.value}
            onChange={field.onChange}
            placeholder="Месяц"
            className="w-[133px] max-w-[133px] min-w-[133px]"
          />
        )}
      />
      <Controller
        name="birthday.year"
        control={control}
        render={({ field }) => (
          <Select
            options={YEARS}
            value={field.value}
            onChange={field.onChange}
            placeholder="Год"
            className="w-full"
          />
        )}
      />
    </div>
  </div>
);
