import database from "infra/database.js";

async function status(request, response) {
  const database_values = await database.query("SHOW server_version;");
  const dbVersion = database_values.rows[0].server_version;
  const dbMaxConn = await database.query("SHOW max_connections;");
  const dbname = process.env.POSTGRES_DB;
  const dbActivity = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbname],
  });
  const updateAt = new Date().toISOString();

  response.status(200).json({
    dependencies: {
      database: {
        version: dbVersion,
        max_conn: parseInt(dbMaxConn.rows[0].max_connections),
      },
    },
    updated_at: updateAt,
    activity: dbActivity.rows[0].count,
  });
}

export default status;
