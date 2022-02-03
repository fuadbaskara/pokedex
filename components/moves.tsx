import { Tag } from 'antd'
import { Move } from 'gql/models'

export default function Moves({ moves }: { moves: Move[] }) {
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
