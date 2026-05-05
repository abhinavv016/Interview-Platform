import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionApi, type CreateSessionPayload } from "../api/sessions";
import { AxiosError } from "axios";

interface ApiError {
  message: string;
}

const queryKeys = {
  active: ["sessions", "active"] as const,
  recent: ["sessions", "recent"] as const,
  detail: (id: string) => ["sessions", id] as const,
};

export const useActiveSessions = () =>
  useQuery({
    queryKey: queryKeys.active,
    queryFn: sessionApi.getActiveSessions,
  });

export const useMyRecentSessions = () =>
  useQuery({
    queryKey: queryKeys.recent,
    queryFn: sessionApi.getMyRecentSessions,
  });

export const useSessionById = (id: string | undefined) =>
  useQuery({
    enabled: Boolean(id),
    queryKey: queryKeys.detail(id!),
    queryFn: () => sessionApi.getSessionById(id!),
    refetchInterval: 5000,
  });

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  // <Data, Error, Variables>
  return useMutation<any, AxiosError<ApiError>, CreateSessionPayload>({
    mutationFn: sessionApi.createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.active });
      queryClient.invalidateQueries({ queryKey: queryKeys.recent });
    },
  });
};

export const useJoinSession = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError<ApiError>, string>({
    mutationFn: (id: string) => sessionApi.joinSession(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.active });
    },
  });
};

export const useEndSession = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError<ApiError>, string>({
    mutationFn: (id: string) => sessionApi.endSession(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.active });
      queryClient.invalidateQueries({ queryKey: queryKeys.recent });
    },
  });
};