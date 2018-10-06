import React, { CSSProperties } from "react";
import { Post } from "./post";
import { IPost } from "./models/post";
import { PostService } from "./services/post-service";

interface IFormState {
    postService: PostService;
}

interface IListState {
    posts: IPost[];
}

export class PostList extends React.Component<IFormState, IListState> {
    constructor(props: Readonly<IFormState>) {
        super(props);
        this.state = { posts: [] };

        props.postService.posts.subscribe(posts => {
            this.setState({ posts: posts });
        });
    }

    public render() {
        const style: CSSProperties = {
            position: "absolute",
        };

        return (
            <div>
                <div style={style}>
                    {this.posts()}
                </div>
            </div>
        );
    }

    public posts() {
        let previous: Date;
        return this.state.posts.map(post => {
            const render = (<Post post={post} key={post.id} previous={previous}></Post>);
            previous = post.date;
            return render;
        });
    }
}
