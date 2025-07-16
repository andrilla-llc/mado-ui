# 窓 UI

## Components

### Input

#### Downfalls

- onChange only checks for validation of the current input. Most of the time, this is fine. This becomes an issue when a password is required to match the value of the previous input. If the user matches the passwords, and then changes the first password input, as long as the first password is a valid password, the second password doesn't need to match the first.
