import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketsService.getTicketTypes();
    
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
  try {
    const ticket = await ticketsService.getTicketByUserId(userId);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if(!error.message){
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.status(error.code).send(error.message)
  }
}

export async function postNewTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as {ticketTypeId: number}
  const { userId } = req
  if(!ticketTypeId){return res.sendStatus(httpStatus.BAD_REQUEST)}
  
  try {
    await ticketsService.createTicket(userId, ticketTypeId);
    const retrieve = await ticketsService.getTicketByUserId(userId)    
    return res.status(httpStatus.CREATED).send(retrieve);

  } catch (error) {
    if(!error.message){
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    console.log(error)
    return res.status(error.code).send(error.message)
  }
}
