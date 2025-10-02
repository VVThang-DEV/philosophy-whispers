import { useNavigate } from "react-router-dom";
import QuickTimelineStory from "../components/QuickTimelineStory";

const QuickTimelinePage = () => {
  const navigate = useNavigate();

  return <QuickTimelineStory onBack={() => navigate("/#interactive")} />;
};

export default QuickTimelinePage;
