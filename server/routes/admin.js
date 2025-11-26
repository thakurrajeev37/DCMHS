import express from "express";
import { requireAuth, requireAdmin, requireTeacher } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Admin-only routes
router.get("/users", requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.put("/users/:id/role", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['admin', 'teacher', 'student'];
    
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user role" });
  }
});

router.delete("/users/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Teacher routes (accessible by admin and teacher)
router.get("/dashboard", requireAuth, requireTeacher, async (req, res) => {
  try {
    const stats = {
      totalStudents: await User.countDocuments({ role: 'student' }),
      totalTeachers: await User.countDocuments({ role: 'teacher' }),
      totalAdmins: await User.countDocuments({ role: 'admin' })
    };
    
    res.json({ 
      message: "Teacher dashboard data",
      stats,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
