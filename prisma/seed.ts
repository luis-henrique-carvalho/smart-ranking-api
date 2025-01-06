import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const player1 = await prisma.player.upsert({
    where: { email: 'player1@example.com' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'player1@example.com',
      phoneNumber: '1234567890',
    },
  });

  const player2 = await prisma.player.upsert({
    where: { email: 'player2@example.com' },
    update: {},
    create: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'player2@example.com',
      phoneNumber: '0987654321',
    },
  });

  console.log({ player1, player2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
