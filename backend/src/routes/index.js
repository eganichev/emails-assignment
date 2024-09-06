import DB from '../db/index.js';
import { emailSchema } from '../schemas/index.js';

export default async function routes(fastify, options) {
  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });


  fastify.post('/emails', { schema: emailSchema }, async (request, reply) => {
    const { to, cc, bcc, subject, body } = request.body;

    try {
      const emailData = { to, cc, bcc, subject, body };
      const result = await DB.addLead(emailData);

      reply.status(201).send({ id: result[0], ...emailData });
    } catch (err) {
      reply.status(500).send({ error: 'Unable to add email' });
    }
  });


  fastify.get('/emails', async (request, reply) => {
    try {
      const emails = await DB.getAll();
      reply.send(emails);
    } catch (err) {
      reply.status(500).send({ error: 'Unable to fetch emails' });
    }
  });


  fastify.get('/emails/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      const email = await DB.getById(id);

      if (email) {
        reply.send(email);
      } else {
        reply.status(404).send({ error: 'Email not found' });
      }
    } catch (err) {
      reply.status(500).send({ error: 'Unable to fetch email' });
    }
  });

  fastify.get('/emails/search', async (request, reply) => {
    const { query } = request.query;

    try {
      const emails = await DB.search(query);
      reply.send(emails);
    } catch (err) {
      reply.status(500).send({ error: 'Unable to fetch emails' });
    }
  });
}
