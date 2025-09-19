import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Clock,
  ExternalLink,
  Phone,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("managementTasks");
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      const foundTask = tasks.find((t) => t.id === parseInt(id));
      setTask(foundTask);
    }
  }, [id]);

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-blue-300 text-lg">Tugas tidak ditemukan</div>
          <Link to="/">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
              Kembali ke Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
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
    if (days < 0) return "text-red-400 bg-red-500/20";
    if (days <= 3) return "text-orange-400 bg-orange-500/20";
    if (days <= 7) return "text-yellow-400 bg-yellow-500/20";
    return "text-green-400 bg-green-500/20";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link to="/">
          <Button
            variant="ghost"
            className="text-blue-300 hover:text-white hover:bg-blue-600/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Tugas
          </Button>
        </Link>
      </motion.div>

      {/* Task Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-8"
      >
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              {task.subject}
            </h1>
            <div
              className={`px-4 py-2 rounded-full text-center ${
                task.type === "Kelompok"
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-purple-500/20 text-purple-300"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              {task.type}
            </div>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-blue-300">Ruangan</p>
                  <p className="text-white font-medium">{task.room}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-blue-300">Dosen Pengampu</p>
                  <p className="text-white font-medium">{task.lecturer}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-blue-300">Tanggal Pemberian</p>
                  <p className="text-white font-medium">
                    {formatDate(task.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-blue-300">Batas Pengumpulan</p>
                  <p
                    className={`font-medium ${
                      getDeadlineColor(task.deadline).split(" ")[0]
                    }`}
                  >
                    {formatDate(task.deadline)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deadline Status */}
          <div className="text-center">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full ${getDeadlineColor(
                task.deadline
              )}`}
            >
              <Clock className="w-4 h-4 mr-2" />
              {getDaysUntilDeadline(task.deadline) < 0
                ? "Terlambat!"
                : `${getDaysUntilDeadline(task.deadline)} hari lagi`}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Task Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-8"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Deskripsi Tugas</h2>
          </div>
          <p className="text-blue-100 leading-relaxed">{task.description}</p>
        </div>
      </motion.div>

      {/* Links and Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Link Terkait</h3>
            </div>
            {task.link ? (
              <a
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buka Link Tugas
                </Button>
              </a>
            ) : (
              <p className="text-blue-300 text-sm">Tidak ada link tersedia</p>
            )}
          </div>
        </motion.div>

        {/* Class Leader Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Ketua Kelas</h3>
            </div>
            <div className="space-y-2">
              <p className="text-white font-medium">{task.classLeader}</p>
              <a
                href={`https://wa.me/${task.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Hubungi via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskDetail;
