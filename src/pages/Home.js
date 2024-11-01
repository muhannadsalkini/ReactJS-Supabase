import SmoothieCard from "../components/smoothies";
import supabase from "../config/supabaseClinet";
import { useEffect, useState } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select("*");

      if (error) {
        setFetchError(error.message || "Something went wrong");
        setSmoothies(null);
        console.log(error);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <div key={smoothie.id}>
                <SmoothieCard smoothie={smoothie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
