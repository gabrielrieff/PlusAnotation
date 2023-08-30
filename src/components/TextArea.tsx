import { HTMLProps } from "react";

export const TextArea = ({...rest} : HTMLProps<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...rest}
      className="w-full resize-none h-[160px] outline-none p-2 rounded-md
      border-[1px] border-solid border-gray-400 disabled:cursor-not-allowed">

      </textarea>
  )
}
