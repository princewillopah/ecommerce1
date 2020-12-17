const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../../models/User.js');
const Post = require('../models/Post.js')
const request = require('request')
const config = require('config')




// ====================================================================
//      CREATING PROFILE OR UPDATING PROFILE
// ========================================================================

const createOrUpdateProfile = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //BUILD THE PROFILE OBJECT
    const profileFields = {}
    profileFields.user = req.user.id//req.user.id is the user id we get from the middleware//profileFields.user is the objects field in profile
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if(req.body.skills) profileFields.skills = req.body.skills.split(',').map(skill =>skill.trim());//convert the commas seperated skills to array//remove the spaces of each elements in the array 
     //for social
     profileFields.social = {}//this need to be initialize for continuation 
     if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
     if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
     if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
     if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
     if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    try {
        let profile = await Profile.findOne({user: req.user.id})//find in the profile db using req.user.id that we got from the authmiddleware as comparison
        if(profile){//if profile the update
          //update
          profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})//update the profile
          return res.json(profile)//return the profile u just updated
        }
      //IF THE PROFILE IS NOT FOUND IN THE DATABASE WITH THE CREATE A NEW PROFILE
      profile = new Profile(profileFields)//this will create new profile on the user based on authmiddleware
     
      await profile.save()//save it

      res.json(profile)//send the profile created

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }


}
// ====================================================================
//      GET my PROFILE
// ========================================================================

const getMyProfile = async(req,res) => {
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'],User );//find() gets all  profiles in Profile model//populate() uses 'user' in profile field to get its parents name and avatar
        if(!profile){return res.status(400).json({msg:'Profile not found'})}
        res.json(profile)//profile returns an array of objects
    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server Error')
    }
   }
// ====================================================================
//      GET ALL PROFILES
// ========================================================================

const getAllProfiles = async(req,res) => {
 try {
     const profiles = await Profile.find().populate('user',['name','avatar'],User );//find() gets all  profiles in Profile model//populate() uses 'user' in profile field to get its parents name and avatar
     res.json(profiles)//profile returns an array of objects
 } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
 }
}
// ====================================================================
//      GET PROFILES BY USER ID
// ========================================================================

const getProfileByUserId = async(req,res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'],User );//find() gets all  profiles in Profile model//populate() uses 'user' in profile field to get its parents name and avatar
        if(!profile){return res.status(400).json({msg:'Profile not found'})}
        res.json(profile)//profile returns an array of objects

    } catch (err) {
       console.error(err.message)
       if(err.kind == 'ObjectId'){return res.status(400).json({msg:'Profile not found'})}
       res.status(500).send('Server Error')
    }
   }

// ====================================================================
//      GET PROFILES BY PROFILE ID
// ========================================================================

const getProfileByProfileId = async(req,res) => {
    try {
        const profile = await Profile.findOne({_id:req.params.profile_id}).populate('user',['name','avatar'],User );//find() gets all  profiles in Profile model//populate() uses 'user' in profile field to get its parents name and avatar
        if(!profile){return res.status(400).json({msg:'Profile not found'})}
        res.json(profile)//profile returns an array of objects

    } catch (err) {
       console.error(err.message)
       if(err.kind == 'ObjectId'){return res.status(400).json({msg:'Profile not found'})}
       res.status(500).send('Server Error')
    }
   }


// ====================================================================
//      DELETE PROFILES
// ========================================================================

const deleteProfile = async(req,res) => {
    try {
        //we wanna delete the user complete info //start with post->profile->user because thats goundchild->child->parent
        await Post.deleteMany({user:req.user.id})//delete post
        await Profile.findOneAndRemove({user:req.user.id}) //delete profile
        await User.findOneAndRemove({_id:req.user.id}) //delete the user of the profile
        res.json({msg:'user Deleted'})//profile returns an array of objects

    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server Error')
    }
   }
// ====================================================================
//      CREATING EXPERIENCE FOR PROFILE
// ========================================================================

const profileExperince = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //BUILD THE experience
    const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    }
   

    try {
        let profile = await Profile.findOne({user: req.user.id})//find in the profile db using req.user.id that we got from the authmiddleware as comparison
        
      profile.experience.unshift(newExperience)//note that profile has an experince field that is an array//we are adding object elements in the array unsing unchift to add it at the beginning
     
      await profile.save()//save it

      res.json(profile)//send the profile created

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }


}

// ====================================================================
//      CREATING EDUCATION FOR PROFILE
// ========================================================================

const profileEducation = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //BUILD THE experience
    const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    }

    try {
        let profile = await Profile.findOne({user: req.user.id})//find in the profile db using req.user.id that we got from the authmiddleware as comparison
        
      profile.education.unshift(newEducation)//note that profile has an education field that is an array//we are adding object elements in the array unsing unchift to add it at the beginning
     
      await profile.save()//save it

      res.json(profile)//send the profile created

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }


}
// ====================================================================
//      Deleting EDUCATION FOR PROFILE
// ========================================================================

const deleteEducation = async(req,res) =>{
   
    try {
    let profile = await Profile.findOne({user: req.user.id})//find in the profile db using req.user.id that we got from the authmiddleware as comparison
        
      //note that profile has an education field that is an array//in order to delete an education element from that education array, 
     //we must get the id of the element the get the index of the element(by comparing it with that of the req.params.id) then use splice to remove it
      //step1: get the id of the elements 
      const elementsIds = profile.education.map(item => item.id)//elementsIds is a new array that only carries the ids of profile.education array
     const elementIndex = elementsIds.indexOf(req.params.edu_id)//from elementsIds array, get the index of the element that match req.params.edu_id
     profile.education.splice(elementIndex,1)//removing the element from profile.education using its index
     await profile.save()//save it

      res.json(profile)//send the profile created

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }


}
// ====================================================================
//      Deleting EXPERIENCE FOR PROFILE
// ========================================================================

const deleteExperince = async(req,res) =>{
   
    try {
    let profile = await Profile.findOne({user: req.user.id})//find in the profile db using req.user.id that we got from the authmiddleware as comparison
        
      //note that profile has an education field that is an array//in order to delete an experience element from that education array, 
     //we must get the id of the element the get the index of the element(by comparing it with that of the req.params.id) then use splice to remove it
      //step1: get the id of the elements 
      const elementsIds = profile.experience.map(item => item.id)//elementsIds is a new array that only carries the ids of profile.experience array
     const elementIndex = elementsIds.indexOf(req.params.exp_id)//from elementsIds array, get the index of the element that match req.params.exp_id
     profile.experience.splice(elementIndex,1)//removing the element from profile.experience using its index
     await profile.save()//save it

      res.json(profile)//send the profile created

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }


}
// ====================================================================
//      GET USER FITHUB REPOS
// ========================================================================

const githumRepos = async(req,res) => {
    try {
        // const options = {
        //     url:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
        //     method:'GET',
        //     headers:{'User-Agent':'princewillopah'}

        // }
    // request(options,(error,response,body)=>{
    //     if(error) console.error(error)
    //     if(response !==200){
    //       res.status(404).json({msg:'NO GITHUB PROFILE FOUND'})
    //       // stop further execution in this callback
    //      return;
    //     }
    //     res.json(JSON.parse(body))
    // })

      const options = {
        url: `https://api.github.com/users/${req.params.username}/repos`,
             method:'GET',
            "User-Agent": "princewillopah" 

        }
    request(options,(error,response,body)=>{
        if(error) console.error(error)
        if(response.statusCode !== 200){
          res.status(404).json({msg:'NO GITHUB PROFILE FOUND'})
          
        }
        res.json(JSON.parse(body))
        // res.json(JSON.stringify(body))
    })

    // options =  {
    //     // url: "https://api.github.com/users/repos",
    //          url:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
        
    //     headers: {
    //         "User-Agent": "princewillopah"  // Your Github ID or application name
    //     }
    // }
    
    // request.get(options)
    //     .on('response', function (response) {
    //         console.log(response.statusCode);
    //         // console.log(JSON.stringify(response));
            
    // res.json(JSON.stringify(response))
    //         // res.json(JSON.parse(response))
    //     });


    
    // options =  {
    //     url: "https://api.github.com/users/repos",
    //     headers: {
    //         "User-Agent": "princewillopah"  // Your Github ID or application name
    //     }
    // }
    
    // request.get(options)
    //     .on('response', function (response) {
    //         console.log(response.statusCode);
    //         // console.log(JSON.stringify(response));
    //         res.json(JSON.parse(response))
    //     });


    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server Error')
    }
   }

 exports.getMyProfile = getMyProfile;
 exports.createOrUpdateProfile = createOrUpdateProfile;
 exports.getAllProfiles = getAllProfiles;
 exports.getProfileByUserId = getProfileByUserId;
 exports.deleteProfile = deleteProfile;
 exports.getProfileByProfileId = getProfileByProfileId;
 exports.profileExperince = profileExperince;
 exports.profileEducation = profileEducation;
 exports.deleteExperince = deleteExperince;
 exports.deleteEducation = deleteEducation;
 exports.githumRepos = githumRepos