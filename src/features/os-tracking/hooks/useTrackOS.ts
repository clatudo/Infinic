"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchServiceOrderByNumber } from "../services/osService";
import { ServiceOrderPublicView } from "@/types/database.types";

export function useTrackOS(orderNumber: string) {
    const queryKey = ["service-order", orderNumber.trim().toUpperCase()];

    return useQuery<ServiceOrderPublicView | null, Error>({
        queryKey,
        queryFn: () => fetchServiceOrderByNumber(orderNumber),
        enabled: Boolean(orderNumber.trim()),
        staleTime: 1000 * 60 * 2, // 2 minutos de cache fresco
        retry: 1,
    });
}