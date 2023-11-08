import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogined, setLogined] = useState(false);
  const [validate, setValidate] = useState(false);
  const shouldRedirect = isLogined || localStorage.getItem("jwtToken");

  const checkReCAPTCHA = () => {
    setValidate(true);
  };

  const handlSend = async (e) => {
    e.preventDefault();

    if (validate) {
      try {
        toast.loading("Loading...", {
          id: 1,
          style: {
            background: "#001D3D",
            color: "#fff",
          },
        });
        const response = await fetch(
          "https://backendv1-git-main-rhayrapetyan157-gmailcom.vercel.app/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        const data = await response.json();
        if (response.status === 200) {
          toast.success("ok", {
            id: 1,
            style: {
              background: "#001D3D",
              color: "#fff",
            },
          });
          const token = data.token;
          // const decodedToken = jwt_decode(token);
          // const userData = decodedToken;
          // setUserData(userData);
          localStorage.setItem("jwtToken", token);
          setLogined(true);
        } else {
          toast.error(data.message, { id: 1 });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(
        "Please complete the reCAPTCHA verification to proceed. Click the reCAPTCHA checkbox to confirm that you are not a robot."
      );
    }
  };
  return (
    <>
      <div className=" container mx-auto">
        <div className=" text-[12px] ml-[60px] mt-[40px]">
          <Link to={"/"} className=" mr-2">
            Home
          </Link>
          <FontAwesomeIcon icon={faAngleRight} className="text-black mr-2" />
          Login
          <h1 className="compuser text-[32px] font-bold mt-6">
            Customer Login
          </h1>
        </div>
        <div className="all flex justify-center p-12">
          {/* Login --------------------------------------------------------------------- */}
          <div
            className="
                bg-[#F5F7FF] w-[564px] h-[485.26px] flex justify-center items-center flex-col"
          >
            <div className="board w-[450px]">
              <h2 className=" font-bold">Registered Customers</h2>
              <div className=" flex items-center h-[70px]">
                <h3 className=" font-light text-[14px]">
                  If you have an account, sign in with your email address.
                </h3>
              </div>
              <div className=" h-[262px]">
                <form onSubmit={handlSend}>
                  <div className=" h-[88px]">
                    <p className=" mb-1 font-bold flex">
                      Login<p className=" text-[#C94D3F]">*</p>
                    </p>
                    <input
                      type="text"
                      placeholder="Your Login"
                      className=" p-4 w-full text-[#A2A6B0] font-light text-[14px]"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className=" h-[88px]">
                    <p className="mb-1 font-bold flex">
                      Password<p className=" text-[#C94D3F]">*</p>
                    </p>
                    <input
                      type="password"
                      placeholder="Your Password"
                      className=" p-4 w-full text-[#A2A6B0] font-light text-[14px]  "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-center">
                    <ReCAPTCHA
                      sitekey="6LcLaswoAAAAAEC6_D56G-guaozfDbrYhnCtlWea"
                      onChange={checkReCAPTCHA}
                    />
                  </div>
                  <button
                    type="submit"
                    className=" text-white font-semibold mt-2 text-[14px] h-[50px] w-full rounded-[40px] bg-[#0156FF]"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
          {shouldRedirect && <Navigate to="/dashboard" replace={true} />}

          {/* Login --------------------------------------------------------------------- */}

          {/* Registration ---------------------------------------------------------------*/}

          {/* <div className='bg-[#F5F7FF] w-[564px] mr-8 h-[415.26px] pt-8 flex items-center flex-col'>  
                    <div className=' w-[446px]'>
                        <h2 className=' font-bold'>New Customer?</h2>
                        <div className='h-[97px] mt-4 flex font-light text-[14px] flex-col'>
                            <ul>
                                <p>Creating an account has many benefits</p>      
                            </ul>
                                <div className=' mt-4'>
                                    <p>• Check out faster</p>
                                    <p>• Keep more than one address</p>
                                    <p>• Track orders and more</p>
                                </div>
                        </div>
                        <button 
                        className='mt-8 h-[50px] w-[208px] rounded-[40px] bg-[#0156FF] text-white font-semibold text-[14px]'
                        >Create An Account</button>
                    </div>
                    <div className=' h-[12vh]'></div>
                </div> */}
          {/* Registration ---------------------------------------------------------------*/}
        </div>
      </div>
    </>
  );
}
