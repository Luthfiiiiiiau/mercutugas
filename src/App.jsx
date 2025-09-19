import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Groups from "@/pages/Groups";
import Admin from "@/pages/Admin";
import TaskDetail from "@/pages/TaskDetail";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      <Helmet>
        <title>Manajemen Tugas - Universitas Mercubuana</title>
        <meta
          name="description"
          content="Sistem manajemen tugas untuk mahasiswa Manajemen Universitas Mercubuana"
        />
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
