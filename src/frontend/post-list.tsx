import React from "react";
import { Post } from "./post";
import { IPost } from "./models/post";
import { loading } from "./utils/loading-bar";
import { IPostStore } from "./services/post-store";

interface IFormState {
    postService: IPostStore;
}

interface IListState {
    loading: boolean;
    posts: IPost[];
}

export class PostList extends React.Component<IFormState, IListState> {
    constructor(props: Readonly<IFormState>) {
        super(props);
        this.state = { posts: [], loading: true };

        props.postService.posts.subscribe(posts => {
            this.setState({ posts, loading: false });
        });
    }

    public render() {
        return (
            <div>
                <div>
                    {this.posts()}
                </div>
            </div>
        );
    }

    public posts() {
        if (this.state.loading) {
            return loading();
        }

        let previous: Date;
        return this.state.posts.map(post => {
            const render = (<Post post={post} key={post.id} previous={previous}></Post>);
            previous = post.date;
            return render;
        });
    }
}
