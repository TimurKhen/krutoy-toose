export interface Member {
  id: number;
  local_rating: number;
}

export interface TeamInterface {
  id: number;
  name: string;
  head_id: number;
  members: Member[];
  total_budget: number;
  global_rating: number;
  min_budget: number;
  max_members_count: number;
}
