export default function CommonField({
  fieldName,
  fieldValue,
  className,
  style,
}: {
  fieldName: any
  fieldValue: any
  className?: string
  style?: any
}) {
  return (
    <tr className="flex justify-between">
      <td className="capitalize font-bold">{fieldName}</td>
      <td className={`${className}`} style={style}>
        {fieldValue}
      </td>
    </tr>
  )
}

CommonField.defaultProps = {
  className: '',
  style: null,
}
