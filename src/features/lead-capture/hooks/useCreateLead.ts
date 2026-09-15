"use client";

import { useMutation } from "@tanstack/react-query";
import { createLead, CreateLeadPayload } from "../services/leadService";
import { LeadCapture } from "@/types/database.types";

export function useCreateLead() {
    return useMutation<LeadCapture, Error, CreateLeadPayload>({
        mutationFn: (payload: CreateLeadPayload) => createLead(payload),
    });
}