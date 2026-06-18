// ─── Motor ───────────────────────────────────────────────────────────────────

export type MotorCategory =
  | "Auto"
  | "Bike"
  | "Car"
  | "CPA"
  | "Commercial Vehicle"
  | "Private Car";

export interface MotorFormData {
  name: string;
  mobile: string;
  email: string;
  pincode: string;
  category: MotorCategory;
  vehicleNumber: string;
  previousPolicy?: File | null;
}

// ─── Health Individual ────────────────────────────────────────────────────────

export interface HealthIndividualFormData {
  name: string;
  mobile: string;
  dob: string;
  email: string;
  pincode: string;
  preExistingDisease: "yes" | "no";
}

// ─── Health Floater ───────────────────────────────────────────────────────────

export type FloaterMemberKey =
  | "self"
  | "spouse"
  | "son1"
  | "son2"
  | "daughter1"
  | "daughter2"
  | "mother"
  | "father"
  | "motherInLaw"
  | "fatherInLaw";

export interface MemberData {
  key: FloaterMemberKey;
  label: string;
  included: boolean;
  ageOrDob: string;
  ped: "yes" | "no" | "";
}

export interface HealthFloaterFormData {
  name: string;
  mobile: string;
  email: string;
  pincode: string;
  members: MemberData[];
}

// ─── Health Group ─────────────────────────────────────────────────────────────

export interface HealthGroupFormData {
  companyName: string;
  mobile: string;
  numberOfEmployees: string;
  email: string;
  pincode: string;
}

// ─── Travel ───────────────────────────────────────────────────────────────────

export type TravelCategory = "Business/Leisure" | "Corporate";
export type TravelType =
  | "Including USA & Canada"
  | "Excluding USA & Canada";

export interface TravelFormData {
  name: string;
  mobile: string;
  email: string;
  pincode: string;
  category: TravelCategory;
  travelType: TravelType;
}

// ─── Standard (Life, Agriculture, Fire, Credit, Engineering, Liability,
//              Marine, Miscellaneous, Personal Accident, Surety) ──────────────

export type StandardInsuranceType =
  | "Life"
  | "Agriculture"
  | "Fire"
  | "Credit"
  | "Engineering"
  | "Liability"
  | "Marine"
  | "Miscellaneous"
  | "Personal Accident"
  | "Surety";

export interface StandardFormData {
  name: string;
  mobile: string;
  email: string;
  pincode: string;
  category: string;
}

// ─── Enquiry Payload (union sent to API) ─────────────────────────────────────

export type EnquiryPayload =
  | ({ formType: "motor" } & MotorFormData)
  | ({ formType: "health-individual" } & HealthIndividualFormData)
  | ({ formType: "health-floater" } & HealthFloaterFormData)
  | ({ formType: "health-group" } & HealthGroupFormData)
  | ({ formType: "travel" } & TravelFormData)
  | ({ formType: StandardInsuranceType } & StandardFormData);
