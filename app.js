const { createApp } = Vue;

createApp({
  data() {
    return {
      username: "",
      usernameConfirmed: false,  // ny
      newDay: "",
      newExercise: "",
      newReps: "",
      workouts: [],
      showImportantOnly: false,
    };
  },
  computed: {
    filteredWorkouts() {
      return this.showImportantOnly
        ? this.workouts.filter(pass => pass.important)
        : this.workouts;
    }
  },
  methods: {
    confirmUsername() {
      this.usernameConfirmed = true;
    },
    addWorkout() {
      if (this.newDay && this.newExercise && this.newReps) {
        this.workouts.push({
          day: this.newDay,
          exercise: this.newExercise,
          reps: this.newReps,
          important: false,
        });
        this.newDay = "";
        this.newExercise = "";
        this.newReps = "";
      }
    },
    removeWorkout(index) {
      this.workouts.splice(index, 1);
    },
    toggleImportant(pass) {
      pass.important = !pass.important;
    },
    toggleFilter() {
      this.showImportantOnly = !this.showImportantOnly;
    }
  }
}).mount("#app");
