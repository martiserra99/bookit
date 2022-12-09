import Layout from "../components/layout/Layout";
import Home from "../components/Home";

import { wrapper } from "../redux/store";

import { getRooms } from "../redux/actions/roomActions";

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      await store.dispatch(getRooms(req));
    }
);
