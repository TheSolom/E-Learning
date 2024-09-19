import { sequelize } from "../config/postgres.js";
import User from "../modules/user/user.model.js";
import Role from "../modules/user/role.model.js";
import UserRole from "../modules/user/user-role.model.js";
import Website from "../modules/user/website.model.js";
import UserWebsite from "../modules/user/user-website.model.js";
import Language from "../modules/attribute/language.model.js";
import UserLanguage from "../modules/user/user-language.model.js";
import Token from "../modules/auth/token.model.js";
import OTP from "../modules/verification/otp.model.js";

class PostgresDatabase {
    static #instance;
    static #isProduction;
    static #models;

    constructor(isProduction, models) {
        PostgresDatabase.#isProduction = isProduction;
        PostgresDatabase.#models = models;
    }

    static getInstance(isProduction = false) {
        const models = {
            User,
            Role,
            UserRole,
            Website,
            UserWebsite,
            Language,
            UserLanguage,
            Token,
            OTP,
        };

        if (!PostgresDatabase.#instance) {
            PostgresDatabase.#instance = new PostgresDatabase(isProduction, models);
        }
        return PostgresDatabase.#instance;
    }

    static #setupAssociations() {
        const {
            User,
            Role,
            UserRole,
            Website,
            UserWebsite,
            Language,
            UserLanguage,
            Token,
            OTP,
        } = PostgresDatabase.#models;

        User.belongsToMany(Role, { through: UserRole, onDelete: 'CASCADE' });
        UserRole.belongsTo(User, { onDelete: 'CASCADE' });
        User.hasMany(UserRole);
        Role.belongsToMany(User, { through: UserRole, onDelete: 'CASCADE' });
        UserRole.belongsTo(Role, { onDelete: 'CASCADE' });
        Role.hasMany(UserRole);

        User.belongsToMany(Website, { through: UserWebsite, onDelete: 'CASCADE' });
        UserWebsite.belongsTo(User, { onDelete: 'CASCADE' });
        User.hasMany(UserWebsite);
        Website.belongsToMany(User, { through: UserWebsite, onDelete: 'CASCADE' });
        UserWebsite.belongsTo(Website, { onDelete: 'CASCADE' });
        Website.hasMany(UserWebsite);

        User.belongsToMany(Language, { through: UserLanguage, onDelete: 'CASCADE' });
        UserLanguage.belongsTo(User, { onDelete: 'CASCADE' });
        User.hasMany(UserLanguage);
        Language.belongsToMany(User, { through: UserLanguage, onDelete: 'CASCADE' });
        UserLanguage.belongsTo(Language, { onDelete: 'CASCADE' });
        Language.hasMany(UserLanguage);

        Token.belongsTo(User, { onDelete: 'CASCADE' });
        User.hasMany(Token);

        OTP.belongsTo(User, { onDelete: 'CASCADE' });
        User.hasMany(OTP);
    }

    async initialize() {
        PostgresDatabase.#setupAssociations();
        await sequelize.sync(PostgresDatabase.#isProduction ? undefined : { alter: { drop: true } });
    }

    getModels() {
        return PostgresDatabase.#models;
    }
}

export default PostgresDatabase;
