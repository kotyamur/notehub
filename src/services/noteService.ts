import axios from "axios";
import type { Note } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const fetchNotes = async (
  page: number = 1,
  query: string = ""
): Promise<FetchNotesResponse> => {
  const resp = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      search: query,
      page: page,
    },
    headers: {
      Authorization: myKey,
    },
  });
  return resp.data;
};

// const createNote = async (newNote: Note) => {
//     const resp = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`,     {
//       params: {
//         search: query,
//         page: page,
//         },
//         headers: {
//             "Authorization": myKey,
//         }
//     })
// return resp.data
// }

const deleteNoteById = async (noteId: string): Promise<Note> => {
  const resp = await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: {
      Authorization: myKey,
    },
  });

  return resp.data;
};

export {
  fetchNotes,
  // createNote,
  deleteNoteById,
};
