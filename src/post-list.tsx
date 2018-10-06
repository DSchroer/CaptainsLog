import firebase from "firebase/app";
import React, { CSSProperties } from "react";
import { IPost, Post } from "./post-display";

interface IFormState {
    userId: string;
}

interface IListState {
    posts: IPost[];
}

export class PostList extends React.Component<IFormState, IListState> {
    constructor(props: Readonly<IFormState>) {
        super(props);
        this.state = { posts: [] };

        firebase.database().ref(`${props.userId}/posts`).on("value", (snapshot => {
            if (!snapshot) {
                return;
            }

            const response = snapshot.val();
            if (!response) {
                this.setState({
                    posts: [],
                });
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

            this.setState({
                posts: posts,
            });
        }));
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
