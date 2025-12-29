import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const apiUrl = import.meta.env.VITE_BLOG_API_URL;

export function useAppLogic() {
  const { id } = useParams();
  // const navigate = useNavigate();

  return {
    id,
  };
}
