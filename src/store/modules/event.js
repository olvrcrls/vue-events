import EventService from "@/services/EventService.js";
export const namespaced = true;
export const state = {
  events: [],
  eventsTotal: 0,
  perPage: 3,
  event: {}
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },

  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },

  SET_EVENT(state, event) {
    state.event = event;
  }
};

export const actions = {
  createEvent({ commit, rootState, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        let user = rootState.user.user;
        console.log(`User creating the event is ${user.name}`);
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: `Your event has been created`
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: `There was a problem creating an event: ${error.message}`
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },

  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit("SET_EVENTS", response.data);
        commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
        return response.data;
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: `There was a problem fetching events: ${error.message}`
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },

  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
          return response.data;
        })
        .catch(error => {
          const notification = {
            type: "error",
            message: `There was a problem fetching events ${error.message}`
          };
          dispatch("notification/add", notification, { root: true });
          throw error;
        });
    }
  }
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
