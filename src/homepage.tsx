import firebase from "firebase/app";
import React from "react";

import { LoginForm } from "./login-form";
import { PostForm } from "./post-form";
import { PostList } from "./post-list";
import { loading } from "./utils/loading-bar";
import { PostService } from "./services/post-service";

interface IHomestate {
    loading: boolean;
    auth?: {
        user: firebase.User;
        posts: PostService;
    };
}

export class Homepage extends React.Component<{}, IHomestate> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = { loading: true };

        firebase.auth().onAuthStateChanged(auth => {
            if (!auth) {
                this.setState({ loading: false, auth: undefined });
            } else {
                this.setState({
                    loading: false,
                    auth: {
                        user: auth,
                        posts: new PostService(auth.uid)
                    },
                });
            }
        });
    }

    public render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light mb-3">
                    <a className="navbar-brand" href="/">
                        <img className="mx-2" src="images/icon.png" width="25" height="25"></img>
                        Captains Log
                    </a>
                    {this.signOutButton()}
                </nav>
                <div className="container">
                    {this.page()}
                </div>
            </div>
        );
    }

    private signOutButton() {
        if (!this.state.auth) {
            return;
        }

        return (
            <a href="#" onClick={ev => {
                ev.preventDefault();
                this.signout();
            }}>
                <i className="fas fa-sign-out-alt"></i>
            </a>
        );
    }

    private page() {
        if (this.state.loading) {
            return loading();
        }

        if (!this.state.auth) {
            return (<LoginForm></LoginForm>);
        }

        return (
            <div>
                <PostForm postService={this.state.auth.posts}></PostForm>
                <hr></hr>
                <PostList postService={this.state.auth.posts}></PostList>
            </div>
        );
    }

    private signout() {
        firebase.auth().signOut();
    }
}
