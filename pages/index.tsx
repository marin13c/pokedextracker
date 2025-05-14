import { useEffect, useState } from "react";
import PokemonSearch from "../components/PokemonSearch";
import ProgressChart from "../components/ProgressChart";
import ObtainedPokemonsList from "../components/ObtainedPokemonsList";

export default function Home() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [tab, setTab] = useState<"buscar" | "progreso" | "obtenidos">("buscar");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://backend-pokedextcg.onrender.com/pokemon")
      .then((res) => res.json())
      .then((data) => setPokemons(data))
      .catch((err) => console.error("Error al cargar los Pokémon", err))
      .finally(() => setLoading(false));
  }, [tab]);

  const obtenidos = pokemons.filter((p) => p.obtenido === 1);
  const total = pokemons.length;
  const nombresObtenidos = obtenidos.map((p) => p.nombre);

  return (
    <div className="p-6 font-sans max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pokémon Tracker</h1>

      {/* Tabs */}
      <div className="flex mb-4 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            tab === "buscar" ? "border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => setTab("buscar")}
        >
          🔍 Buscar Pokémon
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            tab === "progreso" ? "border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => setTab("progreso")}
        >
          📊 Progreso
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            tab === "obtenidos" ? "border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => setTab("obtenidos")}
        >
          🎯 Pokémon Obtenidos
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tab === "buscar" ? (
        <PokemonSearch pokemons={pokemons} setPokemons={setPokemons} />
      ) : tab === "progreso" ? (
        <ProgressChart
          obtenidos={obtenidos.length}
          total={total}
          nombresObtenidos={nombresObtenidos}
        />
      ) : (
        <ObtainedPokemonsList
          nombresObtenidos={nombresObtenidos}
          pokemons={pokemons}
        />
      )}
    </div>
  );
}
