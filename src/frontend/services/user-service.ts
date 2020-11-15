import {BehaviorSubject, Observable} from "rxjs";
import firebase from "firebase";

export class UserService {

    public userId: Observable<string | undefined>;
    private userIdSubject = new BehaviorSubject<string | undefined>(undefined);

    constructor() {
        this.userId = this.userIdSubject;

        firebase.auth().onAuthStateChanged(auth => {
            if (!auth) {
                this.userIdSubject.next(undefined);
            } else {
                this.userIdSubject.next(auth.uid);
            }
        });
    }

    public async login(email: string, password: string) {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    }

    public async logout() {
        await firebase.auth().signOut();
    }

    public async register(email: string, password: string, confirm: string) {
        if (confirm !== password) {
            throw new Error("Passwords and confirmation does not match.");
        }

        await firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}