import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";






export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard')

  }

  return (
    <div>
      {/* landing page for non-signined users and redirection logic for signined users */}


      hiiii there this is landing page
    </div>
  );
}
