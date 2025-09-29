import defaultSettings from '../settings.json';
import { create } from 'zustand';

export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    name?: string;
    avatar?: string;
    email?: string;
    permissions: Record<string, string[]>;
  };
  userLoading?: boolean;
  updateUserInfo?: (data: any) => void
  updateSettings?: (data: any) => void
}

export const useAppStore = create<GlobalState>((set, get) => ({
  settings: defaultSettings,
  updateUserInfo(payload) {
    const { userInfo = get().userInfo, userLoading } = payload
    set({
      userInfo,
      userLoading
    })
  },
  updateSettings(settings) {
    set({
      settings
    })
  }
}))