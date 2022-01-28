import { Card } from 'antd'

interface Props {
  className?: string
}

export default function SkeletonCard({ className }: Props) {
  return (
    <div id="skeleton-card">
      <Card>
        <div className={`skeleton ${className}`} />
      </Card>
    </div>
  )
}

SkeletonCard.defaultProps = {
  className: '',
}
