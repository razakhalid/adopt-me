import { useState } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import { useQuery } from "@tanstack/react-query";

const animals = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // const [location, setLocation] = useState("");
  // const [animal, setAnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const results = useQuery("search", requestParams, fetchSearch);
  const pets = results?.data?.pets ?? [];

  // useEffect(() => {
  //   requestPets();
  // }, []);

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed${breed}`
  //   );
  //   const json = await res.json();
  //   setPets(json.pets);
  // }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // requestPets();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            // onChange={(e) => setLocation(e.target.value)}
            type="text"
            id="location"
            name="location"
            // value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            // onChange={(e) => {
            //   setAnimal(e.target.value);
            // }}
            id="animal"
            name="animal"
            // value={animal}
          >
            {animals.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            // onChange={(e) => setBreed(e.target.value)}
            id="breed"
            name="breed"
            // value={breed}
            placeholder="Breed"
            disabled={breeds.length === 0}
          >
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
