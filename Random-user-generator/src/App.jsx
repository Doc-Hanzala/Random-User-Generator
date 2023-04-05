import { useEffect, useState } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random user");

  function onhover(e) {
    if(e.target.classList.contains("icon")){
      const newValue = e.target.dataset.label
      // console.log(newValue);
      setTitle(newValue)
      setValue(person[newValue])
    }
  }

  const fetchPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();

    const person = data.results[0];
    const { phone, email } = person;
    const { number, name } = person.location.street;
    const { first, last } = person.name;
    const { age } = person.dob;
    const { password } = person.login;
    const { large: image } = person.picture;
  

    const newPerson = {
      email,
      phone,
      age,
      password,
      image,
      name: `${first} ${last}`,
      street: `${name} ${number}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name")
    setValue(newPerson.name);
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  return (
    <main>
      <div className="block bg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random person"
          />
          <p className="user-title">my {title} is </p>
          <p className="user-value">{value}</p>

          <div className="values-list">
            <button onMouseOver={onhover} className="icon" data-label="name">
              <FaUser />
            </button>
            <button onMouseOver={onhover} className="icon" data-label="email">
              <FaEnvelopeOpen />
            </button>
            <button onMouseOver={onhover} className="icon" data-label="age">
              <FaCalendarTimes />
            </button>
            <button onMouseOver={onhover} className="icon" data-label="street">
              <FaMap />
            </button>
            <button onMouseOver={onhover} className="icon" data-label="phone">
              <FaPhone />
            </button>
            <button
              onMouseOver={onhover}
              className="icon"
              data-label="password"
            >
              <FaLock />
            </button>
          </div>
          <button onClick={fetchPerson} type="btn" className="btn">
            {loading ? "loading....." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
