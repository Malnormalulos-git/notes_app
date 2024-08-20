import { Select, MenuItem, Box, IconButton } from '@mui/material';
import { SortType } from '../api/notesAppSchemas';
import { ExpandLess as ByAscending, ExpandMore as ByDescending } from '@mui/icons-material';

interface SortSelectorProps {
  sortType: SortType;
  isByDescending: boolean;
  onSortTypeChange: (sortType: SortType) => void;
  onOrderChange: (isByDescending: boolean) => void;
}

const SortSelector = ({ sortType, isByDescending, onSortTypeChange, onOrderChange } : SortSelectorProps) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        m: "24px 24px 0 24px",
      }}
    >
      <Select
        value={sortType}
        onChange={(e) => onSortTypeChange(e.target.value as SortType)}
        variant='standard'
        color='primary'
        sx={{
          minWidth: '220px'
        }}
      >
        <MenuItem value="byTitle">Title</MenuItem>
        <MenuItem value="byContent">Content</MenuItem>
        <MenuItem value="byCreationTime">Creation time</MenuItem>
        <MenuItem value="byLastUpdateTime">Last update time</MenuItem>
      </Select>
      <IconButton 
        color='primary'
        size='large'
        onClick={() => onOrderChange(!isByDescending)}
        // aria-label="add to shopping cart"
      >
        {isByDescending ? <ByDescending /> : <ByAscending/>}
      </IconButton>
    </Box>
  );
};

export default SortSelector;