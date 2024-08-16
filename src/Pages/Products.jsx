import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { MdDateRange } from "react-icons/md";
import { TbBrandNexo, TbCategory } from "react-icons/tb";

function Products() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const { data: productData, refetch } = useQuery({
    queryKey: ["productData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_LOCALHOST_URL
        }/productsData?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  // pagination functionality------------------------------->
  const count = productData?.count;
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [];
  for (let i = 0; i < numberOfPage; i++) {
    pages.push(i);
    refetch();
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      refetch();
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages?.length) {
      setCurrentPage(currentPage + 1);
      refetch();
    }
  };
  return (
    <div className="">

    <div className="grid grid-cols-4 max-w-[1380px] mx-auto gap-4 my-16">
      {productData?.result?.map((item, index) => (
        <div className="" key={index}>
          <a
            href="#"
            className="block rounded-lg p-4 shadow-sm shadow-indigo-100"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
              <dl>
                <div>
                  <dt className="sr-only">Price</dt>

                  <dd className="text-base text-gray-500">$ {item?.price}</dd>
                </div>

                <div>
                  <dt className="sr-only">Address</dt>

                  <dd className="font-medium">{item?.productName}</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center justify-between gap-8 text-xs ">
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <TbCategory className="text-xl" />

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Category</p>

                    <p className="font-medium">{item?.category}</p>
                  </div>
                </div>

                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <TbBrandNexo className="text-xl" />

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Brand</p>

                    <p className="font-medium">{item?.brandName}</p>
                  </div>
                </div>

                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <MdDateRange className="text-xl" />

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Date</p>

                    <p className="font-medium">{item?.creationDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
      <div className="text-center my-7">
        <button onClick={handlePrevPage} className="btn  mr-3">
          Prev
        </button>
        {pages?.map((page, idx) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              page === currentPage
                ? "btn mr-3 rounded-full w-10  bg-[#6c72ff] hover:bg-[#6c72ff] text-white"
                : "btn rounded-full mr-3 w-10 "
            }
            key={idx}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} className="btn  mr-3">
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
