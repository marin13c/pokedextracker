interface ObtainedPokemonsListProps {
  nombresObtenidos: string[];
  pokemons: any[];
}

export default function ObtainedPokemonsList({
  nombresObtenidos,
  pokemons,
}: ObtainedPokemonsListProps) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {nombresObtenidos.map((nombre, index) => {
        const pokemon = pokemons.find((p) => p.nombre === nombre);
        if (!pokemon) return null;

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.numero}.png`;

        return (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden text-center p-4 hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={imageUrl}
              alt={pokemon.nombre}
              className="w-24 h-24 mx-auto mb-2"
            />
            <p className="font-semibold text-blue-600">{pokemon.numero}</p>
            <p className="text-gray-700">{pokemon.nombre}</p>
          </div>
        );
      })}
    </div>
  );
}
