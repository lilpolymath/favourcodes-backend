const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get(`/users`, async (req, res) => {
  const result = await prisma.visitor.findMany();
  console.log(res.json(result));
});

app.post(`/user`, async (req, res) => {
  const { name } = req.body;
  const result = await prisma.visitor.create({
    data: {
      name: name,
    },
  });
  res.json(result);
});

app.delete(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  const result = await prisma.visitor.delete({
    where: { id: parseInt(id) },
  });
  res.json(result);
});

app.post(`/user/:id/like`, async (req, res) => {
  const { id } = req.params;
  const { slug } = req.body;
  const result = await prisma.post.update({
    where: { slug: slug },
    data: { likes: { increment: 1 } },
  });
  res.json(result);
});

app.get(`/posts`, async (req, res) => {
  const result = await prisma.post.findMany();
  console.log(res.json(result));
});

app.get(`/post/:slug`, async (req, res) => {
  const { slug } = req.params;
  const result = await prisma.post.findOne({
    where: { ...req.params },
  });
  res.json(result);
});

app.post(`/post`, async (req, res) => {
  const { slug } = req.body;
  const result = await prisma.post.create({
    data: {
      slug: slug,
      likes: 0,
    },
  });
  res.json(result);
});

app.delete(`/post/:slug`, async (req, res) => {
  const { slug } = req.params;
  const result = await prisma.post.delete({
    where: { slug: slug },
  });
  res.json(result);
});

var port = process.env.PORT || 3001;

const server = app.listen(port, () =>
  console.log('🚀 Server ready at: http://localhost:' + port)
);
