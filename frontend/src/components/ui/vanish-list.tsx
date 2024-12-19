import { AnimatePresence, useAnimate, usePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiClock, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { AddNote, Note } from "../../types/note-type";

export const VanishList = ({
  notes,
  onAddNewNote,
  onCheckNote,
  onRemoveNote,
}: {
  notes: Note[],
  onAddNewNote: (note: AddNote) => void,
  onCheckNote: (note: Note) => void,
  onRemoveNote: (id: number) => void,
}) => {
  return (
    <section
      className="min-h-screen bg-zinc-950 py-24"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="mx-auto w-full max-w-xl px-4">
        <Header />
        <Todos
          removeElement={onRemoveNote}
          notes={notes}
          handleCheck={onCheckNote}
        />
      </div>
      <Form onAddNewNote={onAddNewNote} />
    </section>
  );
};

const Header = () => {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-medium text-white">Good morning! ☀️</h1>
      <p className="text-zinc-400">Let's see what we've got to do today.</p>
    </div>
  );
};

const Form = ({ onAddNewNote }: { onAddNewNote: (note: Note) => void }) => {
  const [visible, setVisible] = useState(false);

  const [time, setTime] = useState(15);
  const [text, setText] = useState("");
  const [unit, setUnit] = useState<"mins" | "hrs">("mins");

  const handleSubmit = () => {
    if (!text.length) {
      return;
    }

    onAddNewNote({
      id: Math.random(),
      text,
      checked: false,
      time: `${time} ${unit}`,
    })

    setTime(15);
    setText("");
    setUnit("mins");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
      <AnimatePresence>
        {visible && (
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What do you need to do?"
              className="h-24 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
              required
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  className="w-24 rounded bg-zinc-700 px-1.5 py-1 text-sm text-zinc-50 focus:outline-0"
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setUnit("mins")}
                  className={`rounded px-1.5 py-1 text-xs ${unit === "mins" ? "bg-white text-zinc-950" : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"}`}
                >
                  mins
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("hrs")}
                  className={`rounded px-1.5 py-1 text-xs ${unit === "hrs" ? "bg-white text-zinc-950" : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"}`}
                >
                  hrs
                </button>
              </div>
              <button
                type="submit"
                className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
              >
                Submit
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={() => setVisible((pv) => !pv)}
        className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
      >
        <FiPlus
          className={`transition-transform ${visible ? "rotate-45" : "rotate-0"}`}
        />
      </button>
    </div>
  );
};

const Todos = ({
  notes,
  handleCheck,
  removeElement,
}: {
  notes: Note[];
  handleCheck: (note: Note) => void;
  removeElement: (id: number) => void;
}) => {
  return (
    <div className="w-full space-y-3">
      <AnimatePresence>
        {notes.map((t: Note) => (
          <Todo
            handleCheck={(id) => handleCheck(t.id === id ? t : t)}
            removeElement={removeElement}
            id={t.id}
            key={t.id}
            checked={t.checked}
            time={t.time}
          >
            {t.text}
          </Todo>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default VanishList;

const Todo = ({
  removeElement,
  handleCheck,
  id,
  children,
  checked,
  time,
}: {
  removeElement: (id: number) => void;
  handleCheck: (id: number) => void;
  id: number;
  children: string;
  checked: boolean;
  time: string;
}) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          "p",
          {
            color: checked ? "#6ee7b7" : "#fca5a5",
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );
        await animate(
          scope.current,
          {
            scale: 1.025,
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: checked ? 24 : -24,
          },
          {
            delay: 0.75,
          }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent, animate, checked, safeToRemove, scope]);

  return (
    <motion.div
      ref={scope}
      layout
      className="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck(id)}
        className="size-4 accent-indigo-400"
      />

      <p
        className={`text-white transition-colors ${checked && "text-zinc-400"}`}
      >
        {children}
      </p>
      <div className="ml-auto flex gap-1.5">
        <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
          <FiClock />
          <span>{time}</span>
        </div>
        <button
          onClick={() => removeElement(id)}
          className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};