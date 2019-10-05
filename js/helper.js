export const helper = {
    rnd: function(min, max) {
        return min + Math.random() * (max-min);
    },
    clamp: function(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }
};
