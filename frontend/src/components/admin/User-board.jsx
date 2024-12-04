/* import { Toaster, toast } from 'sonner'; */
import Table from "../table/Table";
import usersService from '../../services/users';
import columns from '../../utils/tableAdmin';
import useFetch from '../../hooks/useFetch';
//Renombro los datos de la api a "users"


export const Userboard = () => {
    const { data: users, error, isLoading } = useFetch(usersService.getUsers);

    if (isLoading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error al cargar usuarios: {error.message}</p>;

    const filteredUsers = users?.filter(user => user.role === "ADMINISTRATOR") || [];

    return (
        <div className="container">
            <Table
                columns={columns.usersList}
                data={filteredUsers}
                admin={true}
            />
        </div>
    );
};