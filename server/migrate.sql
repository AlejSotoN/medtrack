ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS last_visit    DATE,
    ADD COLUMN IF NOT EXISTS next_followup DATE,
    ADD COLUMN IF NOT EXISTS profile_picture TEXT;
