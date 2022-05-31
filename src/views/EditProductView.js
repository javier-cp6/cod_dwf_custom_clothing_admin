import { useParams } from "react-router-dom"


export default function EditProductView() {
  const { idCat, idProduct } = useParams()

  return (
    <div>{idCat}</div>
  )
}
