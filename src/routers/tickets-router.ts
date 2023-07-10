import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllTicketsTypes, getUserTicket, postNewTicket } from '@/controllers';
import { createTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getAllTicketsTypes)
  .get('/', getUserTicket)
  .post('/', validateBody(createTicketSchema), postNewTicket);

export { ticketsRouter };
