import { Stack } from 'react-bootstrap'
import { useCandidateContext } from "../../context/candidateContext"
import { useNavigate } from 'react-router-dom';

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
        return <span key={individual.id} className="candidateName" 
        onClick={()=>handleClick(individual)}
        >{individual.id},{individual.name || individual.Fname+individual.Lname}</span>
      })
      :null}
    </Stack>
  )
}

export default List
