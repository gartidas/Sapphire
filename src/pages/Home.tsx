import LoggedLayout from "../components/layouts/LoggedLayout";
import HomeTemplate from "../components/templates/Home/HomeTemplate";

function Home() {
  return (
    <LoggedLayout>
      <HomeTemplate />
    </LoggedLayout>
  );
}

export default Home;
