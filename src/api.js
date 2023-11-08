export const GetAllCategories = async() => {
    const req = await fetch('https://backendv1.vercel.app/post/getallcategory')
    return req.json()
}

export const GetProductsByCategory = async(_id,skip,limit) => {
    const req = await fetch(`https://backendv1.vercel.app/post/getproductsincategory?id=${_id}&skip=${skip}&limit=${limit}`)
    return req.json()
}

export const AllProducts = async() => {
    const req = await fetch('https://backendv1.vercel.app/post/getallproducts')
    return req.json()
}


export const GetProductById = async(_id) => {
    const req = await fetch('https://backendv1.vercel.app/post/getproductbyid?id=' + _id)
    return req.json()
} 