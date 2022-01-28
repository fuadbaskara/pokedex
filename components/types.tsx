import { Divider } from 'antd'

export default function Types({ types }: { types: any[] }) {
  return (
    <div className="p-2">
      {(types || []).map((type, key) => (
        <div key={key}>
          <div className="flex justify-between p-2">
            <p className="font-bold">{type.type.name}</p>
            <div className="w-2/4">
              <div className="flex justify-between">
                <p className="">Slot : </p>
                <p className="capitalize text-center">{type.slot}</p>
              </div>
            </div>
          </div>
          {key !== types.length - 1 && (
            <div className="p-2">
              <Divider />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
