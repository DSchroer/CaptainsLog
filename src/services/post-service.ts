import { Observable, BehaviorSubject } from "rxjs";
import firebase from "firebase/app";
import { IPost } from "../models/post";

export class PostService {
    public posts: Observable<IPost[]>;

    private postsSubject = new BehaviorSubject<IPost[]>([]);

    private reference: firebase.database.Reference;

    constructor(userId: string) {
        this.posts = this.postsSubject;
        this.reference = firebase.database().ref(`${userId}/posts`);
        this.reference.on("value", (snapshot => {
            this.loadPostsFromSnapshot(snapshot);
        }));
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

    private loadPostsFromSnapshot(snapshot: firebase.database.DataSnapshot | null) {
        if (!snapshot) {
            return;
        }

        const response = snapshot.val();
        if (!response) {
            this.postsSubject.next([]);
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

        this.postsSubject.next(posts);
    }
}
