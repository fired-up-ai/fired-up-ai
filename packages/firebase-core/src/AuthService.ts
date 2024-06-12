import AbstractAuth from "./AbstractAuth";
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
    UserCredential,
    User,
    sendEmailVerification } from "firebase/auth";

export default class AuthService extends AbstractAuth {

    constructor() {
        super();
    }

    public getUser(): User | null {
        return this._auth.currentUser;
    }

    private setUser(user: User | null): void {
        if (user !== null) {
            user.providerData.forEach((profile) => {
                const displayName = profile.displayName;
                const email = profile.email;
                const photoURL = profile.photoURL;
                const uid = profile.uid;
            });

        }
    }
    public async signUpWithEmail(
        email: string, 
        password: string
    ): Promise<UserCredential> {
        return createUserWithEmailAndPassword(this._auth, email, password);
    }

    public async signInWithEmail(
        email: string, 
        password: string
    ): Promise<UserCredential> {
        return signInWithEmailAndPassword(this._auth, email, password);
    }

    public async signOut(): Promise<void> {
        return signOut(this._auth);
    }

    public async signInWithGoogle(): Promise<UserCredential> {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this._auth, provider);
    }

    public async signInWithGithub(): Promise<UserCredential> {
        const provider = new GithubAuthProvider();
        return signInWithPopup(this._auth, provider);
    }

    public async onAuthStateChanged(): Promise<User | null> {
        onAuthStateChanged(this._auth, (user) => {
            const currentUser = this._auth.currentUser;
            if (currentUser) {
                sendEmailVerification(currentUser);
                currentUser.providerData.forEach((profile) => {
                    const displayName = profile.displayName;
                    const email = profile.email;
                    const photoURL = profile.photoURL;
                    const uid = profile.uid;
                });
                return currentUser;
            }
            return null;
        });
        return null;
    }

}