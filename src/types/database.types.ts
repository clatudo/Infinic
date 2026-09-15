export interface ServiceOrder {
    id: string;
    order_number: string;
    customer_name: string;
    customer_phone: string;
    device_brand: string;
    device_model: string;
    reported_defect: string;
    technical_diagnosis: string | null;
    status: "received" | "analyzing" | "waiting_approval" | "repairing" | "ready" | "delivered";
    warranty_until: string | null;
    total_amount: number | null;
    created_at: string;
    updated_at: string;
}

export interface ServiceOrderPublicView {
    order_number: string;
    customer_name: string;
    device_brand: string;
    device_model: string;
    reported_defect: string;
    technical_diagnosis: string | null;
    status: "received" | "analyzing" | "waiting_approval" | "repairing" | "ready" | "delivered";
    warranty_until: string | null;
    created_at: string;
    updated_at: string;
}


export interface LeadCapture {
    id: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string | null;
    device_brand: string;
    device_model: string;
    issue_description: string;
    service_type: "store_dropoff" | "courier_pickup" | "home_service" | "b2b_corporate";
    created_at: string;
}

export interface Database {
    public: {
        Tables: {
            service_orders: {
                Row: ServiceOrder;
                Insert: Omit<ServiceOrder, "id" | "created_at" | "updated_at">;
                Update: Partial<Omit<ServiceOrder, "id">>;
            };
            lead_captures: {
                Row: LeadCapture;
                Insert: Omit<LeadCapture, "id" | "created_at">;
                Update: Partial<Omit<LeadCapture, "id">>;
            };
        };
        Functions: {
            get_service_order_by_number: {
                Args: { p_order_number: string };
                Returns: ServiceOrder[];
            };
        };
    };
}