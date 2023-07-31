import "./login.css";

export default function Login() {
  const submit = (e) => {
    e.preventDefault();

    const data = ["email", "password"];
    const values = data.map((el) => {
      if (e.target[el].value === "") {
        alert(el + " is required");
        return false;
      } else if (e.target[el].value.trim().includes("  ")) {
        alert("There can be not two space this username value");
        return false;
      } else {
        return e.target[el].value.trim();
      }
    });
    if (!values.includes(false)) {
      fetch("http://localhost:4000/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: values[0],
          password: values[1],
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.message);
          }
          if (data.message === "Successfully Login") {
            localStorage.setItem("token", data.token);
            window.location = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={submit} action="" method="">
            <div className="loginBox">
              <input
                type="email"
                placeholder=" Email... "
                className="loginInput"
                name="email"
              />
              <input
                type="password"
                placeholder=" Password... "
                className="loginInput"
                name="password"
              />
              <button className="loginButton">Log In</button>
              <span className="loginForgot">Forgot password</span>
              <button
                type="button"
                className="loginRegisterButton"
                onClick={() => {
                  window.location = "/register";
                }}
              >
                Create a new account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
