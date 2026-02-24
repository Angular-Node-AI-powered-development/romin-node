import type { UserPreferencesResponse, UserPreferencesUpdateBody } from './user-preferences.types.js';
import * as repo from './user-preferences.repository.js';
import { rowToResponse } from './user-preferences.model.js';

const DEFAULT_USER_KEY = 'default';

export async function get(userKey: string = DEFAULT_USER_KEY): Promise<UserPreferencesResponse | null> {
  const row = await repo.get(userKey);
  return row ? rowToResponse(row) : null;
}

export async function upsert(
  body: UserPreferencesUpdateBody,
  userKey: string = DEFAULT_USER_KEY
): Promise<UserPreferencesResponse> {
  const row = await repo.upsert(body, userKey);
  return rowToResponse(row);
}
