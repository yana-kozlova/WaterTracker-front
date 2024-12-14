import { useLoading } from '../DripLoader/UseLoading.jsx'; 
import WelcomePage from "../../pages/WelcomePage/WelcomePage.jsx";
import DripLoader from "../DripLoader/DripLoader.jsx";

function App() {
  const isLoading = useLoading(3000); // Встановлюємо тривалість завантаження

  return (
    <>
      {isLoading && <DripLoader />}
      {!isLoading && <WelcomePage />}
    </>
  );
}

export default App;