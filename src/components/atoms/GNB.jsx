import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../../store/slices/userSlice";
import Photo from "./Photo";
import { useState } from "react";
import Modal from "../moleclules/Modal";
import { staticServerUri } from "../../constants/serverUri";

const GNB = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  return (
    <header>
      <div className="border-b border-gray-300 p-3 lg:px-10 lg:py-5">
        <div className="m-auto flex max-w-[1280px] items-center justify-between">
          <Link to={staticServerUri + "/"} replace={true}>
            <Photo
              src={staticServerUri + "/logoKakao.png"}
              alt="logoKakao"
              className={"w-[80px] lg:w-[100px]"}
            ></Photo>
          </Link>
          <div className="flex items-center justify-evenly">
            {email ? (
              <Link to={staticServerUri + "/cart"}>
                <Photo
                  src={staticServerUri + "/cart.png"}
                  alt="cart"
                  className={"w-[30px] lg:w-[40px]"}
                />
              </Link>
            ) : (
              <Link
                onClick={() => {
                  setModal(true);
                }}
              >
                <Photo
                  src={staticServerUri + "/cart.png"}
                  alt="cart"
                  className={"w-[30px] lg:w-[40px]"}
                />
              </Link>
            )}

            <span className="ml-2 mr-3 text-[20px] text-[rgba(34,34,34,.2)] lg:ml-5 lg:mr-6">
              |
            </span>
            {!email ? (
              <Link className="text-[13px]" to={staticServerUri + "/login"}>
                로그인
              </Link>
            ) : (
              <Link
                className="text-[13px]"
                onClick={() => {
                  dispatch(setEmail(null));
                  navigate(staticServerUri + "/", { replace: true });
                  window.location.reload();
                }}
              >
                로그아웃
              </Link>
            )}
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          contentText={"로그인이 필요한 메뉴입니다."}
          type={"two"}
          buttonText={"로그인"}
          secondButton={"취소"}
          onClick={() => {
            navigate(staticServerUri + "/login");
          }}
          setModal={setModal}
        ></Modal>
      )}
    </header>
  );
};

export default GNB;
