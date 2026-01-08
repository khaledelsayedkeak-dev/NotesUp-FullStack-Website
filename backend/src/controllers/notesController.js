import Note from "../models/Note.js"

export async function getAllNotes(req, res){
  // database working done here
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("ERROR-GET: " , error);
    res.status(500).json({message: "ERROR ON SERVER END"});
  }
}

export async function getNoteById(req, res){
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({message: "Note not found"});
    res.status(200).json(note);
  } catch (error) {
    console.error("ERROR-GET-SPECFIC: ", error);
    res.status(500).json({message: "ERROR ON SERVER END"});
  }
}

export async function createNote(req, res) {
  try {
    const {title, content} = req.body;
    const note = new Note({title:title, content});
    const savedNote = await note.save();
    res.status(201).json({message: `Note: ${savedNote}`});
  } catch (error) {
    console.error("ERROR-POST: ", error);
    res.status(500).json({message: "ERROR ON SERVER END"});
  }
}

export async function updateNote(req, res) {
  try {
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, 
      {title, content},
      {new: true, }
    );
    if (!updatedNote) return res.status(404).json({message: "Note Not Found!"});
    res.status(200).json({message: "Note Updated Successfully!", note: updatedNote});
  } catch (error) {
    console.error("ERROR-PUT: ", error);
    res.status(500).json({message: "ERROR ON SERVER END"});
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({message: "Note not found"});
    res.status(200).json({message: "Note Deleted Successfully!", note:deletedNote});
  } catch (error) {
    console.error("ERROR-DELETE: ", error);
    res.status(500).json({message: "ERROR ON SERVER END"});
  }
}