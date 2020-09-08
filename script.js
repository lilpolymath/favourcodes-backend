const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.visitor.findMany();
  console.log('allUsers', allUsers);
  const allPosts = await prisma.post.findMany();
  console.log('allPosts', allPosts);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
