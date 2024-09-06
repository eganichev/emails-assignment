import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { useEmailsContext } from '@/contexts';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { setEmails } = useEmailsContext();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const value = e.currentTarget.value;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(value);
      }, 500);
    };
  };

  const handleSearch = async (value) => {
    try {
      if (value) {
        const response = await fetch(`http://localhost:3001/emails/search?query=${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('Failed to search emails');
          return;
        }
  
        const data = await response.json();

        setSearchQuery(value);
  
        setEmails(data);
      } else {
        const response = await fetch('http://localhost:3001/emails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('Failed to search emails');
          return;
        }
  
        const data = await response.json();

        setSearchQuery('');
  
        setEmails(data);
      }
    } catch (error) {
      console.error("Error searching emails:", error);
    }
  };

  const resetSearch = async () => {
    const response = await fetch('http://localhost:3001/emails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('Failed to search emails');
      return;
    }

    const data = await response.json();

    setSearchQuery('');

    setEmails(data);
  };

  const Wrapper = styled('div')(({ theme }) => ({
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <Wrapper>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={debounce((e) => {
            handleSearch(e);
          })}
        />
      </Search>

      {!!searchQuery &&
        <Typography variant="body2" sx={{ color: 'black', mt: 2, }}>
          "{searchQuery}"
          <Typography
            variant='caption'
            sx={{ ml: 0.5, color: 'red', cursor: 'pointer' }}
            onClick={resetSearch}
          >
            X
          </Typography>
        </Typography>
      }
    </Wrapper>
  );
}
