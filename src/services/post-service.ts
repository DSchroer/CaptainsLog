import { Observable, BehaviorSubject } from "rxjs";
import firxebase from "firebase/app";
import { IPost } from "../models/post";

export class PostService {

    private _posts = new BehaviorSubject<IPost[]>([]);
    posts: Observable<IPost[]> = this._posts;

    private _ref: firebase.database.Reference;

    constructor(userId: string) {
        this._ref = firxebase.database().ref(`${userId}/posts`);
        this._ref.on("value", (snapshot => {
            this.loadPostsFromSnapshot(snapshot);
        }));
    }

    public createOrUpdatePost(post: IPost) {
        if (post.id) {
            return this._ref.set(post);
        } else {
            return this._ref.push(post);
        }
    }

    private loadPostsFromSnapshot(snapshot: firebase.database.DataSnapshot | null) {
        if (!snapshot) {
            return;
        }

        const response = snapshot.val();
        if (!response) {
            this._posts.next([]);
            return;
        }

        let posts = Object.keys(response).map<IPost>(id => {
            return {
                id: id,
                content: response[id].content,
                date: new Date(response[id].date),
            };
        });

        posts = posts.sort((a, b) => {
            return b.date.valueOf() - a.date.valueOf();
        });

        this._posts.next(posts);
    }
}