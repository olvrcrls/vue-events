<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>
      It looks like you're experiencing some network issue. Please refresh or
      click the back button to try again.
    </h3>
    <router-link :to="{ name: 'event-list' }">
      Return to home page.
    </router-link>
  </div>
</template>
