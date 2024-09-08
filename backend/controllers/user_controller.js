export const get_users_for_sidebar = async (req, res) => {
    try {
        const logged_users = req.user._id;
        
        const filtered_users = await User.find({ _id: { $ne: logged_users} }).select("-password");
        
        res.status(200).json(filtered_users);
    } catch (error) {
        console.error("Error in get_users_for_sidebar: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}