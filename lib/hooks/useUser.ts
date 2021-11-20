import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { User } from "../../pages/api/user";
import { fetcher } from "@lib/util";

type UserHook = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

export const useUser = ({ redirectTo, redirectIfFound }: UserHook = {}) => {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user", fetcher);
  const router = useRouter();

  useEffect(() => {
    // If we have no re-direct or user has not loaded yet, do nothing.
    if (!redirectTo || !user) return;

    // If redirect if found is set, the redirect if the user is logged in,
    // otherwise re-direct if the user is not logged in.
    const shouldRedirect = redirectIfFound ? user.isLoggedIn : !user.isLoggedIn;
    if (shouldRedirect) {
      router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo, router]);

  return { user, mutateUser };
};

export default useUser;
