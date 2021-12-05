import { XIcon } from "@heroicons/react/outline";

function PopUp({
  visible,
  onClick,
  onSubmit,
  updateGrade,
  updateComment,
  loading,
  error,
  canSubmit,
}: any) {
  return (
    <div
      className={`overflow-auto \
                     z-30 \
                     h-2/6 \
                     w-4/12 \
                     mx-auto \
                     p-6 \
                     border \
                     rounded-xl \
                     bg-white \
                     text-left \
                     fixed \
                     inset-y-96 \
                     inset-x-96
                     ${visible ? "visible" : "invisible"}`}
    >
      <XIcon
        className="w-4 h-4"
        style={{
          color: "green",
          cursor: "pointer",
          position: "relative",
          top: "-5px",
          left: "580px",
        }}
        onClick={onClick}
      />
      <form onSubmit={onSubmit}>
        <div className="relative w-full mb-3">
          <input
            type="number"
            className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none"
            placeholder="Betyg: (0 - 5)"
            onChange={(e) => updateGrade(e.target.value)}
          />
        </div>

        <div className="relative w-full mb-3">
          <input
            type="text"
            className="input w-full rounded-lg px-4 py-6 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none h-30"
            placeholder="Kommentar"
            onChange={(e) => updateComment(e.target.value)}
          />
        </div>

        <button
          className={`w-full text-center bg-green-500 hover:bg-green-700 rounded-lg text-white py-2 px-4 font-medium ${
            loading || !canSubmit ? "disable opacity-50 hover:bg-green-500" : ""
          } ${!canSubmit && "cursor-not-allowed"}`}
          disabled={loading || !canSubmit}
        >
          {loading ? "Skapar recension..." : "Skapa recension"}
        </button>
        {error && (
          <span className="bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border mt-2 w-full">
            {error}
          </span>
        )}
      </form>
    </div>
  );
}

export default PopUp;
