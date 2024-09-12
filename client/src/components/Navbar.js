import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../store/userSlice";

function Navbar(props) {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(removeUser());
    navigate("/");
  }

  return (
    <div className="w-full bg-transparent text-white fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-8 py-4 container">
        <Link to={"/"}>
          <h1 className="text-[30px] font-black cursor-pointer text-black">
            logi<span className="text-blue-800">Tracker</span>
          </h1>
        </Link>
        {user === "logged in" && (
          <nav className="flex font-bold text-[20px] gap-6">
            <Link to={"/top10"}>
              <p className="cursor-pointer text-black hover:text-blue-600">Top10</p>
            </Link>
            <Link to={"/trending"}>
              <p className="cursor-pointer text-black hover:text-blue-600">Trending</p>
            </Link>
            <Link to={"/watchlist"}>
              <p className="cursor-pointer text-black hover:text-blue-600">Watchlist</p>
            </Link>
            <Link to={"/news"}>
              <p className="cursor-pointer text-black hover:text-blue-600">News</p>
            </Link>
          </nav>
        )}
        <div className="flex gap-4">
          {user === "logged in" ? (
            <button
              onClick={handleClick}
              className="bg-blue-400 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg">
                  Login
                </button>
              </Link>
              <Link to={"/signin"}>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
