import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDte05lOyaMB25_lCBS3TmMKbnYt0xZuWw',
	authDomain: 'barber-shop-c4acc.firebaseapp.com',
	projectId: 'barber-shop-c4acc',
	storageBucket: 'barber-shop-c4acc.appspot.com',
	messagingSenderId: '212187834870',
	appId: '1:212187834870:web:038e20f3b78140d270ffd7',
};

firebase.initializeApp(firebaseConfig);

export { auth, firebase, db, storage };
