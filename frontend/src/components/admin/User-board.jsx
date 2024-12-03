import { Toaster, toast } from 'sonner';
import Table from "../table/Table";
import usersService from '../../services/users';
//Renombro los datos de la api a "users"
const { data: users } = useFetch(usersService.getUsers);

const Userboard = () => {
    let filter = users.filter((users)=> {
        users.role = "ADMINISTRATOR"
    });


    return (
        <div className="container">
            <Table
                columns={}
                data={}
                admin={true}
            />
        </div>
    )
}

export default Userboard;