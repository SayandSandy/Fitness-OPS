import type { DietData } from "@/types/workout";

export const DIET_DATA: DietData = {
  targets: { kcal: 1900, protein: 140, carbs: 200, fat: 55 },
  meals: [
    {
      time: "7:00 AM",  icon: "☀️", label: "Wake-Up",     kcal: 5,   protein: 0,
      items: ["500ml warm lemon water", "No food yet — fasted walk/morning routine first"],
    },
    {
      time: "8:00 AM",  icon: "🍳", label: "Breakfast",   kcal: 520, protein: 30,
      items: [
        "4 whole eggs (boiled or scrambled, no butter)",
        "2 chapatis OR 1 cup rolled oats with water",
        "1 banana or 1 apple",
        "Black coffee or green tea (zero sugar)",
      ],
    },
    {
      time: "11:00 AM", icon: "🥜", label: "Mid-Morning", kcal: 120, protein: 5,
      items: ["20 roasted peanuts OR 10 almonds", "1 large glass water (500ml)"],
    },
    {
      time: "1:00 PM",  icon: "🍚", label: "Lunch",       kcal: 620, protein: 42,
      items: [
        "1 cup cooked rice or 2 chapatis",
        "1 bowl dal / rajma / chole",
        "150g chicken breast OR 100g paneer",
        "Big salad: cucumber + tomato + onion + lemon",
        "1 glass chaas (no salt)",
      ],
    },
    {
      time: "4:00 PM",  icon: "⚡", label: "Pre-Workout", kcal: 200, protein: 18,
      items: [
        "1 banana + 4 egg whites (boiled)",
        "OR: 1 cup Greek yogurt + small handful oats",
        "500ml water",
      ],
    },
    {
      time: "7:00 PM",  icon: "🍗", label: "Dinner",      kcal: 500, protein: 40,
      items: [
        "150g chicken breast OR 100g paneer OR 3 eggs",
        "2 chapatis OR 1 small bowl rice (smaller than lunch)",
        "1 bowl vegetable sabzi (low oil)",
        "1 bowl dal OR big salad",
      ],
    },
    {
      time: "9:00 PM",  icon: "🌙", label: "Night Snack", kcal: 80,  protein: 6,
      items: ["1 cup warm low-fat milk OR plain curd", "Nothing else after this"],
    },
  ],
  avoid: [
    "Soft drinks & packaged juices",
    "Chips, biscuits, namkeen",
    "White bread & maida products",
    "Instant noodles",
    "Alcohol",
    "Excess salt & pickles",
    "Fried food",
    "Sugar in any form",
  ],
  rules: [
    "No food after 8 PM — insulin sensitivity lowest at night",
    "Protein source at EVERY meal — preserves muscle during cut",
    "Eat slow, stop at 80% full — takes 20 min to register fullness",
    "Cheat meal (NOT day) Saturday evening only — guilt-free",
    "Weigh yourself same time every Monday morning, post-bathroom",
  ],
};
