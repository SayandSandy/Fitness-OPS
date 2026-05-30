"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Login } from "./Login";
import { useUserStore } from "@/lib/store/useUserStore";
import { useWorkoutStore } from "@/lib/store/useWorkoutStore";
import { useStreakStore } from "@/lib/store/useStreakStore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch user store data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          useUserStore.getState().loadData(userData);
        } else {
          // New user, create empty/initial doc
          const initialState = useUserStore.getState();
          await setDoc(userDocRef, {
            xp: initialState.xp,
            level: initialState.level,
            levelName: initialState.levelName,
            gems: initialState.gems,
            theme: initialState.theme,
            unlockedThemes: initialState.unlockedThemes,
          }, { merge: true });
        }

        // Fetch workout store data from Firestore
        const workoutDocRef = doc(db, "users", currentUser.uid, "workouts", "state");
        const workoutDocSnap = await getDoc(workoutDocRef);

        if (workoutDocSnap.exists()) {
          const workoutData = workoutDocSnap.data();
          useWorkoutStore.getState().loadData(workoutData);
        }

        // Fetch streak store data from Firestore
        const streakDocRef = doc(db, "users", currentUser.uid, "streak", "state");
        const streakDocSnap = await getDoc(streakDocRef);

        if (streakDocSnap.exists()) {
          const streakData = streakDocSnap.data();
          useStreakStore.getState().loadData(streakData);
        }
      } else {
        // Reset stores when logged out
        useUserStore.getState().reset();
        useWorkoutStore.getState().reset();
        useStreakStore.getState().reset();
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-theme-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
