import { toast } from "sonner";
import userService from "../services/users";

const deleteUserSubmit = async (id, refetch) => {
    try {
        await userService.deleteUser(id);
        toast.success("Usuario eliminado correctamente!"); 
        refetch(); 
    } catch (error) {
        toast.error(error.message);
    } 
};

export default deleteUserSubmit;
