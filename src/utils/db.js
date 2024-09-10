import { sequelize } from "../config/postgres.js";
import User from "../modules/users/users.model.js";
import Role from "../modules/users/roles.model.js";
import Link from "../modules/users/links.model.js";
import UserLink from "../modules/users/user-links.model.js";
import Token from "../modules/auth/token.model.js";
import OTP from "../modules/verification/otp.model.js";

User.belongsTo(Role);
Role.hasMany(User);
Token.belongsTo(User, { onDelete: 'CASCADE' });
User.hasMany(Token);
OTP.belongsTo(User, { onDelete: 'CASCADE' });
User.hasMany(OTP);
User.belongsToMany(Link, { through: 'user_link', onDelete: 'CASCADE' });
Link.belongsToMany(User, { through: 'user_link', onDelete: 'CASCADE' });

const db = {
    sequelize,
    User,
    Role,
    Link,
    UserLink,
    Token,
    OTP,
};

export default db;