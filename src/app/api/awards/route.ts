// api/user.ts
import Award from "@/database/entities/award.entity";
import Store from "@/database/entities/store.entity";
import AwardDB from "@/database/wrappers/award";
import StoreDB from "@/database/wrappers/store";
import RequestException from "@/utils/requestException";
import { NextRequest } from "next/server";

function validateCreate(body: any) {
  if (!body.storeId) throw new RequestException(400, 'Campo storeId ausente');
  if (!body.name) throw new RequestException(400, 'Campo name ausente');
  if (!body.price) throw new RequestException(400, 'Campo price ausente');
}

async function create(body: any) {
  try {
    const data = {
      name: body.name,
      status: true,
      price: body.price,
      image: body.image,
      image_url: body.image_url
    };

    new AwardDB(body.storeId).create(data);

  } catch (error) {
    console.error('Erro ao criar loja:', error);
    throw new RequestException(500, 'Erro ao criar loja');
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
