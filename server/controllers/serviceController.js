const Service = require("../models/Service");

/* ================= CREATE ================= */

exports.createService = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Service name required" });
    }

    if (!type) {
      return res.status(400).json({ message: "Service type required" });
    }

    if (!["home", "transportation"].includes(type)) {
      return res.status(400).json({ message: "Invalid service type" });
    }

    const exists = await Service.findOne({ name, type });

    if (exists) {
      return res.status(400).json({ message: "Service already exists" });
    }

    const service = await Service.create({ name, type });

    res.status(201).json({
      message: "Service created",
      data: service
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* ================= GET ALL ================= */

exports.getAllServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};


/* ================= UPDATE ================= */

exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      message: "Service updated",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= DELETE ================= */

exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= CREATE SERVICES BY TYPE ================= */

exports.createServicesByType = async (req, res) => {
  try {
    const { type, services } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Service type required" });
    }

    if (!["home", "transportation"].includes(type)) {
      return res.status(400).json({ message: "Invalid service type" });
    }

    if (!services || !Array.isArray(services)) {
      return res.status(400).json({ message: "Services must be array" });
    }

    const createdServices = [];

    for (let serviceName of services) {
      const exists = await Service.findOne({
        name: serviceName,
        type
      });

      if (!exists) {
        const newService = await Service.create({
          name: serviceName,
          type
        });

        createdServices.push(newService);
      }
    }

    res.status(201).json({
      message: "Services created successfully",
      data: createdServices
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= GET BY TYPE ================= */

exports.getServicesByType = async (req, res) => {
  try {
    const { type } = req.params;

    if (!["home", "transportation"].includes(type)) {
      return res.status(400).json({ message: "Invalid service type" });
    }

    const services = await Service.find({ type }).sort({ createdAt: -1 });

    res.json(services);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

