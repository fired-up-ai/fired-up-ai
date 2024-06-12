import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getFunctions, Functions } from 'firebase/functions';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getMessaging, Messaging } from 'firebase/messaging';
import { getAnalytics, Analytics } from 'firebase/analytics';

/**
 * Firebase configuration object
 * @interface FirebaseConfig
 * @property {string} apiKey - Firebase API key
 * @property {string} authDomain - Firebase Auth domain
 * @property {string} projectId - Firebase project ID
 * @property {string} storageBucket - Firebase storage bucket
 * @property {string} messagingSenderId - Firebase messaging sender ID
 * @property {string} appId - Firebase app ID
 * 
 */
export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
};

/**
 * Firebase object
 * @interface Firebase
 * @property {FirebaseApp} app - Firebase app
 * @property {Analytics} analytics - Firebase analytics
 * @property {Auth} auth - Firebase auth
 * @property {Firestore} firestore - Firebase firestore
 * @property {Functions} functions - Firebase functions
 * @property {FirebaseStorage} storage - Firebase storage
 * @property {Messaging} messaging - Firebase messaging
 */
export interface Firebase {
    app: FirebaseApp;
    analytics: Analytics;
    auth: Auth;
    firestore: Firestore;
    functions: Functions;
    storage: FirebaseStorage;
    messaging: Messaging;
}

/**
 * Firebase service class
 * @class FirebaseService
 * @method getInstance - Get FirebaseService instance
 * @method getFirebase - Get Firebase object
 * @method initializeFirebase - Initialize Firebase
 * @property {Firebase} _firebase - Firebase object
 * @property {FirebaseService} _instance - FirebaseService instance
 * 
 * @example
 * const firebaseService = FirebaseService.getInstance();
 * const firebase = firebaseService.getFirebase();
 */
export default class FirebaseService {
    private static _instance: FirebaseService;
    private _firebase: Firebase;

    private constructor() {
        this._firebase = this.initializeFirebase();
    }

    /**
     * Static method to get FirebaseService instance
     * @returns {FirebaseService} FirebaseService instance
     */
    public static getInstance(): FirebaseService {
        if (!this._instance) {
            this._instance = new FirebaseService();
        }
        return this._instance;
    }

    /**
     * Returns Firebase object
     * @returns {Firebase} Firebase object
     */
    public getFirebase(): Firebase {
        return this._firebase;
    }

    /**
     * Initializes the Firebase App with the configuration
     * @returns {Firebase} Firebase object
     */
    private initializeFirebase(): Firebase {
        const firebaseConfig: FirebaseConfig = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
            appId: process.env.REACT_APP_FIREBASE_APP_ID!,
        };

        const app = initializeApp(firebaseConfig);
        return {
            app,
            auth: getAuth(app),
            analytics: getAnalytics(app),
            firestore: getFirestore(app),
            functions: getFunctions(app),
            storage: getStorage(app),
            messaging: getMessaging(app),
        };
    }
}