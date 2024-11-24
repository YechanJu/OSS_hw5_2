import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function ListPage() {
  const [data, setData] = useState([]); // 모든 데이터를 저장
  const [error, setError] = useState(null);
  const location = useLocation(); // navigate로 전달된 데이터 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://672818aa270bd0b975544f3a.mockapi.io/api/v1/users"
        );
        const users = await response.json();

        // 새 데이터가 있을 경우 맨 아래에 추가
        if (location.state?.newUser) {
          const isAlreadyInList = users.some(
            (user) => user.id === location.state.newUser.id
          );
          if (!isAlreadyInList) {
            setData([...users, location.state.newUser]); // 새 데이터 맨 아래 추가
          } else {
            setData(users); // 이미 데이터에 있으면 기본 데이터만 설정
          }
        } else {
          setData(users); // location.state가 없으면 기본 데이터만 설정
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [location.state]); // location.state가 변경될 때마다 실행

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(
        `https://672818aa270bd0b975544f3a.mockapi.io/api/v1/users/${id}`,
        { method: "DELETE" }
      );
      setData((prevData) => prevData.filter((item) => item.id !== id)); // 삭제된 데이터 필터링
      alert("Item removed successfully!");
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1>List Page</h1>
      <Link to="/create" className="btn btn-success mb-3">
        Create New
      </Link>
      <ul className="list-group">
        {data.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>{item.name}</strong> - {item.age}
            <a
              href={`/detail?id=${item.id}`}
              className="btn btn-primary btn-sm float-end ms-2"
            >
              Details
            </a>
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;
