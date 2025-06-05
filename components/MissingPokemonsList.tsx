import { toast } from "react-toastify";

interface MissingPokemonsListProps {
  nombresObtenidos: string[];
  pokemons: any[];
  setPokemons: (data: any[]) => void;
}

export default function MissingPokemonsList({
  nombresObtenidos,
  pokemons,
  setPokemons,
}: MissingPokemonsListProps) {
  const pokemonsFaltantes = pokemons
    .filter((p) => !nombresObtenidos.includes(p.nombre))
    .sort((a, b) => a.numero - b.numero);

  const markAsObtained = async (pokemon: any) => {
    const numero = pokemon.numero;
    const estado = 1;

    try {
      await fetch(
        `https://backend-pokedextcg.onrender.com/pokemon/${numero}/estado/${estado}`,
        {
          method: "PUT",
        }
      );

      const updatedPokemons = pokemons.map((p) =>
        p.nombre === pokemon.nombre ? { ...p, obtenido: 1 } : p
      );
      setPokemons(updatedPokemons);
      toast.success(`¡${pokemon.nombre} marcado como obtenido!`);
    } catch (error) {
      console.error("Error al actualizar en el backend:", error);
      toast.error("Error al marcar como obtenido.");
    }
  };

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {pokemonsFaltantes.map((pokemon) => {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.numero}.png`;

        return (
          <div
            key={pokemon.numero}
            className="bg-red-50 shadow-md rounded-xl overflow-hidden text-center p-4 hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={imageUrl}
              alt={pokemon.nombre}
              className="w-24 h-24 mx-auto mb-2 grayscale opacity-70"
            />
            <p className="font-semibold text-red-600">{pokemon.numero}</p>
            <p className="text-gray-700 mb-2">{pokemon.nombre}</p>
            <button
              onClick={() => markAsObtained(pokemon)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Marcar como obtenido
            </button>
          </div>
        );
      })}
    </div>
  );
}
