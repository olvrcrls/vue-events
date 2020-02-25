import EventService from "@/services/EventService.js";
export const namespaced = true;
export const state = {
  events: [],
  eventsTotal: 0,
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
  createEvent({ commit, rootState }, event) {
    return EventService.postEvent(event).then(() => {
      let user = rootState.user.user;
      console.log(`User creating the event is ${user.name}`);
      commit("ADD_EVENT", event);
    });
  },

  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_EVENTS", response.data);
        console.log(response.headers["x-total-count"]);
        commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
      })
      .catch(error => console.log(error));
  },

  fetchEvent({ commit, getters }, id) {
    let event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
        })
        .catch(error => console.log(error));
    }
  }
};

export const getters = {
  catLength: state => {
    return state.categories.length;
  },
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
