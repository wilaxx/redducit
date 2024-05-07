import React, { useState } from 'react';
import './SearchBar.css';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/posts/postsSlice';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar = () => {
    
    const [termToDispatch, setTermToDispatch] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(setSearchTerm(termToDispatch));
    };


    return (
        <div className='SearchBar'>
            <input 
            type="text"
            value={termToDispatch} 
            placeholder="Rechercher..."
            onChange={(e) => (setTermToDispatch(e.target.value))} 
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        }}
            />
            <button 
            onClick={handleSearch} > <HiOutlineSearch /> </button>
        </div>
    );
};

export default SearchBar;