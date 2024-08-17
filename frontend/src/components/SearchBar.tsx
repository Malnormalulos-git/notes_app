import { useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate, useParams } from 'react-router-dom';
import { HOME_ROUTE, SEARCH_ROUTE } from '../router/routes';

const SearchBar = () => {
  const {searchTerm} = useParams();

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(searchTerm || '');
  }, [searchTerm]);
  
  const navigate = useNavigate();
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(searchValue){
      navigate(`${SEARCH_ROUTE}/${searchValue}`)
    }
    else{
      navigate(HOME_ROUTE);
    }
  };

  const handleClear = () => {
    inputRef!.current!.focus();
    setSearchValue('');
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => handleSearch(e)}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: 3,
        maxWidth: '50%'
      }}
    >
      <InputBase
        inputRef={inputRef}
        sx={{ ml: 1, flex: 1 }}
        placeholder="search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <IconButton 
            type="button" 
            sx={{ p: 0 }}
            onClick={() => handleClear()}  
        >
          <ClearIcon  /> 
        </IconButton>
      )}
      <IconButton 
            type="button" 
            sx={{ p: 0 }}
            onClick={(e) => handleSearch(e)}  
        >
        <Search />
      </IconButton>
    </Paper>
  );
};
  
export default SearchBar;