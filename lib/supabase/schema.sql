-- FITNESS OPS — Database Schema
-- Supabase PostgreSQL

-- User profile (single user, no auth needed, use device_id)
CREATE TABLE user_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT UNIQUE NOT NULL,
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  gems INT DEFAULT 0,
  streak_count INT DEFAULT 0,
  theme TEXT DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily check-ins
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL,  -- 'complete' | 'rest' | 'missed'
  workout_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(device_id, date)
);

-- Workout logs
CREATE TABLE workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  date DATE NOT NULL,
  day_type TEXT NOT NULL,
  exercises JSONB,  -- [{name, sets: [{reps, completed}]}]
  duration_minutes INT,
  xp_earned INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journal entries
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  date DATE NOT NULL,
  mood TEXT,
  energy TEXT,
  soreness TEXT,
  sleep_quality INT,
  notes TEXT,
  exercise_notes JSONB,  -- {exercise_name: note_text}
  weekly_reflection JSONB,  -- {strongest_session, improvement}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(device_id, date)
);

-- Progress measurements
CREATE TABLE measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  date DATE NOT NULL,
  weight DECIMAL,
  waist DECIMAL,
  arm_flexed DECIMAL,
  arm_relaxed DECIMAL,
  forearm DECIMAL,
  chest DECIMAL,
  hips DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Personal records
CREATE TABLE personal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  exercise TEXT NOT NULL,
  value DECIMAL NOT NULL,  -- reps or seconds
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements earned
CREATE TABLE achievements_earned (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  achievement_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(device_id, achievement_id)
);

-- Indexes for common queries
CREATE INDEX idx_checkins_device_date ON checkins(device_id, date);
CREATE INDEX idx_workout_logs_device_date ON workout_logs(device_id, date);
CREATE INDEX idx_journal_device_date ON journal_entries(device_id, date);
CREATE INDEX idx_measurements_device_date ON measurements(device_id, date);
CREATE INDEX idx_pr_device_exercise ON personal_records(device_id, exercise);
