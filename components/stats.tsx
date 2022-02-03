import { Divider } from 'antd'
import { Stat } from 'gql/models'

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <>
      {(stats || []).map((stat, idx) => {
        return (
          <div key={idx}>
            <div className="flex justify-between p-2">
              <p className="font-bold">{stat.stat.name}</p>
              <div className="w-2/4">
                <div className="flex justify-between">
                  <p className="">Base Stat : </p>
                  <p className="capitalize text-center">{stat.base_stat}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">Effort : </p>
                  <p className="capitalize text-center">{stat.effort}</p>
                </div>
              </div>
            </div>
            {idx !== stats.length - 1 && (
              <div className="p-2">
                <Divider />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
