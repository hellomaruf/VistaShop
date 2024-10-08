import { Slider, styled } from "@material-ui/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { TbBrandNexo, TbCategory } from "react-icons/tb";

function Products() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortDate, setSortDate] = useState("");
  console.log(products);

  const CustomSlider = styled(Slider)({
    color: "#6c72ff", // This sets the color for both the track and thumb
    "& .MuiSlider-thumb": {
      backgroundColor: "#6c72ff",
    },
    "& .MuiSlider-track": {
      backgroundColor: "#6c72ff",
    },
  });
  // Fetch Data by Tanstack Query------------------------------>
  const { data: productData, refetch } = useQuery({
    queryKey: ["productData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_LOCALHOST_URL
        }/productsData?page=${currentPage}&size=${itemsPerPage}`
      );
      // refetch()
      return data;
    },
  });
  console.log(productData);
  console.log(currentPage, itemsPerPage);

  // pagination functionality------------------------------->
  const count = productData?.count;
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [];
  for (let i = 0; i < numberOfPage; i++) {
    pages.push(i);
    refetch();
  }

  // Price range functionality--------------------------------->
  const [value, setValue] = useState([2, 200]);

  // Changing State when volume increases/decreases--------------------->
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    const minPrice = newValue[0];
    const maxPrice = newValue[1];

    if (minPrice) {
      const filtered = productData?.result?.filter(
        (item) => item?.price >= minPrice
      );
      setFilterData(filtered);
    }

    if (maxPrice) {
      const filtered = productData?.result?.filter(
        (item) => item?.price <= maxPrice
      );
      setFilterData(filtered);
    }
  };

  // Sorting by newest and oldest date--------------------------->
  useEffect(() => {
    if (sortDate === "newest") {
      const filtered = productData?.result?.sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );
      setFilterData(filtered);
    }
    if (sortDate === "oldest") {
      const filtered = productData?.result?.sort(
        (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
      );
      setFilterData(filtered);
    }
  }, [productData, sortDate]);

  // Sort the filtered data based on sortOrder-------------------------->
  useEffect(() => {
    if (sortOrder === "lowToHigh") {
      const filtered = productData?.result?.sort((a, b) => a.price - b.price);
      setFilterData(filtered);
    }
    if (sortOrder === "highToLow") {
      const filtered = productData?.result?.sort((a, b) => b.price - a.price);
      setFilterData(filtered);
    }
  }, [sortOrder, productData]);

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

  // Search Functionality---------------------------------------->
  useEffect(() => {
    if (searchQuery === "") {
      setFilterData(productData);
    } else {
      const filtered = productData?.result?.filter((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterData(filtered);
    }
  }, [searchQuery, productData]);

  // Filter by category--------------------------------->
  useEffect(() => {
    if (selectedCategory === "") {
      setFilterData(productData); // Show all data if no category is selected
    } else {
      const filtered = productData?.result?.filter(
        (item) => item.category === selectedCategory
      );
      setFilterData(filtered);
    }
  }, [selectedCategory, productData]);

  console.log(productData);

  // Filter by Brand--------------------------------->
  useEffect(() => {
    if (selectedBrand === "") {
      setFilterData(productData);
    } else {
      const filteredBrand = productData?.result?.filter(
        (item) => item?.brandName === selectedBrand
      );
      setFilterData(filteredBrand);
    }
  }, [selectedBrand, productData]);

  useEffect(() => {
    if (filterData?.result) {
      setProducts(filterData?.result);
      refetch();
    } else if (filterData) {
      setProducts(filterData);
      refetch();
    }
  }, [filterData?.result, filterData, refetch]);
  console.log(products);

  return (
    <div className="max-w-[1380px] lg:mx-auto pt-[150px] lg:pt-[100px] mx-5">
      <div className="">
        <div className="">
          <label className="input max-w-lg input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow outline-none focus:border-[#6c72ff]"
              placeholder="Search...."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 "
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 max-w-[1380px] mx-auto  my-6">
        <div className="col-span-3 order-2 lg:order-1 mt-6 lg:mt-0 grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-6">
          {products?.map((item, index) => (
            <div className=" " key={index}>
              <a href="#" className="block rounded-lg p-4  bg-white">
                <img
                  alt=""
                  src={item?.productImage}
                  className="h-72 w-full p-8 rounded-md object-cover"
                />

                <div className="mt-2">
                  <dl>
                    <div>
                      <dt className="sr-only">Price</dt>

                      <dd className="text-base text-gray-500">
                        $ {item?.price}
                      </dd>
                    </div>

                    <div>
                      <dt className="sr-only">Address</dt>

                      <dd className="font-medium">{item?.productName}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex  items-center justify-between gap-4 text-xs ">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <TbCategory className="text-xl text-[#6c72ff]" />

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Category</p>

                        <p className="font-medium">{item?.category}</p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <TbBrandNexo className="text-xl text-[#6c72ff]" />

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Brand</p>

                        <p className="font-medium">{item?.brandName}</p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <MdDateRange className="text-xl text-[#6c72ff]" />

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
        <div className="col-span-1 order-1 lg:order-1  p-4 bg-white rounded-xl h-[450px] lg:ml-6">
          <div className="">
            <div className="flex items-center justify-between font-semibold text-sm mb-3 text-gray-500">
              <h3>Filtering</h3>
              <IoFilter className="font-semibold" />
            </div>
            <div className=" space-y-4">
              <div className="">
                <CustomSlider
                  className="text-[#6c72ff] text-sm"
                  value={value}
                  onChange={rangeSelector}
                  min={10}
                  max={500}
                  valueLabelDisplay="auto"
                />
                <span className="text-sm">
                  {" "}
                  Range of Price is between {value[0]} /- and {value[1]} /-
                </span>
              </div>
              <div className="flex items-center gap-3">
                <select
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                  id="category"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                >
                  <option value={""} selected>
                    All Category
                  </option>
                  <option value="Tea">Tea</option>
                  <option value="Milk">Milk</option>
                  <option value="Oil">Oil</option>
                  <option value="Rice">Rice</option>
                </select>
                <select
                  id="brand"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                >
                  <option value={""} selected>
                    All Blands
                  </option>
                  <option value="Fresh">Fresh</option>
                  <option value="Pran">Pran</option>
                  <option value="Chashi">Chashi</option>
                  <option value="Radhuni">Radhuni</option>
                  <option value="Teer">Teer</option>
                </select>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex items-center justify-between mt-6 font-semibold text-sm mb-3 text-gray-500">
              <h3>Sorting</h3>
              <FaSortAmountDownAlt />
            </div>
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              id="category"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            >
              <option value={""}>Sorting by Price</option>
              <option value="highToLow">High to Low</option>
              <option value="lowToHigh">Low to High</option>
            </select>

            <select
              onChange={(e) => setSortDate(e.target.value)}
              id="date"
              className="bg-gray-50 border mt-4  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            >
              <option value={""}>Date Added</option>
              <option value="newest">New Added Products</option>
              <option value="oldest">Oldest Added Products</option>
            </select>
          </div>
        </div>
      </div>
      <div className="text-center my-7">
        <button onClick={handlePrevPage} className="btn btn-sm  mr-3">
          Prev
        </button>
        {pages?.map((page, idx) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              page === currentPage
                ? "btn btn-sm mr-2 rounded-full w-10  bg-[#6c72ff] hover:bg-[#6c72ff] text-white"
                : "btn btn-sm rounded-full mr-2 w-10 "
            }
            key={idx}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} className="btn btn-sm mr-3">
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
