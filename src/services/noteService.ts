import axios from 'axios';
import type { Note } from "../types/note"

const BASE_URL = "https://notehub-public.goit.study/api"


interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

const fetchNotes = async (q: string, page: number = 1): Promise<FetchNotesResponse> => {
    const resp = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`,     {
      params: {
        search: q,
        page: page,
      },
    })
return resp.data
}

// const createNote = async (newNote: Note) => {

//     return note
// }

// const deleteNote = async (noteId: string) => {

//     return info
// }


export {
    fetchNotes,
    // createNote,
    // deleteNote
}