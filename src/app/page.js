"use client"

import { useState } from "react";
export default function Page() {
  const [nome, setNome] =  useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const salvarDados = async(event) => {
    try{
      event.preventDefault();
      const resposta =  await fetch("http://localhost:3000/api/alunos",{
        method: "POST",
        header: { "Content-type": "Application/Json"},
        body: JSON.stringify({nome: nome, matricula: matricula, curso: curso})
      })

      if(resposta.ok){
        alert("Show de bola !!!")
      }
    }catch(err){
      return console.error("deu errro", err)
    }
  }


  return (
    <main>
        <form onSubmit={salvarDados}>
            <input type = "text" placeholder="Digite Nome:" onChange = {(event)=> setNome(event.target.value)}/>
        
            <input type = "number" placeholder="Digite matricula" onChange={(event)=> setMatricula(event.target.value)}/>
            <input type = "text" placeholder="Digite curso" onChange={(event)=> setCurso(event.target.value)}/>
          <button>Salvar</button>
        </form>

        
    </main>
  );
}
