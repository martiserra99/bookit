import RoomItem from "./room/RoomItem";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { clearErrors } from "../redux/actions/roomActions";

import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { rooms, resPerPage, filteredRoomsCount, error } = useSelector(
    (state) => state.allRooms
  );

  let { page = 1, location } = router.query;
  page = Number(page);

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, [error, dispatch]);

  const handlePagination = (pageNumber) => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has("page")) queryParams.set("page", pageNumber);
    else queryParams.append("page", pageNumber);
    router.replace({ search: queryParams.toString() });
  };

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Rooms in ${location}` : "All Rooms"}
        </h2>

        <Link href="/search" className="ml-2 back-to-search">
          {" "}
          <i className="fa fa-arrow-left"></i> Back to Search
        </Link>
        <div className="row">
          {rooms && rooms.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms &&
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      {resPerPage < filteredRoomsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomsCount}
            onChange={handlePagination}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
};

export default Home;
