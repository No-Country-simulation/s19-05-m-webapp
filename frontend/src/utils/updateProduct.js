import { toast } from "sonner";
import productService from "../services/products";
import uploadImageToCloudinary from "../services/cloudinary";
import validateForm from "../utils/validateForm";
import createProductSchema from "../validations/createProduct.schema";

const updateProductSubmit = async (formValues, setErrors, refetch) => {
    const validationResult = await validateForm(formValues, createProductSchema);

    if (validationResult.isValid) {
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
        
        updatedFormValues.platforms = [{ platform: name, model: model }];
        delete updatedFormValues.name; 
        delete updatedFormValues.model;
        
        try {
            await productService.updateProduct(updatedFormValues.id_product, updatedFormValues);
            toast.success("Producto actualizado correctamente!");
            refetch();
        } catch (error) {
            toast.error(error.message);
        } 
    } else {
        setErrors(validationResult.errors); 
    }
};

export default updateProductSubmit;
