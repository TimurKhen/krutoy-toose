export interface UserResponse {
  team_id: number | null;
  balance: number;
  per_tap: number;
  purchased_items_id: number[];
  coin_path: string;
  global_rating: number;
}
