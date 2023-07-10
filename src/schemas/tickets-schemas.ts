import Joi from 'joi';
import { CreateUserParams } from '@/services/users-service';

export const createTicketSchema = Joi.object<{ticketTypeId:number}>({
    ticketTypeId: Joi.number().integer().required()
});
