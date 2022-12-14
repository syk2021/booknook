import User from '../../models/user';
import Joi from 'joi';

/*
POST /api/auth/register
{
    username: 'sol',
    password: 'hi'
}
*/
export const register = async ctx => {
    const schema = Joi.object().keys({
        username:Joi.string().alphanum().min(3).max(20).required(),
        password:Joi.string().required()});
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    const { username, password } = ctx.request.body;
    try {
        const exists = await User.findByUsername(username);
        if (exists) {
            ctx.status = 409; // username conflict
            return;
        }

        const user = new User({
            username,
        });
        await user.setPassword(password); // set password
        await user.save(); // save user in database
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    } 
};

/*
POST /api/auth/login
{
    username: 'sol',
    password: 'hi'
}
*/
export const login = async ctx => {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.status = 401; // Unauthorized
        return;
    }

    try {
        const user = await User.findByUsername(username);

        if (!user) {
            ctx.status = 401;
            return;
        }
        const valid = await user.checkPassword(password);
        if (!valid) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
        });
    } catch(e) {
        ctx.throw(500, e);
    }
};

/*
GET /api/auth/check
*/
export const check = async ctx => {
    const { user } = ctx.state;
    if (!user) {
        // if user is not logged in
        ctx.status = 401; // Unauthorized
        return;
    }
    ctx.body = user;
};

/*
POST /api/auth/logout
*/
export const logout = async (ctx) => {
    ctx.cookies.set('access_token');
    ctx.status = 204; // No content
};