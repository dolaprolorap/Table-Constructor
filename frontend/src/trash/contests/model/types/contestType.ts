import type { AchievementCategory } from '@/entities/achievements/categories/@x/achievementSchemes'

import type { ContestStatuses } from '../ContestStatuses'

export interface Contest {
  id: number;
  title: string;
  description: string;
  categories: AchievementCategory[];
  startDate: Date;
  endDate: Date;
  status: ContestStatuses;
}

export type ContestAttributes = Omit<Contest, 'id' | 'status'>

export type NewContest = Partial<Omit<Contest, 'id' | 'status'>>;

