import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function DetailPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      // ID가 없으면 id=1로 리디렉션
      console.warn("No ID provided, redirecting to id=1...");
      navigate("/detail?id=1");
      return;
    }

    fetch(`https://672818aa270bd0b975544f3a.mockapi.io/api/v1/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      {data ? (
        <>
          <h1>{data.name || "No Name"}</h1>
          <p>Age: {data.age || "No Age"}</p>
          <p>Position: {data.position || "No Position"}</p>
          <a href="/update" className="btn btn-primary">
            Update
          </a>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default DetailPage;
