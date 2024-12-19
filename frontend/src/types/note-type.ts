type Note = {
  id: number;
  text: string;
  checked: boolean;
  time: string;
};

type AddNote = {
  text: string;
  checked: boolean;
  time: string;
};

export type { Note,AddNote };
