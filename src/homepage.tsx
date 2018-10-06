import firebase from "firebase/app";
import React from "react";

import { LoginForm } from "./login-form";
import { PostForm } from "./post-form";
import { PostList } from "./post-list";
import { loading } from "./utils/loading-bar";

interface IHomestate {
    loading: boolean;
    auth: firebase.User | null;
}

export class Homepage extends React.Component<{}, IHomestate> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = { loading: true, auth: null };

        firebase.auth().onAuthStateChanged(auth => {
            this.setState({
                loading: false,
                auth: auth,
            });
        });
    }

    public render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="/">
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
                <PostForm userId={this.state.auth.uid}></PostForm>
                <hr></hr>
                <PostList userId={this.state.auth.uid}></PostList>
            </div>
        );
    }

    private signout() {
        firebase.auth().signOut();
    }
}
