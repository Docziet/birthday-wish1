import React from 'react';
import WishForm from './components/wishForm';
import './App.css'; // You can create or modify this for styling

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Send Me Your Birthday Wishes!</h1>
            </header>
            <main>
                <WishForm />
                <div id="approvedWishes">
                    <h2>Birthday Wishes Received:</h2>
                    {/* We'll display approved wishes here later */}
                </div>
            </main>
        </div>
    );
}

export default App;