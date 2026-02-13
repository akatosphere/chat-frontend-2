"use client";

import { FormProvider } from "react-hook-form";

import { AvatarSection } from "@/shared/avatar/ui/avatarSelection";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { useCreateChat } from "../lib/useCreateChat";
import { ChatTypeSelect } from "./chatTypeSelect";
import { Field } from "./field";

type CreateChatFormProps = {
  className?: string;
};

export const CreateChatForm: React.FC<CreateChatFormProps> = ({ className }) => {
  const {
    form,
    isAvatarModalOpen,
    setIsAvatarModalOpen,
    previewUrl,
    handleAvatarChange,
    handleAvatarDelete,
    onNextStep,
    isValid,
  } = useCreateChat();

  return (
    <FormProvider {...form}>
      <form
        className={cn("mb-4 flex h-full flex-col px-2", className)}
        onSubmit={form.handleSubmit(onNextStep)}
      >
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex w-full flex-col gap-4">
            <AvatarSection
              avatarUrl={previewUrl}
              onAvatarDelete={handleAvatarDelete}
              onAvatarChange={handleAvatarChange}
              isAvatarChangeModalOpen={isAvatarModalOpen}
              setIsModalOpen={setIsAvatarModalOpen}
              avatarVariant="chat"
            />

            <div>
              <Field name="title" title="Название*" maxLength={100} position="upper" />
              <Field name="description" title="Описание" maxLength={250} position="lower" />
            </div>

            <ChatTypeSelect />
          </div>

          <div className="w-full">
            <Button
              variant="default"
              size="md"
              type="submit"
              className="desktop:mb-2 mt-4 w-full"
              disabled={!isValid}
            >
              Далее
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
