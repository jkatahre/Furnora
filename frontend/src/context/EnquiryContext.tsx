import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import EnquiryDialog from "../components/EnquiryDialog";
import type { Product } from "../types/product";

export type EnquiryIntent = "price" | "enquiry" | "custom" | "visit" | "delivery";

export interface EnquiryRequest {
  intent?: EnquiryIntent;
  product?: Product;
}

const EnquiryContext = createContext<(request?: EnquiryRequest) => void>(() => {});

/** Lets any button open the enquiry form: `const enquire = useEnquiry(); enquire({ intent: "custom" })`. */
export function useEnquiry() {
  return useContext(EnquiryContext);
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<EnquiryRequest | null>(null);
  const open = useCallback((r: EnquiryRequest = {}) => setRequest(r), []);
  return (
    <EnquiryContext.Provider value={open}>
      {children}
      {request && <EnquiryDialog request={request} onClose={() => setRequest(null)} />}
    </EnquiryContext.Provider>
  );
}
