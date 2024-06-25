import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.user.deleteMany();

    const email = process.env.SUPERADMIN_EMAIL;
    const password = process.env.SUPERADMIN_PASSWORD;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const exist = await prisma.user.findUnique({ where: { email } });

    if (exist) await prisma.user.delete({ where: { email } });
    console.log(`Removing existing user. 🗑️`);

    await prisma.user.create({
      data: {
        name: 'Superadmin FSM',
        email: email,
        password: salt + hashedPassword,
        role: Role.superadmin,
      },
    });

    console.log(`Creating new superadmin account. 🚀`);
    console.log(`Database has been seeded. 🌱`);
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn('Error While generating Seed: \n', err);
});
