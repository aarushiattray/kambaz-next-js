import { redirect } from "next/navigation";

export default async function AccountPage({
  params,
}: {
  params: {}; // mimic CoursesPage signature
}) {
  redirect("/Account/Signin"); // redirect to Signin page
}



