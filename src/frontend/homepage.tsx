import React from "react";

import { LoginForm } from "./login-form";
import { loading } from "./utils/loading-bar";
import { PostService } from "./services/post-service";
import {IPostStore} from "./services/post-store";
import {PostForm} from "./post-form";
import {PostList} from "./post-list";
import {RegisterForm} from "./register-form";
import {UserService} from "./services/user-service";

type Pages = "login" | "register" | "posts";

interface IHomestate {
    loading: boolean;
    page: Pages;
    auth?: {
        posts: IPostStore;
    };
}

export class Homepage extends React.Component<{}, IHomestate> {

    private userService = new UserService();

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = { loading: true, page: "login" };

        this.userService.userId.subscribe(id => {
            if (!id) {
                this.setState({ loading: false, auth: undefined });
            } else {
                this.setState({
                    loading: false,
                    auth: {
                        posts: new PostService(id),
                    },
                    page: "posts",
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

    private setPage(page: Pages) {
        this.setState({page});
    }

    private page() {
        if (this.state.loading) {
            return loading();
        }

        switch (this.state.page) {
            case "login":
                return (<LoginForm onRegister={() => this.setPage("register")} userService={this.userService}></LoginForm>);
            case "register":
                return (<RegisterForm userService={this.userService}></RegisterForm>);
            case "posts":
                return (<div>
                    <PostForm postService={this.state.auth!.posts}></PostForm>
                    <hr></hr>
                    <PostList postService={this.state.auth!.posts}></PostList>
                </div>);
            default:
                throw new Error("Unsupported page");
        }
    }

    private async signout() {
        await this.userService.logout();
        this.setPage("login");
    }
}
