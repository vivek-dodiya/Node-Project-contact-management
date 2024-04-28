const express = require("express");
const router = express.Router();
const {
  getcontacts,
  createcontact,
  getcontact,
  updatecontact,
  deletecontact,
} = require("../controllers/contactController");
const { route } = require("./userRouts");
const validateToken = require("../middleware/velidateTokenHandler");

// router.route('/').get(getcontacts);

// router.route('/:id').get(getcontact);

// router.route('/').post(createcontact);

// router.route('/:id').put(updatecontact);

// router.route('/:id').delete(deletecontact)

// ==>> we can also write like this

router.use(validateToken);
router.route("/").get(getcontacts).post(createcontact);
router.route("/:id").get(getcontact).put(updatecontact).delete(deletecontact);

module.exports = router;
