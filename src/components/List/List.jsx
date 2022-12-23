import { Stack } from 'react-bootstrap'
import { useCandidateContext } from "../../context/candidateContext"
import { useNavigate } from 'react-router-dom';
import "./list.css";
const List = () => {
    const {candidateData} = useCandidateContext();
    const NavTo = useNavigate();
    const handleClick=(individual)=>{
      NavTo(`/home/${individual.id}`)
    }
  return (
    <Stack className="Home mt-4 p-4" gap={1} >
      {candidateData.length>0?
      candidateData.slice(0).reverse().map((individual)=>{
        return <span key={individual.id} className="candidateName d-flex justify-content-between " 
        onClick={()=>handleClick(individual)}
        > 
        <div className="name d-flex ">
        NAME : <h5>  {individual.name } </h5> 
        </div>
        <div className="id  d-flex ">
        Id : <h5> {individual.id }</h5> 
        </div> 

        </span>
      })
      :null}
    </Stack>
  )
}

export default List
