const express = require('express')
const router = express.Router();
const ProfileController = require('../../controllers/ProfileController')
const { check} = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');
//---------------------------------------------------------------------------------------------------
//@route        GET api/profile
//desc          Test route
//@access       Public
router.get('/me', authMiddleware, ProfileController.getMyProfile)

//----------------------------------------------------------------------------------------------------
//@route        POST http://localhost:5000/api/profile
//desc          create or update a profile
//@access       Private
router.post('/',[
authMiddleware, 
    [
        check('status','Status is required').not().isEmpty(),
        check('skills','Skills are required').not().isEmpty(),
    ]
],
  ProfileController.createOrUpdateProfile)

  //-------------------------------------------------------------------------------------------------------
//@route        GET http://localhost:5000/api/profile
//desc          to get all profiles
//@access       Public
router.get('/', ProfileController.getAllProfiles)

//-----------------------------------------------------------------------------------------------------
//@route        GET http://localhost:5000/api/profile/user/:user_id
//desc          get profile by user id
//@access       Public
router.get('/user/:user_id', ProfileController.getProfileByUserId)

//-----------------------------------------------------------------------------------------------------
//@route        GET http://localhost:5000/api/profile/profile_id
//desc          get profile by profile id
//@access       Public
router.get('/:profile_id', ProfileController.getProfileByProfileId)

//-----------------------------------------------------------------------------------------------------
//@route        DE4LETE http://localhost:5000/api/profile
//desc          delete profile and posts
//@access       private
router.delete('/', authMiddleware, ProfileController.deleteProfile)

//-----------------------------------------------------------------------------------------------------
// @route        Put http://localhost:5000/api/profile/experience
// desc          add experiences to profile
// @access       private
router.put('/experience',[
    authMiddleware,
        [
            check('title','Title is required').not().isEmpty(),
            check('company','Company is required').not().isEmpty(),
            check('from','From Date is required').not().isEmpty(),
        ]
    ],
     ProfileController.profileExperince)

//-----------------------------------------------------------------------------------------------------
// @route        Put http://localhost:5000/api/profile/education
// desc          add education to profile
// @access       private
router.put('/education',[
    authMiddleware,
        [
            check('school','School of study is required').not().isEmpty(),
            check('degree','Degree obtained is required').not().isEmpty(),
            check('fieldofstudy','Fiels of study is required').not().isEmpty(),
            check('from','From Date is required').not().isEmpty(),
        ]
    ],
     ProfileController.profileEducation)

//-----------------------------------------------------------------------------------------------------

//@route        DELETE http://localhost:5000/api/profile/experience/:exp_id
//desc          delete experience from profile
//@access       private
router.delete('/experience/:exp_id', authMiddleware, ProfileController.deleteExperince)

//-----------------------------------------------------------------------------------------------------
//@route        DELETE http://localhost:5000/api/profile/education/:edu_id
//desc          delete education from profile
//@access       private
router.delete('/education/:edu_id', authMiddleware, ProfileController.deleteEducation)

// --------------------------------------------------------------------
//@route        DELETE http://localhost:5000/api/profile/github/username
//desc          delete user repo from github
//@access       prublic
router.get('/github/:username', ProfileController.githumRepos)

// --------------------------------------------------------------------

module.exports = router;