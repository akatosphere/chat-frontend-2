import { cn } from '@/shared/shadcn/lib/utils';

type ModalOverlayProps = {
  className?: string,
};

export const ModalOverlay : React.FC<ModalOverlayProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        'fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-50 max-w-lg w-full h-[95%] max-h-[760px] rounded-md bg-primary opacity-25 backdrop-blur-xs',
        className,
      )}></div>
  )
};