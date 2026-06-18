export interface EnquiryEvent {
  timestamp: string;
  ip: string;
  formType: string;
  status: "success" | "failed" | "queued";
  error?: string;
  durationMs: number;
  refId?: string;
}

export interface UploadEvent {
  timestamp: string;
  ip: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: "success" | "failed";
  error?: string;
}

export function logEnquiry(event: EnquiryEvent): void {
  console.log(JSON.stringify({ type: "enquiry", ...event }));
}

export function logUpload(event: UploadEvent): void {
  console.log(JSON.stringify({ type: "upload", ...event }));
}
