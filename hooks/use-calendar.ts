import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as calendarApi from "@/lib/api/calendar";
import type { CalendarEvent } from "@/types/calendar";

export function useEvents(from: Date, to: Date) {
  return useQuery({
    queryKey: [
      "events",
      from.toISOString().slice(0, 10),
      to.toISOString().slice(0, 10),
    ],
    queryFn: () => calendarApi.getEventsRequest(from, to),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calendarApi.createEventRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
}
