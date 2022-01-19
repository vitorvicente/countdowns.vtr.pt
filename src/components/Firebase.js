import { default as FirebaseSuper } from 'vtr-react-components/dist/Firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDWiUHWHAPft5TJZ7RbteUSr5pdvMIqs_c",
  authDomain: "vtr-pt.firebaseapp.com",
  databaseURL: "https://vtr-pt.firebaseio.com",
  projectId: "vtr-pt",
  storageBucket: "vtr-pt.appspot.com",
  messagingSenderId: "363782155278",
  appId: "1:363782155278:web:df68e732efd529d346205f",
  measurementId: "G-L1ZGQDL204"
};

class Firebase extends FirebaseSuper {
  constructor(app) {
    super(app, firebaseConfig);
  }
}

export default Firebase;