import server from "./server";
import { PORT } from "./config/env";

server.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
 });