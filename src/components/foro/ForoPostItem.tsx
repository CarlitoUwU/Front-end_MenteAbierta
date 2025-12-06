import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { COLORS } from "../../constants/colors";

type ForoPostItemProps = {
  user: string;
  name: string;
  time: string;
  categoria: string;
  title: string;
  text: string;
  likes: number;
  replies: number;
  onLike?: () => void;
  liked?: boolean;
}

export const ForoPostItem = ({ user, name, time, categoria, title, text, likes, replies, onLike, liked }: ForoPostItemProps) => {
  return (
    <div
      className="w-full p-5 rounded-xl shadow-md"
      style={{ backgroundColor: COLORS.claro }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
          style={{
            backgroundColor: COLORS.azul_claro,
            color: COLORS.azul_oscuro,
          }}
        >
          {user}
        </div>
        <div>
          <p className="font-semibold" style={{ color: COLORS.azul_oscuro }}>
            {name}
          </p>
          <span className="text-xs" style={{ color: COLORS.texto_medio }}>
            {time} · {categoria}
          </span>
        </div>
      </div>

      <h2
        className="font-bold text-lg mb-2"
        style={{ color: COLORS.azul_semi }}
      >
        {title}
      </h2>

      <p className="mb-4" style={{ color: COLORS.texto_oscuro }}>
        {text}
      </p>

      <div
        className="flex gap-6 text-sm"
        style={{ color: COLORS.texto_medio }}
      >
        <button
          onClick={onLike}
          className={`flex items-center gap-1 cursor-pointer transition-colors ${
            liked ? 'text-red-500' : 'hover:text-red-500'
          }`}
        >
          {liked ? <FaHeart /> : <FiHeart />} {likes}
        </button>
        <span className="flex items-center gap-1">
          <FiMessageCircle /> {replies} respuestas
        </span>
      </div>
    </div>
  );
};