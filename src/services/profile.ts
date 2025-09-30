import { supabase } from './supabase';

export async function updateProfile(profile: { id: string; username?: string; full_name?: string; avatar_url?: string; bio?: string; interests?: string[] }) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile);
  return { data, error };
}

export async function fetchSwipeableProfiles(currentUserId: string, limit = 50) {
  // 1) get swiped ids
  const { data: swipedRows }: any = await supabase
    .from('swipes')
    .select('swiped_id')
    .eq('swiper_id', currentUserId);

  const swipedIds = (swipedRows || []).map((r: any) => r.swiped_id);

  // 2) get matched partner ids
  const { data: matchRows }: any = await supabase
    .from('matches')
    .select('user1_id, user2_id')
    .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`);

  const matchedIds = new Set<string>();
  (matchRows || []).forEach((m: any) => {
    matchedIds.add(m.user1_id === currentUserId ? m.user2_id : m.user1_id);
  });

  // 3) exclude current user + swiped + matched
  const excludeIds = [currentUserId, ...swipedIds, ...Array.from(matchedIds)];
  // Supabase "not in" uses the 'not' operator with 'in'
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .not('id', 'in', `(${excludeIds.map((id) => `'${id}'`).join(',')})`)
    .limit(limit);

  return { data, error };
}
