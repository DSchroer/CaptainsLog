import React from "react";

export interface IInstallState {
    visible: boolean;
}

export class InstallPrompt extends React.Component<{}, IInstallState> {

    private deferredPrompt?: Event;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = { visible: false };

        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();

            this.setState({visible: true});
        });
    }

    public render() {
        if (this.state.visible) {
            return <>
            <a href="#" onClick={() => this.install()}><i className="fas fa-home icon"></i></a>
            </>;
        } else {
            return (<></>);
        }
    }

    private install() {
        if (this.deferredPrompt) {
            (this.deferredPrompt as any).prompt();
            this.deferredPrompt = undefined;
        }

        this.setState({visible: false});
    }
}
