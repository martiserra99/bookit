import RoomItem from "./room/RoomItem";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { clearErrors } from "../redux/actions/roomActions";

import Pagination from "react-js-pagination";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { rooms, resPerPage, roomsCount, error } = useSelector(
    (state) => state.allRooms
  );

  let { page = 1 } = router.query;
  page = Number(page);

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, [error, dispatch]);

  const handlePagination = (pageNumber) => {
    router.push(`/?page=${pageNumber}`);
  };

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

        <a href="#" className="ml-2 back-to-search">
          {" "}
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row">
          {rooms && rooms.length === 0 ? (
            <div className="alert alert-danger">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms &&
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      {resPerPage < roomsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
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
