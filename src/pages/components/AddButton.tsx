import { HiOutlineClipboardList } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface AddButtonProps {
  to: string;
}

function AddButton({ to }: AddButtonProps) {
  return (
    <div>
      <Link to={to}>
        <button className="flex items-center gap-2 bg-[#1957A4] hover:bg-[#1957A4] text-white text-sm font-medium px-4 py-2 rounded-md cursor-pointer">
          <HiOutlineClipboardList className="text-white text-lg" /> Add
        </button>
      </Link>
    </div>
  );
}

export default AddButton;