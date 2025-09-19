import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Clock, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("managementTasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
      setFilteredTasks(parsedTasks);
    } else {
      const sampleTasks = [
        {
          id: 1,
          subject: "Manajemen Strategis",
          room: "A301",
          date: "2024-01-15",
          deadline: "2024-01-22",
          lecturer: "Dr. Ahmad Susanto, M.M.",
          type: "Kelompok",
          description: "Analisis SWOT perusahaan multinasional",
          link: "https://classroom.google.com/example1",
          classLeader: "Budi Santoso",
          whatsapp: "081234567890",
        },
        {
          id: 2,
          subject: "Manajemen Keuangan",
          room: "B205",
          date: "2024-01-16",
          deadline: "2024-01-25",
          lecturer: "Prof. Dr. Siti Nurhaliza, M.M.",
          type: "Individu",
          description: "Laporan analisis rasio keuangan",
          link: "",
          classLeader: "Andi Wijaya",
          whatsapp: "081234567891",
        },
      ];
      setTasks(sampleTasks);
      setFilteredTasks(sampleTasks);
      localStorage.setItem("managementTasks", JSON.stringify(sampleTasks));
    }
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(
      (task) =>
        task.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.room.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (deadline) => {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return "text-red-400";
    if (days <= 3) return "text-orange-400";
    if (days <= 7) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          Daftar Tugas Kuliah
        </h1>
        <p className="text-blue-200 text-lg">
          Manajemen S1 - Universitas Mercubuana
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-md mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
          <Input
            type="text"
            placeholder="Cari mata kuliah atau ruangan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 search-input text-white placeholder-blue-300"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/task/${task.id}`}>
              <div className="task-card rounded-xl p-5 h-full cursor-pointer flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white truncate">
                    {task.subject}
                  </h3>

                  <div className="flex items-center space-x-2 text-sm text-blue-300">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{task.lecturer}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-blue-300">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>Ruang {task.room}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-blue-300">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{formatDate(task.date)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-blue-500/20 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-300" />
                    <span className="text-sm text-blue-300">Deadline:</span>
                    <span
                      className={`text-sm font-medium ${getDeadlineColor(
                        task.deadline
                      )}`}
                    >
                      {formatDate(task.deadline)}
                    </span>
                  </div>
                  <div className="text-center">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        getDaysUntilDeadline(task.deadline) <= 3
                          ? "bg-red-500/20 text-red-300"
                          : getDaysUntilDeadline(task.deadline) <= 7
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {getDaysUntilDeadline(task.deadline) < 0
                        ? "Terlambat"
                        : `${getDaysUntilDeadline(task.deadline)} hari lagi`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-blue-300 text-lg">
            Tidak ada tugas yang ditemukan
          </div>
          <p className="text-blue-400 text-sm mt-2">
            Coba ubah kata kunci pencarian Anda
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
