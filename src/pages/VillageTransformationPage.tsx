import { useNavigate } from "react-router-dom";
import VillageTransformationGame from "../components/VillageTransformationGame";

const VillageTransformationPage = () => {
  const navigate = useNavigate();

  return <VillageTransformationGame onBack={() => navigate("/#interactive")} />;
};

export default VillageTransformationPage;
