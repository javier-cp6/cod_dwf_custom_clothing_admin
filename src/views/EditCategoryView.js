import { useParams } from "react-router-dom"

export default function EditCategoryView() {
  const {idCat} = useParams()
  
  return (
    <div>{idCat}</div>
  )
}
