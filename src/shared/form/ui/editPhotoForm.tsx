import { IconPhoto } from "@/shared/ui/icons/photo";

export const EditPhotoForm = () => {
  return (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex justify-center">
          <div className="bg-primary-light desktop:size-[200px] flex size-[88px] items-center justify-center rounded-full">
            <IconPhoto className="desktop:size-[76px] size-[34px]" />
          </div>
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
