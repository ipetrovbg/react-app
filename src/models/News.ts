import { User } from './User';

export class News {
    public id?: string;
    public user_id?: string;
    public title?: string;
    public content?: string;
    public author?: User;
}