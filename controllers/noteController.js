const Note = require('../models/noteModel');

// ✅ ดึงโน้ตทั้งหมดของผู้ใช้
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

// ✅ สร้างโน้ตใหม่
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newNote = new Note({
      title,
      content,
      user: req.user.userId,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

// ✅ อัปเดตโน้ต
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const note = await Note.findOne({ _id: id, user: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

// ✅ ลบโน้ต
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
