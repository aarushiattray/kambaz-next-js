import { redirect } from "next/navigation";

export default async function AccountPage({ params, }: { params: Promise<{ cid: string }>; }) {
 const { cid } = await params;
 redirect("/Account/Signin");
}



