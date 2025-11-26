// Simple JWT authentication middleware for Express (ESM)
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = { id: user._id, role: user.role, email: user.email, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Role-based authorization middleware
export function requireRole(...allowedRoles) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get full user details if only id is present
    if (!req.user.role) {
      try {
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
        req.user.role = user.role;
      } catch (err) {
        return res.status(500).json({ error: 'Error verifying user role' });
      }
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.',
        requiredRole: allowedRoles,
        userRole: req.user.role
      });
    }

    next();
  };
}

// Convenience middleware for specific roles
export const requireAdmin = requireRole('admin');
export const requireTeacher = requireRole('admin', 'teacher');
export const requireStudent = requireRole('admin', 'teacher', 'student');
