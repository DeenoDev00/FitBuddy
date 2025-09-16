const { createApp } = Vue;

createApp({
  data() {
    return {
      username: '',
      usernameConfirmed: false,

      selectedAssignDay: '',
      selectedMuscle: '',
      selectedDayForExercise: '',
      exerciseName: '',
      exerciseReps: '',

      days: [],
      muscleGroups: [],

      dayObjects: [],
      showImportantOnly: false
    };
  },

  created() {
    try {
      const daysJson = document.getElementById('days-json').textContent;
      const musclesJson = document.getElementById('muscles-json').textContent;
      this.days = JSON.parse(daysJson);
      this.muscleGroups = JSON.parse(musclesJson);
    } catch (e) {
      console.error('Kunde inte läsa in JSON:', e);
      this.days = ["Måndag","Tisdag","Onsdag","Torsdag","Fredag"];
      this.muscleGroups = ["Bröst","Rygg","Ben","Axlar","Armar","Cardio","Mage"];
    }

    this.dayObjects = this.days.map(d => ({
      name: d,
      muscle: null,
      open: false,
      exercises: []
    }));
  },

  computed: {
    assignedDays() {
      return this.dayObjects.filter(d => d.muscle);
    }
  },

  methods: {
    confirmUsername() {
      if (!this.username) return;
      this.usernameConfirmed = true;
    },

    assignMuscleToDay() {
      if (!this.selectedAssignDay || !this.selectedMuscle) return;
      const day = this.dayObjects.find(d => d.name === this.selectedAssignDay);
      if (!day) return;
      day.muscle = this.selectedMuscle;
      day.open = true;
      this.selectedAssignDay = '';
      this.selectedMuscle = '';
    },

    clearAssignments() {
      this.dayObjects.forEach(d => { d.muscle = null; d.exercises = []; d.open = false; });
    },

    addExerciseToDay() {
      if (!this.selectedDayForExercise || !this.exerciseName || !this.exerciseReps) return;
      const day = this.dayObjects.find(d => d.name === this.selectedDayForExercise);
      if (!day || !day.muscle) return;
      day.exercises.push({ name: this.exerciseName, reps: this.exerciseReps, important: false });
      this.exerciseName = '';
      this.exerciseReps = '';
      this.selectedDayForExercise = '';
    },

    visibleExercises(day) {
      if (!day || !Array.isArray(day.exercises)) return [];
      return this.showImportantOnly ? day.exercises.filter(e => e.important) : day.exercises;
    },

    toggleImportant(ex) { ex.important = !ex.important; },

    removeExerciseFromDay(dayName, idx) {
      const day = this.dayObjects.find(d => d.name === dayName);
      if (!day) return;
      day.exercises.splice(idx, 1);
    },

    toggleFilter() { this.showImportantOnly = !this.showImportantOnly; },

    markAllNotImportant() { this.dayObjects.forEach(d => d.exercises.forEach(e => e.important = false)); }
  }
}).mount('#app');
