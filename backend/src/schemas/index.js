export const emailSchema = {
  body: {
    type: 'object',
    required: ['to', 'cc', 'bcc', 'subject', 'body'],
    properties: {
      to: { type: 'string', minLength: 1 },
      cc: { type: 'string', minLength: 1 },
      bcc: { type: 'string', minLength: 1 },
      subject: { type: 'string', minLength: 1 },
      body: { type: 'string', minLength: 1 },
    },
    additionalProperties: false,
  },
};
