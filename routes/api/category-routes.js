const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// FIND ALL CATEGORIES IN THE DATABASE
router.get("/", (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    // include associated products
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// FIND A SPECIFIC CATEGORY IN THE DATABASE
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    // include associated products
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
        return;
    }
    res.json(dbCategoryData)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ADD A NEW CATEGORY TO THE DATABASE
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategoryData => res.json(newCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// UPDATE A CATEGORY IN THE DATABASE THROUGH ITS 'id' VALUE
router.put("/:id", (req, res) => {
  Category.update(
    {
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE A CATEGORY FROM THE DATABASE THROUGH ITS 'id' VALUE
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
