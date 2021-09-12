const userService = require('../services/userServices');
const userServiceInstance = new userService();
const {appResponse} = require("../utils/appResponse");

const getToken = (req) => req.headers["x-auth-token"];
const authenticate = (exports.authenticate = async function (req, res, next) {
	const token = getToken(req);
	if (!token){
		const data = appResponse(401, "No token");
        return res.status(data.statusCode).json(data.data);
	}

	try {
		const decoded = await userServiceInstance.verifyAuthToken(
			req.headers["x-auth-token"]
		);

		const decode = await userServiceInstance.decryptToken(token);
		const user = await userServiceInstance.getUserById(decode._id);
		await userServiceInstance.updateUserLastSeen(user._id);

		req.user = user;
		next();
	} catch (error) {
		const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
		if (errors.includes(error?.name)) {
			const data = appResponse(401, "Invalid token, try logging in again", {authVerified: false});
        	return res.status(data.statusCode).json(data.data);
		}
		next(error);
		const data = appResponse(500, "Invalid token, try logging in again", error);
        return res.status(data.statusCode).json(data.data);
	}
});