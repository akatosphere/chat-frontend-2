import Close from "@icons/chat/close.svg";

import { useChatStore } from "@/entities/chat/model/useChatStore";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type ForwardBoxProps = {
  className?: string;
};

export const ForwardBox: React.FC<ForwardBoxProps> = ({ className }) => {
  const { forwardTarget, setForwardTarget } = useChatStore();
  if (!forwardTarget) return null;

  return (
    <div className={cn("bg-primary-secondary/10 w-full px-4 py-1", className)}>
      <div className="border-primary-secondary flex items-center justify-between gap-2.5 border-l-4">
        <div className="flex min-w-0 flex-1 flex-col pl-1">
          <span className="text-primary">Переслать сообщение</span>
          <div className="emojis-apple text-gray truncate">
            <span className="font-medium">
              {forwardTarget.fromUser.lastName
                ? forwardTarget.fromUser.firstName + " " + forwardTarget.fromUser.lastName
                : forwardTarget.fromUser.firstName}
            </span>
            {": "}
            {forwardTarget.content}
          </div>
        </div>
        <Button
          onClick={() => setForwardTarget(null)}
          variant={"text"}
          size={"inline"}
          className="h-3.5 w-3.5 shrink-0"
        >
          <Close />
        </Button>
      </div>
    </div>
  );
};
