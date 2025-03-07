const db = require("../../database/index");

class CategoryRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const rows = await db.query(`
      SELECT * FROM categories ORDER BY name ${direction}
    `);

    return rows;
  }

  async findByName(name) {
    const [row] = await db.query(`SELECT * FROM categories WHERE name = $1`, [
      name,
    ]);

    return row;
  }

  async create({ name }) {
    const [row] = await db.query(
      `
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `,
      [name]
    );

    return row;
  }

  async delete(id) {
    const op = await db.query(`DELETE FROM categories WHERE id = $1`, [id]);
    return op;
  }
}

module.exports = new CategoryRepository();
