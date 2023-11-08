import AdminNavigation from "../../components/admin/AdminNavigation";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState, useEffect} from "react";
import { GetAllCategories } from '../../api'
import NotFound from "../notFound/NotFound";
import TextEditor from '../TextEditor';

export default function AddPost() {
    const token = localStorage.getItem("jwtToken");
    let userData;
    if(token){
       userData = jwt_decode(token);
    }
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryID, setCategoryID] = useState('');
    const [image, setImage] = useState([]);
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImage(selectedFiles);
      };
     const addPost = async (e) => {
        e.preventDefault()
        toast.loading('is added...',{id:'1'})
        const data = new FormData();
        image.forEach((file, index) => {
            data.append(`image${index}`, file);
        });
        data.append('title', title);
        data.append('description', description);
        data.append('price', price);
        data.append('categoryID', categoryID);
     try {
        const response = await fetch("https://backendv1.vercel.app/post/addproduct", {
            method: "POST",
            body: data
        })
        const data2 = await response.json()
        if (response.status === 201) {
            toast.success(data2.message,{id:'1'})
          } else {
            toast.error(data2.message,{id:'1'})
          }

     } catch (error) {
        console.error('ERROR:', error);
     }
    }
    //get categories
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        GetAllCategories().then(data => {
            setCategories(data)
            setCategoryID(data[0]._id)
                console.log(categoryID)
        })
    },[])

    return <>
       {
           userData?.roles?.[0] === "ADMIN" && <div>
            <AdminNavigation />
        <div className="flex justify-center gap-10 border-2">
        <div>
            <h2>Product Description</h2>
            <TextEditor markdownText={description} onMarkdownChange={setDescription}/>
        </div>
        <form onSubmit={addPost} className=" flex flex-col">
        <label className="block mt-8 mb-2 text-sm font-semibold text-gray-900 dark:text-white" htmlFor="small_size">The product's name</label>
        <input placeholder="title" className=" p-2 outline-none border-2" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <label className="block mt-2 mb-2 text-sm font-semibold text-gray-900 dark:text-white" htmlFor="small_size">Product price</label>
        <input type="number" min={0} value={price} className=" p-2 outline-none border-2" onChange={(e)=>setPrice(e.target.value)}/>
        <label className="block mt-2 mb-2 text-sm font-semibold text-gray-900 dark:text-white" htmlFor="small_size">Choose a category</label>
        <select name="category" id="category" onChange={(e)=>setCategoryID(e.target.value)}>
        {
            categories.map(el=><option key={el._id} value={el._id} >{el.name}</option>)
        }
        </select>
        <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white" htmlFor="small_size">Select potos</label>
        <input className="block w-full mb-4 p-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept="image/*" onChange={handleFileChange} multiple />
        <input className=" text-[14px] font-semibold py-2 cursor-pointer text-white bg-sky-500 rounded-3xl " type="submit" value="Add New Product"/>
        </form>
    </div>
           </div>
           || <NotFound/>
        }
        
    </>
}