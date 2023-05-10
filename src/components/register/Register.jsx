import "./register.css";

export default function Register() {
  const submit = (e) => {
    e.preventDefault();
    const data = ["username", "email", "password", "passwordAgain"];
    if (
      !e.target["password"].value
        .trim()
        .match(/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)[A-Za-z0-9!#+%]+$/g)
    ) {
      return alert("Password not valid");
    }
    if (e.target["password"].value.length < 8) {
      return alert("Password must be longer than 8 characters");
    }
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
      if (e.target["password"].value !== e.target["passwordAgain"].value) {
        alert("Password must be the same");
        return;
      }

      fetch("https://54.234.23.89:4000/user/signup", {
        method: "POST",
        body: JSON.stringify({
          username: values[0],
          email: values[1],
          password: values[2],
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
          if (data.message === "Successfully registered") {
            window.location = "/login";
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
          <form action="" method="post" onSubmit={submit}>
            <div className="loginBox">
              <input
                type="text"
                placeholder=" Username... "
                className="loginInput"
                name="username"
              />
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
              <input
                type="password"
                placeholder=" Password again... "
                className="loginInput"
                name="passwordAgain"
              />
              <button type="submit" className="loginButton">
                Sign Up
              </button>
              <button
                type="button"
                className="loginRegisterButton"
                onClick={() => {
                  window.location = "/login";
                }}
              >
                Log into Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
