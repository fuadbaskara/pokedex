import { Tag } from 'antd'

export default function Moves({ moves }: { moves: any[] }) {
  return (
    <div className="p-2">
      {(moves || []).map((move, key) => (
        <Tag className="p-2" key={key}>
          {move.move.name}
        </Tag>
      ))}
    </div>
  )
}
