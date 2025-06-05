import { useEffect, useState } from "react";
import PokemonSearch from "../components/PokemonSearch";
import ProgressChart from "../components/ProgressChart";
import ObtainedPokemonsList from "../components/ObtainedPokemonsList";
import MissingPokemonsList from "../components/MissingPokemonsList";

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
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 min-h-screen p-6 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Pokémon Tracker
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { key: "buscar", label: "🔍 Buscar" },
            { key: "progreso", label: "📊 Progreso" },
            { key: "obtenidos", label: "🎯 Obtenidos" },
            { key: "faltantes", label: "❌ Faltantes" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-full font-medium transition ${
                tab === key
                  ? "bg-blue-500 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setTab(key as any)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-600 font-medium">Cargando Pokémon…</p>
          </div>
        ) : (
          <div className="transition-all duration-300">
            {tab === "buscar" ? (
              <PokemonSearch pokemons={pokemons} setPokemons={setPokemons} />
            ) : tab === "progreso" ? (
              <ProgressChart
                obtenidos={obtenidos.length}
                total={total}
                nombresObtenidos={nombresObtenidos}
              />
            ) : tab === "obtenidos" ? (
              <ObtainedPokemonsList
                nombresObtenidos={nombresObtenidos}
                pokemons={pokemons}
              />
            ) : (
              <MissingPokemonsList
                nombresObtenidos={nombresObtenidos}
                pokemons={pokemons}
                setPokemons={setPokemons} // ✅ Aquí está el fix
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
