import React from "react";

export function loading() {
    return (
        <div className="progress mt-1">
            <div className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: "100%" }}></div>
        </div>
    );
}
