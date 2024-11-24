import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function UpdatePage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
  });

  const [editCount, setEditCount] = useState(0); // 수정 횟수 추적
  const nameRef = useRef();
  const ageRef = useRef();
  const positionRef = useRef();
  const navigate = useNavigate(); // 리디렉션을 위해 사용

  // handleChange: input 값 변경 시 실행
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setEditCount(editCount + 1); // 수정 횟수 증가
  };

  // handleSubmit: 데이터 유효성 체크 및 제출
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

    // 데이터 제출 (PUT 요청)
    fetch(`https://672818aa270bd0b975544f3a.mockapi.io/api/v1/users/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated successfully:", data);
        alert("Data submitted successfully!");
        navigate("/list"); // /list로 리디렉션
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Failed to update data.");
      });
  };

  // useEffect: formData가 변경될 때마다 PUT 요청 (옵션)
  useEffect(() => {
    // 자동으로 데이터를 업데이트할 필요가 없는 경우 생략 가능
    if (editCount > 0) {
      console.log("Edited data:", formData);
    }
  }, [formData]);

  return (
    <div className="container mt-4">
      <h1>Update Page</h1>
      <form>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            ref={nameRef} // useRef로 연결
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
            ref={ageRef} // useRef로 연결
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
            ref={positionRef} // useRef로 연결
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
      <p>Total Edits: {editCount}</p> {/* 수정 횟수 표시 */}
    </div>
  );
}

export default UpdatePage;
