import User from "../models/user.model.js"

export const getUsersForSidebar = async(req,res) => {
  try {
    const loggedInUserId = req.user._id;

    //I can't talk to myself,  therefore remove myself from sidebar.
    const filteredUsers= await User.find({_id: {$ne: loggedInUserId}}).select("-password");

    res.status(200).json(filteredUsers);

  } catch (error) {
    console.error("error in getUsersforSidebar:", error.message);
    res.status(500).json({error:"Internal server error"});
  }
}