import Link from "next/link";

export default function AccountNavigation() {
  return (
    <nav id="wd-account-navigation" style={{ lineHeight: 1.8 }}>
      <Link href="/account/signin">Signin</Link><br />
      <Link href="/account/signup">Signup</Link><br />
      <Link href="/account/profile">Profile</Link>
    </nav>
  );
}