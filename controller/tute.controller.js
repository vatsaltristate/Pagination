const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({
      message: "Empty data"
    });
    return;
  }

  const tutorial = {
    id : req.body.id,
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Somethings went wrong creating"
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  
  return { totalItems, tutorials, totalPages, currentPage };
};

exports.findAll = (req, res) => {
  const {page, size, title} = req.query;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Tutorial.findAndCountAll ({ where: condition, limit, offset })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Somethings went wrong data not found"
      });
    });
};
// get method : http://localhost:3620/tute/r?size=1&page=1



// find all published Tutorial
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })  
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// get method : http://localhost:3620/tute/rp?size=1&page=1
