import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const { toast } = useToast();

  const [taskForm, setTaskForm] = useState({
    subject: "",
    room: "",
    date: "",
    deadline: "",
    lecturer: "",
    type: "",
    description: "",
    link: "",
    classLeader: "",
    whatsapp: "",
  });

  const [groupForm, setGroupForm] = useState({
    subject: "",
    lecturer: "",
    room: "",
    groupLink: "",
    driveLink: "",
  });

  useEffect(() => {
    // Check if already logged in
    const adminSession = localStorage.getItem("adminSession");
    if (adminSession) {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    // Load tasks
    const savedTasks = localStorage.getItem("managementTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    // Load groups
    const savedGroups = localStorage.getItem("managementGroups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication (in real app, use proper authentication)
    if (
      loginForm.username === "ketua" &&
      loginForm.password === "mercubuana2024"
    ) {
      setIsLoggedIn(true);
      localStorage.setItem("adminSession", "true");
      loadData();
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di panel admin!",
      });
    } else {
      toast({
        title: "Login Gagal",
        description: "Username atau password salah!",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminSession");
    setLoginForm({ username: "", password: "" });
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari panel admin",
    });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...taskForm,
      id: editingTask ? editingTask.id : Date.now(),
    };

    let updatedTasks;
    if (editingTask) {
      updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? newTask : task
      );
    } else {
      updatedTasks = [...tasks, newTask];
    }

    setTasks(updatedTasks);
    localStorage.setItem("managementTasks", JSON.stringify(updatedTasks));

    setTaskForm({
      subject: "",
      room: "",
      date: "",
      deadline: "",
      lecturer: "",
      type: "",
      description: "",
      link: "",
      classLeader: "",
      whatsapp: "",
    });
    setEditingTask(null);
    setIsTaskDialogOpen(false);

    toast({
      title: editingTask ? "Tugas Diperbarui" : "Tugas Ditambahkan",
      description: editingTask
        ? "Tugas berhasil diperbarui!"
        : "Tugas baru berhasil ditambahkan!",
    });
  };

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    const newGroup = {
      ...groupForm,
      id: editingGroup ? editingGroup.id : Date.now(),
    };

    let updatedGroups;
    if (editingGroup) {
      updatedGroups = groups.map((group) =>
        group.id === editingGroup.id ? newGroup : group
      );
    } else {
      updatedGroups = [...groups, newGroup];
    }

    setGroups(updatedGroups);
    localStorage.setItem("managementGroups", JSON.stringify(updatedGroups));

    setGroupForm({
      subject: "",
      lecturer: "",
      room: "",
      groupLink: "",
      driveLink: "",
    });
    setEditingGroup(null);
    setIsGroupDialogOpen(false);

    toast({
      title: editingGroup ? "Kelompok Diperbarui" : "Kelompok Ditambahkan",
      description: editingGroup
        ? "Kelompok berhasil diperbarui!"
        : "Kelompok baru berhasil ditambahkan!",
    });
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("managementTasks", JSON.stringify(updatedTasks));
    toast({
      title: "Tugas Dihapus",
      description: "Tugas berhasil dihapus!",
    });
  };

  const handleDeleteGroup = (id) => {
    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
    localStorage.setItem("managementGroups", JSON.stringify(updatedGroups));
    toast({
      title: "Kelompok Dihapus",
      description: "Kelompok berhasil dihapus!",
    });
  };

  const handleEditTask = (task) => {
    setTaskForm(task);
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleEditGroup = (group) => {
    setGroupForm(group);
    setEditingGroup(group);
    setIsGroupDialogOpen(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass-effect rounded-xl p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Admin Panel
                </h1>
                <p className="text-blue-300 mt-2">
                  Masuk untuk mengelola tugas dan kelompok
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-blue-300">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                    className="search-input text-white"
                    placeholder="Masukkan username"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-blue-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className="search-input text-white pr-10"
                      placeholder="Masukkan password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-blue-300 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Masuk
                </Button>
              </form>

              <div className="text-xs text-blue-400 text-center">
                <p>Demo credentials:</p>
                <p>Username: ketua | Password: mercubuana2024</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Admin Panel
          </h1>
          <p className="text-blue-200 text-lg">
            Kelola tugas dan kelompok mata kuliah
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-blue-500 text-blue-300 hover:bg-blue-600/20"
        >
          Logout
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-blue-900/30">
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-blue-600"
            >
              Kelola Tugas
            </TabsTrigger>
            <TabsTrigger
              value="groups"
              className="data-[state=active]:bg-blue-600"
            >
              Kelola Kelompok
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Daftar Tugas</h2>
              <Dialog
                open={isTaskDialogOpen}
                onOpenChange={setIsTaskDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Tugas
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-blue-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingTask ? "Edit Tugas" : "Tambah Tugas Baru"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleTaskSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject" className="text-blue-300">
                          Mata Kuliah
                        </Label>
                        <Input
                          id="subject"
                          value={taskForm.subject}
                          onChange={(e) =>
                            setTaskForm({
                              ...taskForm,
                              subject: e.target.value,
                            })
                          }
                          className="search-input text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="room" className="text-blue-300">
                          Ruangan
                        </Label>
                        <Input
                          id="room"
                          value={taskForm.room}
                          onChange={(e) =>
                            setTaskForm({ ...taskForm, room: e.target.value })
                          }
                          className="search-input text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-blue-300">
                          Tanggal Pemberian
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={taskForm.date}
                          onChange={(e) =>
                            setTaskForm({ ...taskForm, date: e.target.value })
                          }
                          className="search-input text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="deadline" className="text-blue-300">
                          Batas Pengumpulan
                        </Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={taskForm.deadline}
                          onChange={(e) =>
                            setTaskForm({
                              ...taskForm,
                              deadline: e.target.value,
                            })
                          }
                          className="search-input text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="lecturer" className="text-blue-300">
                        Nama Dosen
                      </Label>
                      <Input
                        id="lecturer"
                        value={taskForm.lecturer}
                        onChange={(e) =>
                          setTaskForm({ ...taskForm, lecturer: e.target.value })
                        }
                        className="search-input text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="type" className="text-blue-300">
                        Jenis Tugas
                      </Label>
                      <Select
                        value={taskForm.type}
                        onValueChange={(value) =>
                          setTaskForm({ ...taskForm, type: value })
                        }
                      >
                        <SelectTrigger className="search-input text-white">
                          <SelectValue placeholder="Pilih jenis tugas" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-blue-500/30">
                          <SelectItem value="Individu">Individu</SelectItem>
                          <SelectItem value="Kelompok">Kelompok</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-blue-300">
                        Deskripsi Tugas
                      </Label>
                      <Textarea
                        id="description"
                        value={taskForm.description}
                        onChange={(e) =>
                          setTaskForm({
                            ...taskForm,
                            description: e.target.value,
                          })
                        }
                        className="search-input text-white"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="link" className="text-blue-300">
                        Link (Opsional)
                      </Label>
                      <Input
                        id="link"
                        type="url"
                        value={taskForm.link}
                        onChange={(e) =>
                          setTaskForm({ ...taskForm, link: e.target.value })
                        }
                        className="search-input text-white"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="classLeader" className="text-blue-300">
                          Nama Ketua Kelas
                        </Label>
                        <Input
                          id="classLeader"
                          value={taskForm.classLeader}
                          onChange={(e) =>
                            setTaskForm({
                              ...taskForm,
                              classLeader: e.target.value,
                            })
                          }
                          className="search-input text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="whatsapp" className="text-blue-300">
                          No. WhatsApp
                        </Label>
                        <Input
                          id="whatsapp"
                          value={taskForm.whatsapp}
                          onChange={(e) =>
                            setTaskForm({
                              ...taskForm,
                              whatsapp: e.target.value,
                            })
                          }
                          className="search-input text-white"
                          placeholder="081234567890"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {editingTask ? "Update Tugas" : "Tambah Tugas"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsTaskDialogOpen(false);
                          setEditingTask(null);
                          setTaskForm({
                            subject: "",
                            room: "",
                            date: "",
                            deadline: "",
                            lecturer: "",
                            type: "",
                            description: "",
                            link: "",
                            classLeader: "",
                            whatsapp: "",
                          });
                        }}
                        className="border-blue-500 text-blue-300 hover:bg-blue-600/20"
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {tasks.map((task) => (
                <div key={task.id} className="task-card rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">
                        {task.subject}
                      </h3>
                      <p className="text-blue-300 text-sm">
                        {task.room} • {task.lecturer}
                      </p>
                      <p className="text-blue-400 text-sm">
                        Deadline:{" "}
                        {new Date(task.deadline).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditTask(task)}
                        className="border-blue-500 text-blue-300 hover:bg-blue-600/20"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTask(task.id)}
                        className="border-red-500 text-red-300 hover:bg-red-600/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-blue-300 text-lg">Belum ada tugas</div>
                <p className="text-blue-400 text-sm mt-2">
                  Klik tombol "Tambah Tugas" untuk menambah tugas baru
                </p>
              </div>
            )}
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Daftar Kelompok</h2>
              <Dialog
                open={isGroupDialogOpen}
                onOpenChange={setIsGroupDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kelompok
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-slate-900 border-blue-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingGroup ? "Edit Kelompok" : "Tambah Kelompok Baru"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleGroupSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="groupSubject" className="text-blue-300">
                        Mata Kuliah
                      </Label>
                      <Input
                        id="groupSubject"
                        value={groupForm.subject}
                        onChange={(e) =>
                          setGroupForm({
                            ...groupForm,
                            subject: e.target.value,
                          })
                        }
                        className="search-input text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="groupLecturer"
                          className="text-blue-300"
                        >
                          Nama Dosen
                        </Label>
                        <Input
                          id="groupLecturer"
                          value={groupForm.lecturer}
                          onChange={(e) =>
                            setGroupForm({
                              ...groupForm,
                              lecturer: e.target.value,
                            })
                          }
                          className="search-input text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupRoom" className="text-blue-300">
                          Ruangan
                        </Label>
                        <Input
                          id="groupRoom"
                          value={groupForm.room}
                          onChange={(e) =>
                            setGroupForm({ ...groupForm, room: e.target.value })
                          }
                          className="search-input text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="groupLink" className="text-blue-300">
                        Link Grup WhatsApp
                      </Label>
                      <Input
                        id="groupLink"
                        type="url"
                        value={groupForm.groupLink}
                        onChange={(e) =>
                          setGroupForm({
                            ...groupForm,
                            groupLink: e.target.value,
                          })
                        }
                        className="search-input text-white"
                        placeholder="https://chat.whatsapp.com/..."
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="driveLink" className="text-blue-300">
                        Link Google Drive
                      </Label>
                      <Input
                        id="driveLink"
                        type="url"
                        value={groupForm.driveLink}
                        onChange={(e) =>
                          setGroupForm({
                            ...groupForm,
                            driveLink: e.target.value,
                          })
                        }
                        className="search-input text-white"
                        placeholder="https://drive.google.com/..."
                        required
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {editingGroup ? "Update Kelompok" : "Tambah Kelompok"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsGroupDialogOpen(false);
                          setEditingGroup(null);
                          setGroupForm({
                            subject: "",
                            lecturer: "",
                            room: "",
                            groupLink: "",
                            driveLink: "",
                          });
                        }}
                        className="border-blue-500 text-blue-300 hover:bg-blue-600/20"
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {groups.map((group) => (
                <div key={group.id} className="task-card rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">
                        {group.subject}
                      </h3>
                      <p className="text-blue-300 text-sm">
                        {group.room} • {group.lecturer}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditGroup(group)}
                        className="border-blue-500 text-blue-300 hover:bg-blue-600/20"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteGroup(group.id)}
                        className="border-red-500 text-red-300 hover:bg-red-600/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {groups.length === 0 && (
              <div className="text-center py-12">
                <div className="text-blue-300 text-lg">Belum ada kelompok</div>
                <p className="text-blue-400 text-sm mt-2">
                  Klik tombol "Tambah Kelompok" untuk menambah kelompok baru
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Admin;
