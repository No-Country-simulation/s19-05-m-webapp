import { toast } from "sonner";
import productService from "../services/products";
import uploadImageToCloudinary from "../services/cloudinary";

const updateProductSubmit = async (formValues, refetch) => {
    const updatedFormValues = { ...formValues };
    const { name, model } = updatedFormValues;

    if (updatedFormValues.image) {
        try {
            const imageUrl = await uploadImageToCloudinary(updatedFormValues.image);
            updatedFormValues.image = imageUrl;  
        } catch (error) {
            toast.error(error.message);
            return;  
        }
    } else {
        delete updatedFormValues.image; 
    }
    
    updatedFormValues.platforms = [{ name: name, model: model }];
    delete updatedFormValues.name; 
    delete updatedFormValues.model;
    
    try {
        await productService.updateProduct(updatedFormValues.id_product, updatedFormValues);
        toast.success("Producto actualizado correctamente!");
        refetch();
    } catch (error) {
        toast.error(error.message);
    } 
};

export default updateProductSubmit;
