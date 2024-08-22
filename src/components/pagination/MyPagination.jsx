import { React, useEffect, useMemo, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { updateTestFilterPage } from "../../store/websiteSlice";
import { updateToolsFilterPage } from "../../store/slice.tools";
import { updatePage } from "../../store/websiteSlice";
import { updatePage as updatePageR} from "../../store/rankingSlice";

export default function MyPagination(props) {
  const dispatch = useDispatch();
  const page = useSelector((state) => {
    if(props.type==="test"){
      return state.website.website.filters.filter_page;
    }
    if(props.type==="tools"){
      return state.tools.filter_page;
    }
    if(props.type==="ranking"){
      return state.ranking.page_ranking;
    }
    if(props.type==="website"){
      return state.website.page;
    }
  })
  
  const onClickHandler = (index) => {
    if(props.type==="test"){
      dispatch(updateTestFilterPage({index}))
    }
    if(props.type==="tools"){
      dispatch(updateToolsFilterPage({index}))
    }
    if(props.type==="ranking"){
      dispatch(updatePageR({index}))
    }
    if(props.type==="website"){
      dispatch(updatePage({index}))
    }
  };

  const displayMyNav = useMemo(() => {
    return (
      <>
        <ProgressBar className="my-3" now={page} max={props.totalPage} />

        <nav
          role="navigation"
          aria-label="navigazione tra le paginazioni"
          className="w-100 mt-3 d-flex flex-row justify-content-center"
        >
          <Pagination>
            <Pagination.First
              disabled={page === 1}
              onClick={() => onClickHandler(1)}
              aria-label="Vai alla prima pagina"
            />
            <Pagination.Item
              active={page === 1}
              disabled={page === 1}
              onClick={() => onClickHandler(1)}
            >
              {1}
            </Pagination.Item>
            <Pagination.Ellipsis disabled />
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => onClickHandler(Number(page) - 1)}
              rel="prev"
              aria-label="Vai alla pagina precedente"
            />
            <Pagination.Item
              key={page}
              active
              aria-current
              activeLabel
              title="Pagina corrente"
            >
              {page}
            </Pagination.Item>
            <Pagination.Next
              disabled={page === props.totalPage}
              onClick={() => onClickHandler(Number(page) + 1)}
              rel="next"
              aria-label="Vai alla pagina successiva"
            />
            <Pagination.Ellipsis disabled />
            <Pagination.Item
              disabled={page === props.totalPage}
              active={page === props.totalPage}
              onClick={() => onClickHandler(props.totalPage)}
            >
              {props.totalPage}
            </Pagination.Item>
            <Pagination.Last
              disabled={page === props.totalPage}
              onClick={() => onClickHandler(props.totalPage)}
              aria-label="Vai all'ultima pagina"
            />
          </Pagination>
        </nav>
      </>
    );
  }, [page, props.totalPage]);

  return <>{displayMyNav}</>;
}
