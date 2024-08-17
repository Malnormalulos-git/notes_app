import { useGetNotes } from "../api/notesAppComponents";
import { useEffect, useState } from "react";
import getAccessToken from "../shared/getAccessToken";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../router/routes";
import NoteListView from "../components/NoteListView";

const HomePage = () => {
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
      pageSize: pageSize
    }
  });

  return (
    <NoteListView
      query={query}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
    />
  );
};

export default HomePage;