import server from "./server";
import { PORT } from "./config/env";
import { AppDataSource } from "./config/db-config";

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');

    server.listen(PORT, () => {
      console.log(`Port running in port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error during Data Source initialization:', error);
  });

/*
server.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
*/
