import "./modal.css";
import TextEditor from "../../../../components/TextEditor";
export default function Modal({
  active,
  setActive,
  oneCategory,
  nextImage,
  lastImage,
  countImgae,
  deletePhoto,
  setUpdatedProduct,
  updatedProduct,
  handleFileChange,
  updateProduct,
  markdownText,
  onMarkdownChange
}) {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal__content flex justify-between gap-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="w-[350px] h-[350px]">
            <img
              className="w-full h-full"
              src={oneCategory?.photos?.[countImgae]?.url}
              alt=""
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => lastImage(1)}
              className="my-2 text-[14px] text-white bg-sky-500 px-6 py-2 mx-1"
            >
              Last
            </button>
            <button
              onClick={() =>
                deletePhoto(
                  oneCategory._id,
                  oneCategory?.photos?.[countImgae]?.url
                )
              }
              className="my-2 text-[14px] text-white bg-red-600 px-6 py-2 mx-1"
            >
              Delete Photo
            </button>
            <button
              onClick={() => nextImage(1, (oneCategory?.photos).length)}
              className="my-2 text-[14px] text-white bg-sky-500 px-6 py-2 mx-1"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="mt-10">
            Product Title:
            <input
              className="mx-3 dark:border-gray-800 border-2"
              type="text"
              value={updatedProduct.title}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, title: e.target.value })
              }
            />
          </span>
          <span className="mt-2">
            Product Price:
            <input
              className="mx-3 dark:border-gray-800 border-2"
              type="text"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
            />
          </span>
          <span className="mt-2">
            Product Description:
              <TextEditor
                markdownText={markdownText}
                onMarkdownChange={onMarkdownChange}
              />
          </span>
          <label
            className="block mb-2 mt-10 text-sm font-semibold text-gray-900 dark:text-white"
            htmlFor="small_size"
          >
            Select potos
          </label>
          <input
            className="block w-full mb-4 p-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
          />
          <button
            onClick={(e) => updateProduct(e)}
            className=" text-[14px] font-semibold py-2 cursor-pointer text-white bg-sky-500 rounded-3xl "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
