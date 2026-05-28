import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthReceiver = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Save token
      localStorage.setItem("token", token);

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    } else {
      // If no token, go back to login/home
      navigate("/", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-lg font-semibold">
        Authenticating... Please wait.
      </div>
    </div>
  );
};

export default AuthReceiver;
