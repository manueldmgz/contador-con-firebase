import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function App() {
  const [newName, setNewName] = useState("");
  const [newMarks, setNewMarks] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      marks: Number(newMarks),
    });
    getUsers();
  };

  const updateUser = async (id, marks) => {
    const userDoc = doc(db, "users", id);
    const newFields = { marks: marks + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
    <div class="titulos">
    <h2>Contador de puntos</h2>
    <h3>Base de datos en Firebase</h3>
    </div>
      <div className="FormHolder">
        <input
          type="text"
          placeholder="Nombre"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Cantidad de puntos"
          onChange={(event) => {
            setNewMarks(event.target.value);
          }}
        />
        <br></br>
        <button onClick={createUser}>Crear Usuario</button>
      </div>
      <div className="user-cards">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h1>Nombre: {user.name}</h1>
            <h1>Puntos: {user.marks}</h1>
            <button onClick={() => updateUser(user.id, user.marks)}>
              Incrementar
            </button>
            <button onClick={() => deleteUser(user.id)}>Borrar Usuario</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
