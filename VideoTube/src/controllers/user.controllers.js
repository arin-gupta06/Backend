import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
    // get users details from frontend
    // validation-non empty
    // check if user already exists
    // check for images, check for avatar 
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password, refresh token filed from the response
    // check for user creation
    // return res
    const {fullName, email, username, password} = req.body
    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required!.")
    }

    const existingUser = User.findOne({
        $or: [{username}, {email}]
    })

    if(existingUser) 
        {throw new ApiError(409, "User is already existed with these credentials.")}


    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath)
        {throw new ApiError(400, "Avatar file is required!.")}

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar)
       {throw new ApiError(400, "Avatar is required!.")}

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowercase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "OPPS!!, User is not created")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully!!.")
    )
})

export {registerUser}