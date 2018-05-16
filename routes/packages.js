const express = require('express');
const router = express.Router();

const PackagesCtrl = require('../controllers/packages');

router.get("/", PackagesCtrl.getAllPackages);
router.get("/:id", PackagesCtrl.getPackageByID);
router.post("/", PackagesCtrl.addPackage);
// router.put("/:PackageID", PackagesCtrl.updatePackage);
router.delete("/:id", PackagesCtrl.deletePackage);

module.exports = router;