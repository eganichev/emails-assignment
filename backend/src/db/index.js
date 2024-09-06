import knex from 'knex';

const knexInstance = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
});

async function createLeadsTable() {
  const exists = await knexInstance.schema.hasTable('leads');

  if (!exists) {
    await knexInstance.schema.createTable('leads', (table) => {
      table.increments('id');
      table.string('to');
      table.string('cc');
      table.string('bcc');
      table.string('subject');
      table.text('body');
    });
    console.log('Leads table created.');
  }
}

createLeadsTable();

class DB {
  static async addLead(data) {
    try {
      const result = await knexInstance('leads').insert(data);
      return result;
    } catch (err) {
      console.error('Error handling data in the database:', err);
      throw new Error('Database handling failed');
    }
  }

  static async getAll() {
    try {
      const result = await knexInstance('leads').select('*');
      return result;
    } catch (err) {
      console.error('Error handling data in the database:', err);
      throw new Error('Database handling failed');
    }
  }

  static async getById(id) {
    try {
      const result = await knexInstance('leads').where({ id }).first();
      return result;
    } catch (err) {
      console.error('Error handling data in the database:', err);
      throw new Error('Database handling failed');
    }
  }

  static async search(query) {
    try {
      const result = await knexInstance('leads')
        .where('to', 'like', `%${query}%`)
        .orWhere('cc', 'like', `%${query}%`)
        .orWhere('bcc', 'like', `%${query}%`)
        .orWhere('subject', 'like', `%${query}%`);
      return result;
    } catch (err) {
      console.error('Error handling data in the database:', err);
      throw new Error('Database search failed');
    }
  }
}

export default DB;
