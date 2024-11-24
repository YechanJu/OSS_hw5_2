import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
  });

  const nameRef = useRef();
  const ageRef = useRef();
  const positionRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      alert("Name is required");
      nameRef.current.focus();
      return;
    }
    if (!formData.age) {
      alert("Age is required");
      ageRef.current.focus();
      return;
    }
    if (!formData.position) {
      alert("Position is required");
      positionRef.current.focus();
      return;
    }

    fetch("https://672818aa270bd0b975544f3a.mockapi.io/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data created successfully:", data);
        alert("Data created successfully!");
        navigate("/list", { state: { newUser: data } }); // 생성된 데이터 전달
      })
      .catch((error) => {
        console.error("Error creating data:", error);
        alert("Failed to create data.");
      });
  };

  return (
    <div className="container mt-4">
      <h1>Create Page</h1>
      <form>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            ref={nameRef}
          />
        </div>
        <div className="mb-3">
          <label>Age</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleChange}
            ref={ageRef}
          />
        </div>
        <div className="mb-3">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={formData.position}
            onChange={handleChange}
            ref={positionRef}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
