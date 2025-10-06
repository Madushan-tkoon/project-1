import clsx from "clsx"
import React from "react"
import Link from "next/link"

const Button = ({ color, children, href, onClick }) => {
  const classes = clsx(
    "font-2 py-2 px-4 rounded-[5px] cursor-pointer inline-flex items-center justify-center",
    color === "black" && "text-black bg-[#ffffff]",
    color === "white" && "text-white bg-transparent",
    color === "TBlack" && "text-black bg-transparent",
    color === "black&white" && "text-white bg-black"
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

export default Button
