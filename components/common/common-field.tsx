export default function CommonField({
  fieldName,
  fieldValue,
  className,
  style,
}: {
  fieldName: string
  fieldValue: string | number
  className?: string
  style?: any
}) {
  return (
    <tr className="flex justify-between">
      <td className="capitalize font-bold">{fieldName}</td>
      <td className={`capitalize ${className}`} style={style}>
        {fieldValue}
      </td>
    </tr>
  )
}

CommonField.defaultProps = {
  className: '',
  style: null,
}
