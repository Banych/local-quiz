import { forwardRef, HTMLProps } from "react";
import { SmallUserCard } from "@/components/users/small-user-card/SmallUserCard";
import { User } from "@/models/User";
import { cn } from "@/utils/cl";

export type UsersPopupProps = HTMLProps<HTMLDivElement> & {
  users: { [key: string]: User };
};

const UsersPopupComponent: React.ForwardRefRenderFunction<
  HTMLDivElement,
  UsersPopupProps
> = ({ users, className, ...otherProps }, ref) => {
  return (
    <div
      {...otherProps}
      ref={ref}
      className={cn(
        "absolute right-0 bg-white border border-gray-300 rounded-lg p-4 shadow-lg",
        "transition-all duration-300",
        "shadow-md ",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-4">
        {Object.values(users).map((user, index) => (
          <SmallUserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export const UsersPopup = forwardRef(UsersPopupComponent);

UsersPopup.displayName = "UsersPopup";
