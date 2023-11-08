import AddCategory from "../../components/admin/AddCategory"
import AdminNavigation from "../../components/admin/AdminNavigation";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { GetAllCategories } from '../../api';
import NotFound from "../../components/notFound/NotFound";
import Modal from "../../components/admin/Modal/ModalCategory/Modal";

export default function AddCategoryPage() {
    //modal isWindow
    const [active, setActive] = useState(false);
    //token
    const token = localStorage.getItem("jwtToken");
    let userData;
    if(token){
       userData = jwt_decode(token);
    }
    //create new category
    const [isDeleted, setIsDeleted] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImage(...selectedFiles);
    };
    const createCategory = async (e) => {
        e.preventDefault();
        toast.loading('Creating category...',{id:'1'})
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        const response = await fetch('https://backendv1.vercel.app/post/addcategory', {
            method: "POST",
            body: formData
        })
        const data = await response.json();
        if(response.status == 201){
            setIsDeleted(true);
            setName('');
            setImage(null);
            toast.success(data.message,{id:'1'})
        } else {
            toast.error(data.message,{id:'1'})
            console.log(response)
        }
    }

    //get all category
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        GetAllCategories().then(data => {
            setCategories(data)
            setIsDeleted(false)
        })
    },[isDeleted])
    //delete category 
    const deleteCategory = async (id) => {
        toast.loading('Deleting category...',{id:'1'})
        try {
            const response = await fetch(`https://backendv1.vercel.app/post/deletecategory?id=${id}`,{
            method: 'DELETE'
            })
            const data = await response.json();
            console.log(data)
            if(response.status == 200){
                toast.success(data.message,{id:'1'})
                setIsDeleted(true)
            } 
        } catch (error) {
            toast.error(error)
            console.log("error")
        }
    }

    const [oneCategory, setOneCategory] = useState({});
    const [updateName, setUpdateName] = useState("");
    const modal = (oneCategory) => {
        setImage(null);
        setActive(true);
        setUpdateName(oneCategory.name)
        setOneCategory(oneCategory);
    }

    const updateHandler = async (id) => {
        toast.loading('Updating category...',{id:'1'});
        const formData = new FormData();
        formData.append("categoryId", id)
        if(updateName) {
            formData.append("name", updateName);
        }
        if(image) {
            formData.append("image", image)
        }
        const response = await fetch('https://backendv1.vercel.app/post/update/category', {
            method: "PUT",
            body: formData
        })
        const data = await response.json();
        if(response.status == 200){
            setIsDeleted(true);
            setName('');
            toast.success(data.message,{id:'1'})
        } else {
            toast.error(data.message,{id:'1'})
            console.log(response)
        }

    }

    return <>
          {  userData?.roles?.[0] === "ADMIN" && <div>
            <AdminNavigation />
                <AddCategory createCategory={createCategory}
                 name={name}
                setName={setName}
                handleFileChange={handleFileChange} 
                categories={categories}
                deleteCategory={deleteCategory}
                image={image}
                setImage={setImage}
                modal={modal}
                />
                <Modal 
                active={active}
                setActive={setActive}
                oneCategory={oneCategory}
                updateName={updateName}
                setUpdateName={setUpdateName}
                handleFileChange={handleFileChange}
                image={image}
                updateHandler={updateHandler}
                />
           </div>
           || <NotFound/>
        }
    </>
}