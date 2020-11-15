import React from "react";

export interface IInstallState {
    prompt?: Event;
}

export class InstallPrompt extends React.Component<{}, IInstallState> {

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {  };

        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            this.setState({prompt: e});
        });
    }

    public render() {
        if (this.state.prompt) {
            return <>
                <a href="#" onClick={() => this.install(this.state.prompt!)}><i className="fas fa-home icon"></i></a>
            </>;
        } else {
            return (<></>);
        }
    }

    private install(prompt: Event) {
        (prompt as any).prompt();
        this.setState({prompt: undefined});
    }
}
