import { NextResponse } from "next/server";
import { getAlunosCollection } from "./mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const collection = await getAlunosCollection();
    const alunos = await collection.find().toArray();
    return NextResponse.json(alunos);
  } catch (err) {
    console.error("Erro no GET:", err);
    return NextResponse.json({ error: "Erro ao buscar alunos" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const collection = await getAlunosCollection();
    const { nome, matricula, curso } = await req.json();

    if (!nome || !matricula || !curso) {
      return NextResponse.json(
        { error: "Preencha nome, matrícula e curso" },
        { status: 400 }
      );
    }

    const resposta = await collection.insertOne({
      nome,
      matricula,
      curso,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Aluno cadastrado com sucesso!", id: resposta.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erro no POST:", err);
    return NextResponse.json({ error: "Erro ao cadastrar aluno" }, { status: 500 });
  }
}


export async function PUT(req){
 try{
    const { id, nome, matricula, curso} = await req.json();
    const collection = await getAlunosCollection();
    const rusult = await collection.updateOne({_id: ObjectId.createFromHexString(id)},{$set: {nome, matricula, curso }});

    return NextResponse.json({message: "Alterado com sucesso"}, { status: 201})

 }catch (err) {
    console.error("Erro no PUT:", err);
    return NextResponse.json({ error: "Erro ao Alterar aluno" }, { status: 500 });
  
 }
  
}



export async function DELETE(req) {
  try{
    const { id} = await req.json();
    const collection = await getAlunosCollection();
    const rusult = await collection.deleteOne({_id: ObjectId.createFromHexString(id)});

    return NextResponse.json({message: "Deletado com sucesso"}, { status: 201})

 }catch (err) {
    return NextResponse.json({ error: "Erro ao Deletar aluno" }, { status: 500 });
 }
}