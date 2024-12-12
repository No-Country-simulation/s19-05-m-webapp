import { toast } from "sonner";
import productService from "../services/products";
import uploadImageToCloudinary from "../services/cloudinary";

const createProductSubmit = async (formValues, refetch) => {
    let imageUrl = "";

    if (formValues.image) {
        try {
            imageUrl = await uploadImageToCloudinary(formValues.image); 
        } catch (error) {
            toast.error(error.message);
            return; 
        }
    }

    const reqBody = {
        title: formValues.title,
        price: Number(formValues.price),
        stock: Number(formValues.stock),
        description: formValues.description,
        genre: formValues.genre,
        image: imageUrl,
        type: 'videogame',
        platforms: [{ name: formValues.name, model: formValues.model }]
    };

    try {
        await productService.createProduct(reqBody);
        toast.success('Producto creado correctamente!');
        refetch(); 
    } catch (error) {
        toast.error(error.message);
    } 
};

export default createProductSubmit;
