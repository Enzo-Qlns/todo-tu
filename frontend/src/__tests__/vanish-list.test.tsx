import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VanishList } from "../components/ui/vanish-list";
import { Note } from "../types/note-type";
import "@testing-library/jest-dom";
import fc from "fast-check";

const mockNotes: Note[] = [
  { id: 1, text: "First Task", checked: false, time: "12:00" },
  { id: 2, text: "Second Task", checked: true, time: "12:30" },
];

const mockOnAddNewNote = jest.fn();
const mockOnCheckNote = jest.fn();
const mockOnRemoveNote = jest.fn();

describe("VanishList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("check if time input value is not empty", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    // Teste des valeurs négatives
    fc.assert(
      fc.property(fc.integer({ max: -1 }), (negativeValue) => {
        fireEvent.click(screen.getByTitle("add-button"));
        const timeInput = screen.getByTitle("time-input");
        fireEvent.change(timeInput, { target: { value: negativeValue.toString() } });
        fireEvent.click(screen.getByTitle("submit-button"));
        expect(mockOnAddNewNote).not.toHaveBeenCalled();
      })
    );

    // Réinitialise le mock pour le test suivant
    mockOnAddNewNote.mockReset();

    // Teste des valeurs positives
    fc.property(fc.integer({ min: 2 }), (positiveValue) => {
      fireEvent.click(screen.getByTitle("add-button"));
      const timeInput = screen.getByTitle("time-input");
      fireEvent.change(timeInput, { target: { value: positiveValue.toString() } });
      fireEvent.click(screen.getByTitle("submit-button"));
      expect(mockOnAddNewNote).toHaveBeenCalled();
    });
  });

  test("check if value of add-textarea input is not empty", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    fireEvent.click(screen.getByTitle("add-button"));
    const textInput = screen.getByTitle("add-textarea");
    fireEvent.change(textInput, { target: { value: "" } });
    fireEvent.click(screen.getByTitle("submit-button"));
    expect(mockOnAddNewNote).not.toHaveBeenCalled();
  });

  test("check if value of add-textarea input not exceed 256", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    fireEvent.click(screen.getByTitle("add-button"));
    const textInput = screen.getByTitle("add-textarea");
    fireEvent.change(textInput, {
      target: {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut eros non ipsum vehicula dignissim. Nullam eget lacus nec nulla volutpat hendrerit. Proin luctus, turpis ac feugiat tincidunt, orci erat auctor massa, non volutpat purus lacus eu lorem coucou mattheo."
      },
    });
    fireEvent.click(screen.getByTitle("submit-button"));
    expect(mockOnAddNewNote).not.toHaveBeenCalled();
  });

  test("renders the list of notes correctly", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    expect(screen.getByText("Good morning! ☀️")).toBeInTheDocument();
    expect(screen.getByText("First Task")).toBeInTheDocument();
    expect(screen.getByText("Second Task")).toBeInTheDocument();
  });

  test("calls onAddNewNote when a new note is submitted", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    fireEvent.click(screen.getByTitle("add-button"));
    fireEvent.change(screen.getByTitle("add-textarea"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByTitle("submit-button"));
    expect(mockOnAddNewNote).toHaveBeenCalled();
  });

  test("calls onCheckNote when a note is toggled", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    expect(mockOnCheckNote).toHaveBeenCalledWith(mockNotes[0]);
  });

  test("calls onRemoveNote when a note is deleted", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    const deleteButton = screen.getAllByRole("button", { name: /trash/i })[0];
    fireEvent.click(deleteButton);

    expect(mockOnRemoveNote).toHaveBeenCalledWith(1);
  });

  test("displays the correct number of notes", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    const noteElements = screen.getAllByRole("checkbox");
    expect(noteElements).toHaveLength(mockNotes.length);
  });

  test("displays the correct text for each note", () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    mockNotes.forEach(note => {
      expect(screen.getByText(note.text)).toBeInTheDocument();
    });
  });

  test('make snapshot', () => {
    const { asFragment } = render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('check color of button mins', () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    fireEvent.click(screen.getByTitle("add-button"));
    const minsButton = screen.getByTitle("mins-button");
    const hrsButton = screen.getByTitle("hrs-button");
    fireEvent.click(minsButton);
    expect(minsButton).toHaveClass("bg-white");
    expect(hrsButton).not.toHaveClass("bg-white");
  });

  test('check color of button hrs', () => {
    render(
      <VanishList
        notes={mockNotes}
        onAddNewNote={mockOnAddNewNote}
        onCheckNote={mockOnCheckNote}
        onRemoveNote={mockOnRemoveNote}
      />
    );

    fireEvent.click(screen.getByTitle("add-button"));
    const hrsButton = screen.getByTitle("hrs-button");
    const minsButton = screen.getByTitle("mins-button");
    fireEvent.click(hrsButton);
    expect(hrsButton).toHaveClass("bg-white");
    expect(minsButton).not.toHaveClass("bg-white");
  });
});