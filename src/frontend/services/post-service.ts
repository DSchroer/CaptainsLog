import {Observable, ReplaySubject} from "rxjs";
import firebase from "firebase/app";
import { IPost } from "../models/post";
import {IPostStore} from "./post-store";

export class PostService implements IPostStore {
    public posts: Observable<IPost[]>;

    private postsSubject = new ReplaySubject<IPost[]>();

    private reference: firebase.database.Reference;

    constructor(userId: string) {
        this.posts = this.postsSubject;
        this.reference = firebase.database().ref(`${userId}/posts`);
        this.reference.on("value", (snapshot) => {
            const posts: IPost[] = [];
            snapshot.forEach(data => {
                const id = data.key || undefined;
                const post = data.val() as IPost;

                posts.unshift({
                    id: id,
                    content: post.content,
                    date: new Date(post.date),
                });
            });
            this.postsSubject.next(posts);
        });
    }

    public add(post: IPost): Promise<void> {
        this.createOrUpdatePost(post);
        return Promise.resolve();
    }

    public createOrUpdatePost(post: IPost) {
        const toPost = {
            date: post.date.toISOString(),
            content: post.content,
        };

        if (post.id) {
            (toPost as any).id = post.id;
            return this.reference.set(toPost);
        } else {
            return this.reference.push(toPost);
        }
    }
}
