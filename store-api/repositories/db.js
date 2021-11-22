import pg from "pg";

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const pool = new pg.Pool({
        connectionString:
            "postgres://uebblrex:4ZfBOoCHUce9ipDH4_vxCD8cJO40jEYW@fanny.db.elephantsql.com/uebblrex",
    });

    global.connection = pool;

    return pool.connect();
}

export { connect };
