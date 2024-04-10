import PromotionsDB from "@/database/wrappers/promotion";
import RequestException from "@/utils/requestException";
import { NextRequest } from "next/server";

function validateCreate(body: any) {
  if (!body.storeId) throw new RequestException(400, 'Campo storeId ausente');
  if (!body.name) throw new RequestException(400, 'Campo name ausente');
  if (!body.points) throw new RequestException(400, 'Campo points ausente');
  if (!body.awardId) throw new RequestException(400, 'Campo awardId ausente');
}

async function create(body: any) {
  try {
    const data = {
      name: body.name,
      active: true,
      points: body.points,
      awardId: body.awardId
    };


    new PromotionsDB(body.storeId).create(data);

  } catch (error) {
    console.error('Erro ao criar promoção:', error);
    throw new RequestException(500, 'Erro ao criar promoção');
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    validateCreate(body);
    await create(body);
    return Response.json({ success: true, message: 'promoção criada com sucesso' });
  } catch (error) {
    if (error instanceof RequestException) {
      return new Response(error.message, { status: error.status });
    } else {
      console.error('Erro interno:', error);
      return new Response('Erro interno do servidor', { status: 500 });
    }
  }
}

function validateUpdate(body: any) {
  if (!body.storeId) throw new RequestException(400, 'Campo storeId ausente');
  if (!body.name) throw new RequestException(400, 'Campo name ausente');
  if (!body.points) throw new RequestException(400, 'Campo points ausente');
  if (!body.awardId) throw new RequestException(400, 'Campo awardId ausente');
  if (!body.promotionId) throw new RequestException(400, 'Campo promotionId ausente');
}


async function update(body: any) {
  try {
    const data = {
      name: body.name,
      active: true,
      points: body.points,
      awardId: body.awardId
    };


    new PromotionsDB(body.storeId).update(body.promotionId, data);

  } catch (error) {
    console.error('Erro ao criar promoção:', error);
    throw new RequestException(500, 'Erro ao criar promoção');
  }
}
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    validateUpdate(body);
    await update(body);
    return Response.json({ success: true, message: 'promoção atualizada com sucesso' });
  } catch (error) {
    if (error instanceof RequestException) {
      return new Response(error.message, { status: error.status });
    } else {
      console.error('Erro interno:', error);
      return new Response('Erro interno do servidor', { status: 500 });
    }
  }
}
