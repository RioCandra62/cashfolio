import { X } from "lucide-react";

export default function AddSaving({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <form className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col rounded-3xl">
        <div className="p-6 pb-2 border-b border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Saving</h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-sm font-semibold text-gray-700">
            Saving Title
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl"
            placeholder="e.g. Laptop"
          />
        </div>
      </form>
    </div>
  );
}
