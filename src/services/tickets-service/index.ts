import { conflictError, notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType[]> {
    const ticketTypes = await ticketRepository.findAllTicketTypes();

    return ticketTypes
}

async function getTicketByUserId(userId: number) {
    const { Ticket:ticket } = await ticketRepository.findTicket(userId);

    if(!ticket){throw notFoundError()}

    return ticket
}


async function createTicket(userId: number, ticketTypeId: number) {
    const enroll = await enrollmentRepository.findWithAddressByUserId(userId)
    console.log(enroll)
    if(!enroll){throw notFoundError()}

    const create = await ticketRepository.insert(enroll.id, ticketTypeId)
    if(!create){throw conflictError("Ticket already exists")}

    return 
}

const ticketsService = {
    getTicketTypes,
    getTicketByUserId,
    createTicket
};

export default ticketsService;


