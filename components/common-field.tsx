export default function CommonField({
  fieldName,
  fieldValue,
}: {
  fieldName: any
  fieldValue: any
}) {
  return (
    <div className="flex justify-between">
      <p className="font-bold">{fieldName}</p>
      <p className="capitalize text-center">{fieldValue}</p>
    </div>
  )
}
