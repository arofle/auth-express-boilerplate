import express from 'express'
import * as userController from '../controllers/userController.js';
import * as authController from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import validateDTOjoi from '../middleware/validateDTOjoi.js';
import userRegisterDTO from '../serializers/userRegisterDTO.js';
import userLoginDTO from '../serializers/userLoginDTO.js';
import changePasswordDTO from '../serializers/changePasswordDTO.js';
import deleteUserDTO from '../serializers/deleteUserDTO.js';
import Response from '../utils/Response.js';

const allRoutes = express.Router();
const routerUser = express.Router();
const routerAuth = express.Router();

export const email_verification_slug = '/email_confirmation'
export const auth_router_slug = '/api/auth'

allRoutes.use(auth_router_slug, routerAuth);
allRoutes.use('/api/user', routerUser);

routerAuth.post('/register', validateDTOjoi(userRegisterDTO), authController.registerUser);
routerAuth.post('/login', validateDTOjoi(userLoginDTO), authController.loginUser);
routerAuth.post('/refresh_token', isAuthenticated, authController.refreshAccessToken);
routerAuth.get(`${email_verification_slug}/:str`, authController.confirmEmail);

routerUser.post('/change_password', isAuthenticated, validateDTOjoi(changePasswordDTO),
    userController.changeUserPassword);
routerUser.delete('/', isAuthenticated, validateDTOjoi(deleteUserDTO),
    userController.deleteUser);
routerUser.get('/me', isAuthenticated, userController.getMe);

// Unhandled route
allRoutes.all('*', (req, res) => {
    new Response(res, 404, 'Page not found')
});

export default allRoutes;
