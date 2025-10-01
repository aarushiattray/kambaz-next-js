import Link from "next/link";
import { FormControl } from "react-bootstrap"; 

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Signup</h3>
      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue="new_user"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        defaultValue="password123"
        className="mb-2"
      />
      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        defaultValue="password123"
        className="mb-2"
      />
      <Link
        id="wd-signup-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Signup
      </Link>
      <Link id="wd-signin-link" href="/Account/Signin">
        Signin
      </Link>
    </div>
  );
}
