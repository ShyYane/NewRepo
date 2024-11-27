import { useAuth } from "../Context/useAuth";

function HomePage() {
  const { roles } = useAuth();
  return (
    <div>
      <div>HomePage</div>
      <div>{roles}</div>
    </div>
  );
}

export default HomePage;
