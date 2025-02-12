const { v4 } = require("uuid");

let contacts = [
  {
    id: v4(),
    name: "Lucas",
    email: "lucasbertoncello1@gmail.com",
    phone: "41995257119",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Gabriel",
    email: "gabrielferreira@gmail.com",
    phone: "531293879123",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Matheus",
    email: "matheusilva@gmail.com",
    phone: "34312321444",
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact
      );

      resolve(updatedContact);
    });
  }

  deleteById(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
