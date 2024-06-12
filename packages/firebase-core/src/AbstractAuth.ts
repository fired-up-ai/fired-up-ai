import FirebaseService from "./FirebaseService";
import { Auth, User, UserCredential } from "firebase/auth";

export default abstract class AbstractAuth {
    
    protected _auth: Auth;

    constructor() {
        this._auth = FirebaseService.getInstance().getFirebase().auth;
    }

    public getAuth(): Auth {
        return this._auth;
    }

    public abstract signUpWithEmail(
        email: string, 
        password: string
    ): Promise<UserCredential>;

    public abstract signInWithEmail(
        email: string, 
        password: string
    ): Promise<UserCredential>;

    public abstract signOut(): Promise<void>;
    
    public abstract signInWithGoogle(): Promise<UserCredential>;
    
    public abstract signInWithGithub(): Promise<UserCredential>;
    
    public abstract onAuthStateChanged(): Promise<User | null>;
} 