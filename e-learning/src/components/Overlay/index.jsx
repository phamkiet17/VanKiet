import React from 'react'
import { useMainContext } from '../../context/MainContext';

export default function Overlay() {
  const { handleShowNavbar } = useMainContext();
  return <div className="overlay" onClick={() => handleShowNavbar(false)} />;
}
