export default function Dashboard({
  tokenTime,
  categories,
  selectedCategory,
  setSelectedCategory,
  setLastId,
  products,
  deleteProduct,
  modal,
}) {
  return (
    <>
      <div className="flex pl-2">
        <h2 className="text-2xl text-gray-900 dark:text-white">
          Token Time: {Math.ceil(tokenTime / 60 / 60) + "H"}
        </h2>
      </div>
      <div className="flex pl-2">
        <h2 className="text-2xl text-gray-900 dark:text-white">
          Select category:
        </h2>
        <select
          className="block w-[240px] p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="category"
          id="category"
          value={selectedCategory}
          onChange={(e) => {
            setLastId(e.target.value);
            setSelectedCategory(e.target.value);
          }}
        >
          {categories.map((el) => (
            <option className=" p-2" key={el._id} value={el._id}>
              {el.name.length > 20 ? el.name.slice(20) + "..." : el.name}
            </option>
          ))}
        </select>
      </div>

      <table className="table-auto w-full">
        <thead className="">
          <tr className=" flex justify-between w-full border-t-2 border-b-2">
            <th className=" w-[200px]">Image</th>
            <th className=" w-[200px]">Title</th>
            <th className=" w-[200px]">Price</th>
            <th className=" w-[200px]">Update</th>
            <th className=" w-[200px]">Delete</th>
          </tr>
        </thead>
        {products?.products?.length &&
          products?.products.map((el) => (
            <tbody key={el._id} className=" w-full">
              <tr className=" w-full flex justify-between ">
                <td className="">
                  <img
                    className=""
                    src={el?.photos[0]?.url}
                    width="200px"
                    height="200px"
                  />
                </td>
                <td className="w-[200px] text-center text-xl font-bold">
                  {el.title}
                </td>
                <td className="w-[200px] text-center text-base font-mono">
                  {el.price}
                </td>
                <td className="w-[200px] text-center text-base font-mono">
                  <button
                    onClick={() => modal(el)}
                    className="my-2 text-[14px] text-white bg-sky-500 rounded-3xl px-6 py-2 mx-1"
                  >
                    Update
                  </button>
                </td>
                <td className="w-[200px] text-center">
                  <button
                    onClick={() => deleteProduct(el._id)}
                    className=" text-[14px] font-serif text-white bg-red-600 rounded-3xl px-8 py-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  );
}
