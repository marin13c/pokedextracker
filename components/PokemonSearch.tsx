import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PokemonSearch({
  pokemons,
  setPokemons,
}: {
  pokemons: any[];
  setPokemons: (data: any[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    // Cargar desde API externa
    fetch("https://backend-pokedextcg.onrender.com/pokemon")
      .then((response) => response.json())
      .then((data) => setPokemons(data))
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, []);

  const filtered = pokemons.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (name: string) => {
    const p = pokemons.find((p) => p.nombre.toLowerCase() === name.toLowerCase());
    setSelected(p);
  };

  const markAsObtained = async () => {
    const numero = selected.numero;
    const estado = 1;

    try {
      await fetch(`https://backend-pokedextcg.onrender.com/pokemon/${numero}/estado/${estado}`, {
        method: "PUT",
      });

      const updatedPokemons = pokemons.map((p) =>
        p.Nombre === selected.nombre ? { ...p, obtenido: 1 } : p
      );
      setPokemons(updatedPokemons);
      setSelected({ ...selected, obtenido: 1 });
      toast.success(`¡${selected.nombre} marcado como obtenido!`);
    } catch (error) {
      console.error("Error al actualizar en el backend:", error);
      toast.error("Error al marcar como obtenido.");
    }
  };

  const unmarkAsObtained = async () => {
    const numero = selected.numero;
    const estado = 0;

    try {
      await fetch(`https://backend-pokedextcg.onrender.com/pokemon/${numero}/estado/${estado}`, {
        method: "PUT",
      });

      const updatedPokemons = pokemons.map((p) =>
        p.nombre === selected.nombre ? { ...p, obtenido: 0 } : p
      );
      setPokemons(updatedPokemons);
      setSelected({ ...selected, obtenido: 0 });
      toast.success(`¡${selected.nombre} desmarcado como obtenido!`);
    } catch (error) {
      console.error("Error al actualizar en el backend:", error);
      toast.error("Error al desmarcar como obtenido.");
    }
  };

  return (
    <div>
      <input
        type="text"
        className="border px-2 py-1 w-full mb-2"
        placeholder="Busca un Pokémon"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSelect(e.target.value);
        }}
        list="pokemon-list"
      />
      <datalist id="pokemon-list">
        {filtered.map((p, i) => (
          <option key={i} value={p.nombre} />
        ))}
      </datalist>

      {selected && (
        <div className="mt-4 p-4 border rounded bg-gray-50 flex items-center gap-4">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.numero}.png`}
            alt={selected.nombre}
            className="w-24 h-24"
          />
          <div>
            <p><strong>N°:</strong> {selected.numero}</p>
            <p><strong>Nombre:</strong> {selected.nombre}</p>
            <p><strong>Obtenido:</strong> {selected.obtenido ? "Sí" : "No"}</p>
            {!selected.obtenido ? (
              <button
                onClick={markAsObtained}
                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
              >
                Marcar como obtenido
              </button>
            ) : (
              <button
                onClick={unmarkAsObtained}
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
              >
                Desmarcar como obtenido
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
