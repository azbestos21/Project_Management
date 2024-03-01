const express = require("express");
const authController = require("../controllers/auth");
const mid = require("../middleware/auth");
const router = express.Router();
router.post('/register', authController.mentorregister);
router.post('/login', authController.mentorlogin);
router.post('/studentregister', authController.studentregister);
router.post('/studentlogin', authController.studentlogin);
router.get('/viewgroups', mid.mentorauthenticationMiddleware,authController.grouplist);
router.get('/viewprojects', mid.mentorauthenticationMiddleware,authController.projectlist);
router.get('/studentproject', mid.authenticationMiddleware,authController.studentproject);
router.post('/studentupload',mid.authenticationMiddleware,authController.uploadphase)
router.get('/studentteam',mid.authenticationMiddleware,authController.studentteam)
router.get('/studentmentor',mid.authenticationMiddleware,authController.studentmentor);//pending
router.post('/teamregister',mid.authenticationMiddleware,authController.teamregister);//pending
router.get('/mentormentor',mid.mentorauthenticationMiddleware,authController.mentormentor)//pending
router.get('/mentorlist',authController.mentorlist);
router.post('/acceptproject',authController.acceptProject);
router.post('/searchdomain',authController.searchdomain);//pending
router.post('/rejectproject',authController.rejectProject);
module.exports = router;
