import { createContext,useContext, useEffect, useState } from "react";

 const candidates = createContext();

const Context =({children})=>{
    const [candidateData, setCandidateData] = useState([]);
    const getCandidateData =async ()=>{
        try {   
            const res = await fetch("https://60d5a2c2943aa60017768b01.mockapi.io/candidate")
            const gotData= await res.json();
            setCandidateData(gotData);
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    useEffect(() => {
        getCandidateData();
    }, [])

   return (
    <candidates.Provider value={{candidateData,setCandidateData,getCandidateData}}>
        {children}
    </candidates.Provider>
   )
}

export default Context;

export const useCandidateContext =()=>{
    return useContext(candidates)
}