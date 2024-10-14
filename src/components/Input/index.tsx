import clsx from "clsx"
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = ({ className, ...props }: Props) => {
  return (
    <input
      type="text"
      className={clsx(`w-full px-4 py-2 border rounded-md bg-white text-gray-800 disabled:bg-gray-200`, className)}
      {...props} />
  );
}

export default Input;