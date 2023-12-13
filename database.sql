CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS food_log (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    food_name VARCHAR(255) NOT NULL,
    calories INT NOT NULL,
    fat INT NOT NULL,
    carbs INT NOT NULL,
    protein INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (user_email) REFERENCES users(email)
);