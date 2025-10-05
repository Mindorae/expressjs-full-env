import { IUser } from '../../config/types.conf';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}