import { prisma } from '@/config';
import { conflictError } from '@/errors';

async function findAllTicketTypes() {
  return await prisma.ticketType.findMany();
}

async function findTicket(userId:number) {
  return await prisma.enrollment.findUnique({
    select:{
      Ticket: {
        select:{
          id: true,
          status: true,
          ticketTypeId: true,
          enrollmentId: true,
          TicketType: true,
          createdAt: true,
          updatedAt: true          
        }
      }
    },
    where: {
      userId: userId
    }
  })
}

async function insert(enrollmentId:number, ticketTypeId:number) {
  try {
    return await prisma.ticket.create({
      data:{
        enrollmentId: enrollmentId,
        ticketTypeId: ticketTypeId,
        status: 'RESERVED'
      }
    }
  );
  } catch (error) {
  }
}

const ticketRepository = {
  findAllTicketTypes,
  findTicket,
  insert
};

export default ticketRepository;
