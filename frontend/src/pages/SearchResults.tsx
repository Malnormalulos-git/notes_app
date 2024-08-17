import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getAccessToken from "../shared/getAccessToken";
import { LOGIN_ROUTE } from "../router/routes";
import { useGetNotes } from "../api/notesAppComponents";
import NoteListView from "../components/NoteListView";

const SearchResults = () => {
  const {searchTerm} = useParams();
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 12;
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!getAccessToken()) {
      navigate(LOGIN_ROUTE);
    }
  }, []);

  const query = useGetNotes({
    queryParams: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      searchTerm: searchTerm
    }
  });

  return (
    <NoteListView
      query={query}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
    />
  );
}

export default SearchResults;