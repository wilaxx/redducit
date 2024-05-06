import React from 'react';
import SearchBar from './App/components/SearchBar';
import Posts from './App/features/posts/Posts';
import Subreddits from './App/features/subreddits/Subreddits';
import './App.css';

const App = () => {

    return (
        <div className="App">
            <header>
                <div className="headerleft">
                    <h1>Reddit</h1>
                </div>
                <div className="headercenter">
                    <SearchBar />
                </div>
                <div className="headerright">

                </div>
              
            </header>
            <main>
                <section>
                    <Posts />
                </section>
                <article>
                    <Subreddits />
                </article>
            </main>
        </div>
    );
}

export default App;