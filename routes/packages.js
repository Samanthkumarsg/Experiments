const express = require('express');
const router = express.Router();

const PackagesCtrl = require('../controllers/packages');

router.get("/", PackagesCtrl.getAllPackages);
router.get("/:id", PackagesCtrl.getPackageByID);
router.post("/", PackagesCtrl.addPackage);
router.put("/:id", PackagesCtrl.updatePackageMany);
router.delete("/:id", PackagesCtrl.deletePackage);
router.patch("/:id", PackagesCtrl.updatePackage);

module.exports = router;