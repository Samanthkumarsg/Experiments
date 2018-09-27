const express = require('express');
const router = express.Router();

const PackagesCtrl = require('../controllers/packages');
const CheckAuth = require('../controllers/check-auth');

router.get("/", CheckAuth.checkAuthentication, PackagesCtrl.getAllPackages);
router.get("/:id", CheckAuth.checkAuthentication, PackagesCtrl.getPackageByID);
router.post("/", CheckAuth.checkAuthentication, PackagesCtrl.addPackage);
router.put("/:id", CheckAuth.checkAuthentication, PackagesCtrl.updatePackageMany);
router.delete("/:id", CheckAuth.checkAuthentication, PackagesCtrl.deletePackage);
router.patch("/:id", CheckAuth.checkAuthentication, PackagesCtrl.updatePackage);

module.exports = router;