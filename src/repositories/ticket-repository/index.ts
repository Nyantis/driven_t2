import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';

async function findAllTicketTypes() {
  return await prisma.ticketType.findMany();
}

async function findById(id:number) {
  return await prisma.ticket.findUnique({
    where:{id},
    select:{enrollmentId:true}
  });
}

async function findWithTypeById(id:number) {
  return await prisma.ticket.findUnique({
    where:{id},
    include:{
      TicketType:true
    }
  });
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

async function processPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

async function findValidTicketForBooking(userId: number) {
  return await prisma.ticket.findFirst({
    where: {
      Enrollment: { userId },
      TicketType: { isRemote: false, includesHotel: true },
      status: 'PAID',
    },
  });
}


const ticketRepository = {
  findAllTicketTypes,
  findTicket,
  findById,
  insert,
  findWithTypeById,
  processPayment
};

export default ticketRepository;
