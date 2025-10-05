import { IUser } from '../../config/types.conf';
import { TFunction } from 'i18next';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            t?: TFunction;
            language: string;
        }
    }
}