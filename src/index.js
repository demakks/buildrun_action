/**
 * The entrypoint for the action.
 */
const { Client } = require('pg');

async function run() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'buildrun',
    password: 'sahana1234',
    port: 5432,
  });

  await client.connect();

  const githubRunId = process.env.GITHUB_RUN_ID;

  const query = {
    text: 'INSERT INTO github_runs(run_id) VALUES($1)',
    values: [githubRunId],
  };

  try {
    await client.query(query);
    console.log('GitHub run ID stored successfully in PostgreSQL database.');
  } catch (error) {
    console.error('Error storing GitHub run ID in PostgreSQL database:', error);
  } finally {
    await client.end();
  }
}

run();

