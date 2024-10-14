import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  error?: boolean;
}

const Button = ({className, ...props}: Props) => {
  return (
    <button
      className={clsx(`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800 transition w-full disabled:bg-gray-400`,
        className,
        { 
          'bg-red-600 hover:bg-red-800 animate-shake': props.error,
        })}
      {...props} >
      {props.children}
    </button>
  );
}

export default Button;