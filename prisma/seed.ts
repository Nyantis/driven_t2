import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let user = await prisma.user.findFirst();
  let enrollment = await prisma.enrollment.findFirst();
  let address = await prisma.address.findFirst();
  let ticketType = await prisma.ticketType.findFirst();
  let ticket = await prisma.ticket.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: 1,
        email: "admin@gmail.com",
        password: await bcrypt.hash("12341234", 12),
      },
    });
  }
  
  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: {
        id: 1,
        birthday: dayjs("05-26-2000").toDate(),
        cpf: "11111111111",
        name: "Daniel Rolodrigo",
        phone: "77991555555",
        userId: 1,
      },
    });
  }

  if (!address) {
    address = await prisma.address.create({
      data: {
        id: 1,
        cep: "45700000",
        city: "Itapetinga",
        neighborhood: "Quintas do Morumbi",
        number: "124",
        state: "Ba",
        street: "Graciliano Ramuc",
        enrollmentId: 1
      },
    });
  }

  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: {
        id: 1,
        name: "Geronildo e os Carrascos",
        includesHotel: true,
        isRemote: false,
        price: 199,
      },
    });
  }

  if (!ticket) {
    ticket = await prisma.ticket.create({
      data: {
        id: 1,
        enrollmentId: 1,
        ticketTypeId: 1,
        status: "PAID",        
      },
    });
  }


  console.log({ event, user, enrollment, address, ticketType, ticket });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
