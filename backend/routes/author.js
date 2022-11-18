const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const uploader = require("../middlewares/uploader");

//authorController functions

const {
    authorController,
    Logincontroller,
    Authcontroller,
    listUser,
    CheckRole } = require("../controllers/user");
const { DOMAIN } = require("../config");


/**
 * @description To create a new Author Account
 * @api /api/author/register
 * @access Public
 * @type POST
 */


router
    .post("/register", async (req, res) => {
        await authorController(req.body, "author", res)
    }
    );

/**
 * @description To create a new Author Account
 * @api /api/author/login
 * @access Public
 * @type POST
 */

router
    .post("/login", async (req, res) => {
        await Logincontroller(req.body, "author", res)
    }
    );

/**
 * @Desc To get the authenticated Author's profile
 * @api /api/author/authenticate
 * @access Private
 * @type GET
 */

router
    .get("/authenticate", Authcontroller, CheckRole(["author"]), async (req, res) => {
        return res
            .json(listUser(req.user))
    });

/**
 * @description To create profile of the authenticated author
 * @api /api/author/create-profile
 * @access Private
 * @type POST <multipart-form> request
 */

router
    .post("/create-profile", Authcontroller, uploader.single("avatar"),
        async (req, res, next) => {
            try {
                let { body, file, user } = req;
                let path = DOMAIN + file.path.split("uploads")[1];
                let profile = new Profile(
                    {
                        social: body,
                        account: user._id,
                        avatar: path,
                    }
                );
                //console.log('AUTHOR_PROFILE', profile)
                await profile.save();
                return res
                    .status(201)
                    .json({
                        mssg: "Your profile has been created.",
                        success: true,
                    })
            } catch {
                //console.log(err)
                return res
                    .status(400)
                    .json({
                        mssg: "We are not able to create your profile.",
                        success: false
                    })
            }
        }
    );



module.exports = router;