"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState, useContext } from "react";

function Provider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        createOrFetchUser(session.user);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        createOrFetchUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const createOrFetchUser = async (user) => {
    try {
      console.log("Fetching user with email:", user.email);
      
      const { data: Users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email);

      if (error) {
        console.error("Error fetching user:", JSON.stringify(error, null, 2));
        console.error("Error code:", error?.code);
        console.error("Error message:", error?.message);
        console.error("Error details:", error?.details);
        return;
      }

      console.log("Found users:", Users);

      if (!Users || Users.length === 0) {
        console.log("Creating new user...");
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              id: user.id,
              full_name: user.user_metadata?.name || user.user_metadata?.full_name,
              email: user.email,
              avatar_url: user.user_metadata?.picture || user.user_metadata?.avatar_url,
            },
          ])
          .select();
        
        if (insertError) {
          console.error("Error inserting user:", JSON.stringify(insertError, null, 2));
          return;
        }
        console.log("New user created:", newUser[0]);
        setUser(newUser[0]);
        return;
      }

      console.log("Setting existing user:", Users[0]);
      setUser(Users[0]);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  return useContext(UserDetailContext);
};