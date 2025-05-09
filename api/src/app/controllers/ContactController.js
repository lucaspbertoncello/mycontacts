const ContactRepository = require("../repositories/ContactRepository");
const isValidUUID = require("../utils/isValidUUID");

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;

    const contacts = await ContactRepository.findAll(orderBy);
    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    res.json(contact);
  }

  async update(req, res) {
    const { name, email, phone, category_id } = req.body;
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return res.status(400).json({ error: "User not found" });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await ContactRepository.deleteById(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
