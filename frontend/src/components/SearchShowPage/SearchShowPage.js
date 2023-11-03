import { useSelector } from 'react-redux';
import { fetchSearchResults } from '../../store/search';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BusinessListItem from '../Business/indexItem'; // Assuming this is the correct import path
import SearchIndex from "./SearchIndex"

const Search = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchResults = useSelector((state) => state.search);
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const noResults = Object.keys(searchResults).length === 0;

    useEffect(() => {
        if (query) {
            dispatch(fetchSearchResults(query));
        }
    }, []);

    return(
        <div className='main-content-container'>
            {noResults && 
                <div id='results-for'>No results containing "{query}"</div>
            }

            {/* {Object.values(searchResults).map((result) => {
                return (
                    <BusinessListItem business={result}></BusinessListItem>
                )
            })} */}

            { searchResults && <SearchIndex searchResults={Object.values(searchResults)}/>}
            {console.log(searchResults)}
        </div>
    );
}

export default Search;
