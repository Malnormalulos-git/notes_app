import { useGetNotes } from "../api/notesAppComponents";
import { useEffect, useState } from "react";
import getAccessToken from "../shared/getAccessToken";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../router/routes";
import NoteListView from "../components/NoteListView";
import { SortType } from "../api/notesAppSchemas";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 12;
  const [sortType, setSortType] = useState<SortType>("byLastUpdateTime");
  const [isByDescending, setIsByDescending] = useState(true);

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
      sortType: sortType,
      isByDescending: isByDescending
    }
  });

  return (
    <>
      <SortSelector
        sortType={sortType}
        isByDescending={isByDescending}
        onSortTypeChange={setSortType}
        onOrderChange={setIsByDescending}
      />
      <NoteListView
        query={query}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </>
  );
};

export default HomePage;