
import { useState } from "react";
import FormInfo from "../../components/Form/Form";
import List from "../../components/List/List"
import "./Home.css"
const Home = () => {
  const [toggle, setToggle] = useState(false);
  return (<>
  <header className="d-flex justify-content-between ps-5 pe-5 mt-2 ">
      <h1>Candidate Manegement System....</h1>
      <button className="btn  btn-outline-dark" onClick={()=>setToggle(!toggle)}>
       {!toggle ? "Add New Candidate" :"Dont Want to..."} 
      </button>
  </header>
  <div className="d-flex">
    <div className="list" >
        <List />
    </div>
    <div className="form">
    {toggle && <FormInfo setToggle={setToggle} toggle={toggle}/>}
    </div>
  </div>
  
  </>
  )
}

export default Home

