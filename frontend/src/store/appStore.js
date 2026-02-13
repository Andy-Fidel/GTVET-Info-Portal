import { create } from 'zustand'

export const useAppStore = create((set) => ({
  loading: false,
  error: null,
  institutions: [],
  programs: [],
  announcements: [],
  user: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setInstitutions: (institutions) => set({ institutions }),
  setPrograms: (programs) => set({ programs }),
  setAnnouncements: (announcements) => set({ announcements }),
  unreadMessagesCount: 0,
  setUser: (user) => set({ user }),
  setUnreadMessagesCount: (count) => set({ unreadMessagesCount: count }),

  clearError: () => set({ error: null })
}))
