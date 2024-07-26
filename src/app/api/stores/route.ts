// api/user.ts
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/database/firebase/config";
import UserDB from "@/database/wrappers/user";
import RequestException from "@/utils/requestException";
import { NextRequest, NextResponse } from "next/server";
import User from "@/database/entities/user.entity";
import masks from "@/utils/masks/masks";
import StoreDB from "@/database/wrappers/store";
import Store from "@/database/entities/store.entity";

function validateCreate(body: any) {
  if (!body.name) throw new RequestException(400, 'Campo name ausente');
  if (!body.cnpj) throw new RequestException(400, 'Campo cnpj ausente');
  if (!body.email) throw new RequestException(400, 'Campo email ausente');
  if (!body.phone) throw new RequestException(400, 'Campo phone ausente');
  if (!body.cep) throw new RequestException(400, 'Campo cep ausente');
  if (!body.uf) throw new RequestException(400, 'Campo uf ausente');
  if (!body.city) throw new RequestException(400, 'Campo cidade ausente');
  if (!body.neighborhood) throw new RequestException(400, 'Campo bairro ausente');
  if (!body.street) throw new RequestException(400, 'Campo rua ausente');
}

async function create(body: any) {
  try {
    const data: any = {
      name: body.name,
      cnpj: masks.unmask(body.cnpj),
      email: body.email,
      phone: body.phone,
      address: {
        cep: body.cep,
        uf: body.uf,
        city: body.city,
        neighborhood: body.neighborhood,
        street: body.street,
        number: body.number,
      },
      status: true,
    };

    new StoreDB().create(data);
  
  } catch (error) {
    console.error('Erro ao criar loja:', error);
    throw new RequestException(500, 'Erro ao criar loja');
  }
}
export async function POST(request: NextRequest) {
  try {
    const body: User = await request.json();
    validateCreate(body);
    await create(body);
    return Response.json({ success: true, message: 'Loja criada com sucesso' });
  } catch (error) {
    if (error instanceof RequestException) {
      return new Response(error.message, { status: error.status });
    } else {
      console.error('Erro interno:', error);
      return new Response('Erro interno do servidor', { status: 500 });
    }
  }
}

async function update(body: User) {
  try {
    const data = {
      name: body.name,
      cpf: masks.unmask(body.cpf),
      email: body.email,
      role: body.role,
    };
    // const userCredential = await createUserWithEmailAndPassword(auth, body.email, body.password);
    // const user = userCredential.user;

    // if (user) {
    //   await new UserDB().createCustomId(user.uid, data);
    // }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new RequestException(500, 'Erro ao criar usuário');
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: User = await request.json();
    validateCreate(body);
    await update(body);
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
