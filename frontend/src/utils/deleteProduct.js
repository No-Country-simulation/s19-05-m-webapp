import { toast } from "sonner";
import productService from "../services/products";

const deleteProductSubmit = async (id, refetch) => {
    try {
        await productService.deleteProduct(id);
        toast.success("Producto eliminado correctamente!"); 
        refetch(); 
    } catch (error) {
        toast.error(error.message);
    } 
}

export default deleteProductSubmit;
