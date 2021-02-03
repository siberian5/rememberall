
import Config from '../Config'
import firebase from 'firebase'
import App = firebase.app.App;

export async function create() {


    return new Promise<App>((resolve, reject) => {


        const app = firebase.initializeApp({
            apiKey: Config.Firebase.apiKey,
            authDomain: Config.Firebase.authDomain,
            projectId: Config.Firebase.projectId,
            storageBucket: Config.Firebase.storageBucket,
            messagingSenderId: Config.Firebase.messagingSenderId
        })

        resolve(app)

    })
}

export default { create }