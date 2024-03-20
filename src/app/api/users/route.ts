// api/user.ts
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/database/firebase/config";
import UserDB from "@/database/wrappers/user";
import RequestException from "@/utils/requestException";
import { NextRequest, NextResponse } from "next/server";
import User from "@/database/entities/user.entity";
import masks from "@/utils/masks/masks";

function validateCreate(body: User) {
  if (!body.cpf) throw new RequestException(400, 'Campo cpf ausente');
  if (!body.name) throw new RequestException(400, 'Campo name ausente');
  if (!body.email) throw new RequestException(400, 'Campo email ausente');
  if (!body.password) throw new RequestException(400, 'Campo senha ausente');
  if (!body.role) throw new RequestException(400, 'Campo role ausente');
}

async function create(body: User) {
  try {
    const data = {
      name: body.name,
      cpf: masks.unmask(body.cpf),
      email: body.email,
      role: body.role,
    };
    const userCredential = await createUserWithEmailAndPassword(auth, body.email, body.password);
    const user = userCredential.user;

    if (user) {
      await new UserDB().createCustomId(user.uid, data);
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new RequestException(500, 'Erro ao criar usuário');
  }
}
export async function POST(request: NextRequest) {
  try {
    const body: User = await request.json();
    validateCreate(body);
    await create(body);
    return Response.json({ success: true, message: 'Usuário criado com sucesso' });
  } catch (error) {
    if (error instanceof RequestException) {
      return new Response(error.message, { status: error.status });
    } else {
      console.error('Erro interno:', error);
      return new Response('Erro interno do servidor', { status: 500 });
    }
  }
}
