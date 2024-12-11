import { toast } from "sonner";
import userService from "../services/users";

const updateUserSubmit = async (formValues, refetch) => {
    try {
        await userService.updateUser(formValues.id_users, formValues)
        toast.success("Usuario actualizado correctamente!");
        refetch();
    } catch (error) {
        toast.error(error.message);
    } 
};

export default updateUserSubmit;
