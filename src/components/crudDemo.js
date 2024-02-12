import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./modal";

const CrudDemo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editData, setEditData] = useState();

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setData(response.data);
    setLoading(false);
  };

  const addUser = async () => {
    const newUser = {
      userId,
      name,
    };

    if (name.trim() !== "") {
      setData([...data, { id: userId, name: name }]);
      setName("");
      setUserId("");
    }
    console.log("Data after edit", data);
  };

  const handleUpdate = async (user) => {
    setModalIsOpen(true);
    const updatedUser = {
      name: user.name,
      userId: user.id,
    };
    setEditData(updatedUser);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    // console.log("Original Data", data);
    // console.log("delete user data", id);
    const newData = data.filter((item) => item.id !== id);
    // console.log("New Data after delete", newData);
    setData(newData);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  function cancelHandler() {
    setModalIsOpen(false);
  }
  //Handler for update user name
  function confirmHandler() {
    const index = data.findIndex((todo) => todo.id === editData.userId);
    const newList = [...data];
    newList[index] = editData;
    setData(newList);
    setModalIsOpen(false);
  }

  const editUser = (e) => {
    const val = e?.target?.value;
    setEditData((prevState) => {
      // Create a new object with the updated value
      return {
        ...prevState,
        // Copy the previous state
        name: val,
        // Update the specific key's value
      };
    });

    // console.log("Captured event", editData);
  };

  const modelContent = () => {
    return (
      <div className="modal-box d-flex align-items-center">
        <h2>Edit User</h2>
        <input
          className="form-control w-50"
          type="number"
          value={editData?.userId}
          disabled={true}
        />
        <input
          className="form-control w-50"
          type="text"
          value={editData?.name}
          onChange={(e) => editUser(e)}
        />
        <button className="btn btn-success w-50" onClick={confirmHandler}>
          Confirm
        </button>
        <button className="btn btn-warning w-50" onClick={cancelHandler}>
          cancel
        </button>
        <span className="close-btn btn" onClick={cancelHandler}>X</span>
      </div>
    );
  };

  return (
    <>
      <h1>Todo App for User</h1>
      <div className="input-wrapper d-flex justify-content-center mb-4 mt-4">
        <input
          className="form-control w-25"
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <input
          className="form-control w-25"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <button onClick={addUser} className="btn btn-primary">
          Add User
        </button>
      </div>

      <div>
        {/* <button onClick={fetchData}>Get Data</button> */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="col-8 m-auto">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn btn-danger"
                      >
                        X
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleUpdate(user)}
                        className="btn btn-success"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modalIsOpen && (
        <Modal
          closeModalHandler={closeModalHandler}
          onConfirm={closeModalHandler}
          modelContent={modelContent}
        />
      )}
    </>
  );
};

export default CrudDemo;
