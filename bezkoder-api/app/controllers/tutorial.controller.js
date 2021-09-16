const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
 await Tutorial.create(tutorial).then(async data => {
      res.send(data);
    })
    .catch(async err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  await Tutorial.findAll({ where: condition }).then(async data => {
      res.send(data);
    }).catch(async err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  await Tutorial.findByPk(id).then(async data => {
      res.send(data);
    }).catch(async err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  await Tutorial.update(req.body, {
    where: { id: id }
  }).then(async num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Tutorial.destroy({
    where: { id: id }
  }).then(async num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    }).catch(async err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  await Tutorial.destroy({
    where: {},
    truncate: false
  }).then(async nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    }).catch(async err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = async (req, res) => {
 await Tutorial.findAll({ where: { published: true } }).then(async data => {
      res.send(data);
    }).catch(async err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
