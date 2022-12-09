import Layout from "../../components/layout/Layout";
import RoomDetails from "../../components/room/RoomDetails";

import { wrapper } from "../../redux/store";

import { getRoomDetails } from "../../redux/actions/roomActions";

export default function Index() {
  return (
    <Layout>
      <RoomDetails />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoomDetails(req, params.id));
    }
);
