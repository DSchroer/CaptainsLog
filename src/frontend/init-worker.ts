export function initWorker() {
    window.addEventListener("load", async () => {
        if ("serviceWorker" in navigator) {
            try {
                await navigator
                    .serviceWorker
                    .register("worker-bundle.js");
            } catch (e) {
                console.log("SW registration failed");
            }
        }
    });
}
