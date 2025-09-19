import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ExternalLink,
  MapPin,
  User,
  MessageCircle,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load groups from localStorage
    const savedGroups = localStorage.getItem("managementGroups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    } else {
      // Sample data
      const sampleGroups = [
        {
          id: 1,
          subject: "Manajemen Strategis",
          lecturer: "Dr. Ahmad Susanto, M.M.",
          room: "A301",
          groupLink: "https://chat.whatsapp.com/example1",
          driveLink: "https://drive.google.com/drive/folders/example1",
        },
        {
          id: 2,
          subject: "Manajemen Keuangan",
          lecturer: "Prof. Dr. Siti Nurhaliza, M.M.",
          room: "B205",
          groupLink: "https://chat.whatsapp.com/example2",
          driveLink: "https://drive.google.com/drive/folders/example2",
        },
      ];
      setGroups(sampleGroups);
      localStorage.setItem("managementGroups", JSON.stringify(sampleGroups));
    }
  }, []);

  const handleLinkClick = (url, type) => {
    if (url.includes("example")) {
      toast({
        title: "🚧 Link Demo",
        description:
          "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      });
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          Kelompok Mata Kuliah
        </h1>
        <p className="text-blue-200 text-lg">
          Daftar grup dan drive untuk setiap mata kuliah
        </p>
      </motion.div>

      {/* Groups Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="task-card rounded-xl p-6"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {group.subject}
                  </h3>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-300">Dosen</p>
                    <p className="text-white text-sm">{group.lecturer}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-300">Ruangan</p>
                    <p className="text-white text-sm">{group.room}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => handleLinkClick(group.groupLink, "whatsapp")}
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Grup WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>

                <Button
                  onClick={() => handleLinkClick(group.driveLink, "drive")}
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Buka Google Drive</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No groups found */}
      {groups.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-blue-300 text-lg">
            Belum ada kelompok yang tersedia
          </div>
          <p className="text-blue-400 text-sm mt-2">
            Hubungi admin untuk menambahkan kelompok baru
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Groups;
