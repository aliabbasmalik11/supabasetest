import type { NextPage } from "next";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/features/Profile";

const Home: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <div>
          <div>
            <h1>Supabase Auth + Storage</h1>
            <p>
              Experience our Auth and Storage through a simple profile
              management example. Create a user profile and upload an avatar
              image. Fast, simple, secure.
            </p>
          </div>
          <div>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
          </div>
        </div>
      ) : (
        <Account session={session} />
      )}
    </div>
  );
};

export default Home;
