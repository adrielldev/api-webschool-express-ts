import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

(async () => {
  const PORT = process.env.PORT || 3000;

  await AppDataSource.initialize().catch((error) =>
    console.error("Error during data source initialization", error)
  );

  app.listen(PORT, () => {
    console.log(`App is running!`);
  });
})();
