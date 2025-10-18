import { UTCDate } from '@date-fns/utc'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Contest } from '@/entities/contests'

const CONTEST_STORE_NAME = 'contest-store'

export const useContestStore = defineStore(CONTEST_STORE_NAME, () => {
  const contests = ref<Contest[]>([])

  function getContestById(id: number): Contest | undefined {
    return contests.value.find((contest)=> {
      return contest.id === id
    })
  }

  function getContestByName(name: string): Contest | undefined {
    return contests.value.find((contest)=> {
      return contest.title === name
    })
  }

  function saveAllContests(newContest: Contest[]): void {
    contests.value = newContest
  }

  function updateContest(updatedContest: Contest): void {
    contests.value = contests.value.map((contest) => {
      return contest.id === updatedContest.id ? updatedContest : contest
    })
  }

  function sortContestByNearestDate(contestsArr: Contest[]): Contest[] {
    if (!contestsArr || contestsArr.length === 0) {
      return []
    }

    const now = new UTCDate()

    return [...contestsArr].sort((a, b) => {
      const dateA = new Date(a.startDate)
      const dateB = new Date(b.startDate)

      const diffA = Math.abs(dateA.getTime() - now.getTime())
      const diffB = Math.abs(dateB.getTime() - now.getTime())

      return diffA - diffB
    })
  }

  const sortedContest = computed(() => {
    return sortContestByNearestDate(contests.value)
  })

  function clearContests(): void {
    contests.value = []
  }

  return {
    contests,
    sortedContest,
    getContestById,
    getContestByName,
    saveAllContests,
    updateContest,
    clearContests
  }
})