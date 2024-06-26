import React, { useState } from 'react';
import './SearchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../features/posts/postsSlice';
import { selectSubreddit } from '../features/subreddits/subredditsSlice';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar = () => {
    
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const onSearchTermChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        dispatch(setSearchTerm(inputValue));
        dispatch(selectSubreddit(''));
    };

    return (
        <div className='SearchBar'>
            <input
            id="searchbar" 
            type="text"
            value={inputValue} 
            placeholder="Rechercher..."
            onChange={onSearchTermChange} 
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch();
                setInputValue('');
            }
        }}
            />
            <button 
            onClick={() => {
                handleSearch();
                setInputValue('');
                }} > <HiOutlineSearch /> </button>
        </div>
    );
};

export default SearchBar;