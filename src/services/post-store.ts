import { Observable } from "rxjs";
import { IPost } from "../models/post";

export interface IPostStore {
    posts: Observable<IPost>;
    add(post: IPost): Promise<void>;
}
