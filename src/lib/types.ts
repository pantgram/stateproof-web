export interface OrganizationResponse {
  id: string;
  name: string;
  created_at: string;
}

export interface UserResponse {
  id: string;
  organization_id: string;
  email: string;
  full_name: string | null;
  status: string;
  role: string;
  created_at: string;
}

export interface UserMeResponse {
  id: string;
  email: string;
  full_name: string | null;
  status: string;
  role: string;
  organization: OrganizationResponse;
}

export interface UserSignup {
  organization_name: string;
  email: string;
  password: string;
  full_name?: string | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface SignupResponse {
  status: string;
  message: string;
  access_token: string | null;
  refresh_token: string | null;
  token_type: string;
  expires_in: number | null;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export type LoginResponse = TokenResponse;
export type RefreshResponse = TokenResponse;

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  reset_token?: string | null;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface TokenRequest {
  api_key: string;
}

export interface ApproveResponse {
  message: string;
  user: UserResponse;
}

export interface ClientCreate {
  name: string;
}

export interface ClientResponse {
  id: string;
  organization_id: string;
  name: string;
  api_key: string;
  is_active: boolean;
  created_at: string;
}

export interface ClientListResponse {
  clients: ClientResponse[];
  total: number;
}

export interface EventInput {
  sequence_no: number;
  payload: Record<string, unknown>;
}

export interface EventPayload {
  executor_type: string;
  event_type: string;
  timestamp: string;
  action: string;
  data?: Record<string, unknown>;
}

export interface VerifyEventRaw {
  sequence_no: number;
  payload: Record<string, unknown>;
}

export interface ProofStep {
  hash: string;
  direction: "left" | "right";
}

export interface WorkflowCreate {
  name: string;
  meta?: Record<string, unknown> | null;
}

export interface WorkflowUpdate {
  name?: string | null;
  meta?: Record<string, unknown> | null;
}

export interface WorkflowResponse {
  id: string;
  organization_id: string;
  name: string;
  hex_root: string;
  created_at: string;
  meta: Record<string, unknown> | null;
}

export interface WorkflowListResponse {
  workflows: WorkflowResponse[];
  total: number;
}

export interface SessionCreate {
  events: EventInput[];
  status?: "pending" | "completed" | "failed";
  started_at: string;
  ended_at?: string | null;
  meta?: Record<string, unknown> | null;
}

export interface SessionResponse {
  id: string;
  workflow_id: string;
  session_hash: string;
  status: string;
  started_at: string;
  ended_at: string | null;
}

export interface SessionListResponse {
  sessions: SessionResponse[];
  total: number;
}

export interface SessionSubmitResponse {
  id: string;
  workflow_id: string;
  session_hash: string;
  hex_root: string;
  status: string;
}

export interface SessionProofResponse {
  session_id: string;
  leaf_hash: string;
  proof_path: ProofStep[];
  hex_root: string;
}

export interface VerifySessionItem {
  session_id: string;
  events: VerifyEventRaw[];
}

export interface SessionVerifyResult {
  session_id: string;
  valid: boolean;
  reason: string | null;
}

export interface VerifyWorkflowRequest {
  sessions: VerifySessionItem[];
}

export interface VerifyWorkflowResponse {
  workflow_id: string;
  hex_root: string;
  results: SessionVerifyResult[];
  all_valid: boolean;
}

export interface EventProofResponse {
  session_id: string;
  sequence_no: number;
  event_hash: string;
  proof_path: ProofStep[];
  session_hash: string;
}

export interface StatelessVerifyRequest {
  leaf_hash: string;
  proof_path: ProofStep[];
  hex_root: string;
}

export interface StatelessVerifyResponse {
  valid: boolean;
}

export interface WorkflowTreeNodeResponse {
  id: string;
  workflow_id: string;
  hash: string;
  left_hash: string | null;
  right_hash: string | null;
  parent_hash: string | null;
  level: number;
  position: number;
  is_leaf: boolean;
  session_id: string | null;
}

export interface WorkflowTreeNodeListResponse {
  workflow_tree_nodes: WorkflowTreeNodeResponse[];
  total: number;
}
