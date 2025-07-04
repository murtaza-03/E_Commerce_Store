import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error?.error || "Something went wrong."}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div className="flex justify-center flex-wrap mt-[2rem]">
            {data?.products?.length === 0 ? (
              <p className="text-center text-gray-500 text-xl">
                No products found.
              </p>
            ) : (
              data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
