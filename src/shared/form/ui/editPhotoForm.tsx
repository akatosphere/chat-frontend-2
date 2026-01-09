import { IconPhoto } from "@/shared/ui/icons/photo";

export const EditPhotoForm = () => {
  return (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <div className="bg-primary-light flex h-[200px] w-[200px] items-center justify-center rounded-full">
          <IconPhoto className="h-[68px] w-[76px]" />
        </div>
        <label
          className="text-primary block cursor-pointer text-center hover:underline"
          role="button"
        >
          Выбрать фотографию
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>
    </>
  );
};
