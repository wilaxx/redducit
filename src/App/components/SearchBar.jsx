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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    const handleSearch = () => {
        if (inputValue.trim() !== '') {
        dispatch(setSearchTerm(inputValue));
        dispatch(selectSubreddit(''));
        scrollToTop();
        setInputValue('');
    }
    };

    return (
        <div className='SearchBar'>
            <input
            id="searchbar" 
            type="search"
            value={inputValue} 
            placeholder="  type in word or sentence to search ..."
            onChange={onSearchTermChange} 
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch();
                e.target.blur();
            }
        }}
            />
            <button
                type='submit' 
                onClick={(e) => {
                const search = document.getElementById('searchbar');
                search.value = '';
                handleSearch();
                e.target.blur();
                }} > <HiOutlineSearch /> </button>
        </div>
    );
};

export default SearchBar;