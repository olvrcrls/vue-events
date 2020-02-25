export const namespaced = true;

export const state = {
  notifications: []
};

export const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification);
  },

  remove({ commit }, notification) {
    commit("DELETE", notification);
  }
};

let nextId = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({ ...notification, id: nextId++ });
  },

  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    );
  }
};

export const getters = {};
