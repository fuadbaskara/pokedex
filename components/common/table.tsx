import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Table({ children }: Props) {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  )
}
