import mysql from "mysql2/promise";
import config from ".././config.json" with { type: "json" };

export let db;

export async function setDB(name) {
    db = mysql.createPool({
        host: config.mysql_host,
        user: config.mysql_user,
        password: config.mysql_passwd,
        database: name,
        port: config.mysql_port
    });
}

export async function initDB() {
    const DBNAME = "";

    const connection = await mysql.createConnection({
        host: config.mysql_host,
        user: config.mysql_user,
        password: config.mysql_passwd,
        port: config.mysql_port
    });

    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DBNAME}\``);
    await connection.end();

    await setDB(DBNAME);
}

await initDB();