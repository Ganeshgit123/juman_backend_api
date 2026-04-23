const passportJwt = require("passport-jwt");
const passport = require("passport");
import * as moment from "moment";
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;


export class TokenMiddleWare {
    constructor(private tokenSecret: any, private userService: any) {

    }

    get() {
        const jwtOptions = {
            secretOrKeyProvider: (req: any, jwt: any, done: any) => {
                done(undefined, this.tokenSecret);
            },
            session: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        };

        const tokenAuthStrategy = new JwtStrategy(jwtOptions,
            async (jwt_payload: any, next: any) => {
                const users: any = await this.userService.list(undefined, undefined, { userId: jwt_payload.userId });
                if (jwt_payload.exp <= moment().toDate().getTime()) {
                    console.info("Invalid token: Token expired");
                    next("Invalid token: Token expired", false);
                } else if (users[0] == undefined) {
                    console.info("Invalid token: User missing");
                    next(undefined, false);
                } else {
                    users[0].tokenId = jwt_payload.jti;
                    users[0].menus = jwt_payload.menus;
                    next(undefined, users[0]);
                }
            });

        passport.use("token-strategy", tokenAuthStrategy);
        return passport.authenticate("token-strategy", jwtOptions);
    }
}